import { emitCustomEvent } from "@pagopa/azure-tracing/logger";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import { isAfter } from "date-fns";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import { VoucherDetails } from "../generated/definitions/internal/VoucherDetails.js";
import { withParams } from "../middlewares/withParams.js";
import { Year } from "../models/card_request.js";
import { Session } from "../models/session.js";
import { CdcClientEnvironmentRouter, isTestUser } from "../utils/env_router.js";
import {
  errorToForbiddenError,
  errorToInternalError,
  errorToUnauthorizedError,
  errorToValidationError,
  responseError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { RedisClientFactory } from "../utils/redis.js";
import { getSessionTE } from "../utils/session.js";
import { traceEvent } from "../utils/tracing.js";

interface Dependencies {
  cdcClientEnvironmentRouter: CdcClientEnvironmentRouter;
  config: Config;
  redisClientFactory: RedisClientFactory;
}

const Headers = t.type({
  token: NonEmptyString,
});
type Headers = t.TypeOf<typeof Headers>;

const Query = t.partial({
  year: Year,
});
type Query = t.TypeOf<typeof Query>;

export const getSession = (sessionToken: string) => (deps: Dependencies) =>
  pipe(
    getSessionTE(deps.redisClientFactory, sessionToken),
    TE.mapLeft(() => responseError(401, "Session not found", "Unauthorized")),
  );

export const checkStartDatetime = (user: Session) => (deps: Dependencies) =>
  pipe(
    new Date(deps.config.CDC_USAGE_START_DATE),
    TE.fromPredicate(
      (startDate) => {
        const testUser = isTestUser(deps.config, user.fiscal_code);
        const now = new Date();
        const validDate = isAfter(now, startDate) || testUser;
        emitCustomEvent("cdc.get.vouchers.iniziative.status", {
          data: `Now: ${now.toISOString()} StartDate: ${startDate.toISOString()} => ${
            validDate ? "Iniziative open" : "Initiative closed"
          }`,
        })("getVouchers");
        if (testUser) {
          emitCustomEvent("cdc.get.vouchers.iniziative.status.test", {
            data: `Test user connected`,
          })("getVouchers");
        }
        return validDate;
      },
      () => new Error("CDC usage period is not started yet"),
    ),
    TE.mapLeft(errorToValidationError),
  );

export const checkEndDatetime = (deps: Dependencies) =>
  pipe(
    new Date(deps.config.CDC_USAGE_END_DATE),
    TE.fromPredicate(
      (endDate) => {
        const now = new Date();
        const validDate = isAfter(endDate, now);
        emitCustomEvent("cdc.get.vouchers.iniziative.status", {
          data: `Now: ${now.toISOString()} EndDate: ${endDate.toISOString()} => ${
            validDate ? "Iniziative open" : "Initiative closed"
          }`,
        })("getVouchers");
        return validDate;
      },
      () => new Error("CDC usage period is over"),
    ),
    TE.mapLeft(errorToForbiddenError),
  );

export const getVouchers =
  (user: Session, year?: string) => (deps: Dependencies) =>
    pipe(
      checkStartDatetime(user)(deps),
      TE.chainW(() => checkEndDatetime(deps)),
      TE.chain(() =>
        pipe(
          deps.cdcClientEnvironmentRouter.getClient(user.fiscal_code),
          (cdcClient) =>
            cdcClient.getCdcVouchersTE(
              {
                first_name: user.given_name,
                fiscal_code: user.fiscal_code,
                last_name: user.family_name,
              },
              year,
            ),
          TE.mapLeft(errorToInternalError),
        ),
      ),
      TE.chainW(() => TE.left(errorToInternalError(new Error("Triggered Error")))),
    );

export const makeGetVouchersHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>
  | H.HttpResponse<VoucherDetails[], 200>,
  Dependencies
> = H.of((req) =>
  pipe(
    withParams(Headers, req.headers),
    RTE.mapLeft(errorToUnauthorizedError),
    RTE.chain(({ token }) => getSession(token)),
    RTE.chainW((user) =>
      pipe(
        withParams(Query, req.query),
        RTE.mapLeft(errorToValidationError),
        RTE.map((query) => ({ query, user })),
      ),
    ),
    RTE.chain(({ query, user }) => getVouchers(user, query.year)),
    RTE.map(H.successJson),
    RTE.mapLeft((responseError) =>
      traceEvent(responseError)(
        "get-vouchers",
        "cdc.function.error",
        responseError,
      ),
    ),
    responseErrorToHttpError,
  ),
);

export const GetVouchersFn = httpAzureFunction(makeGetVouchersHandler);
