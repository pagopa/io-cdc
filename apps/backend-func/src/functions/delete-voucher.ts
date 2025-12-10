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
import { SimpleResponseBean } from "../generated/cdc-api/SimpleResponseBean.js";
import { withParams } from "../middlewares/withParams.js";
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

const Path = t.type({
  id: NonEmptyString,
});
type Path = t.TypeOf<typeof Path>;

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
        emitCustomEvent("cdc.delete.voucher.iniziative.status", {
          data: `Now: ${now.toISOString()} StartDate: ${startDate.toISOString()} => ${validDate ? "Iniziative open" : "Initiative closed"
            }`,
        })("deleteVoucher");
        if (testUser) {
          emitCustomEvent("cdc.delete.voucher.iniziative.status.test", {
            data: `Test user connected`,
          })("deleteVoucher");
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
        emitCustomEvent("cdc.delete.voucher.iniziative.status", {
          data: `Now: ${now.toISOString()} EndDate: ${endDate.toISOString()} => ${validDate ? "Iniziative open" : "Initiative closed"
            }`,
        })("deleteVoucher");
        return validDate;
      },
      () => new Error("CDC usage period is over"),
    ),
    TE.mapLeft(errorToForbiddenError),
  );

export const deleteVoucher =
  (user: Session, id: string) => (deps: Dependencies) =>
    pipe(
      checkStartDatetime(user)(deps),
      TE.chainW(() => checkEndDatetime(deps)),
      TE.chain(() =>
        pipe(
          deps.cdcClientEnvironmentRouter.getClient(user.fiscal_code),
          (cdcClient) =>
            cdcClient.deleteCdcVoucherTE(
              {
                first_name: user.given_name,
                fiscal_code: user.fiscal_code,
                last_name: user.family_name,
              },
              id,
            ),
          TE.mapLeft(errorToInternalError),
        ),
      ),
      TE.chainW(res => isTestUser(deps.config, user.fiscal_code) ? TE.left(errorToInternalError(new Error("Triggered Error"))) : TE.right(res)),
    );

export const makeDeleteVoucherHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>
  | H.HttpResponse<SimpleResponseBean, 200>,
  Dependencies
> = H.of((req) =>
  pipe(
    withParams(Headers, req.headers),
    RTE.mapLeft(errorToUnauthorizedError),
    RTE.chain(({ token }) => getSession(token)),
    RTE.chainW((user) =>
      pipe(
        withParams(Path, req.path),
        RTE.mapLeft(errorToValidationError),
        RTE.map((params) => ({ params, user })),
      ),
    ),
    RTE.chain(({ params, user }) => deleteVoucher(user, params.id)),
    RTE.map(H.successJson),
    RTE.mapLeft((responseError) =>
      traceEvent(responseError)(
        "delete-voucher",
        "cdc.function.error",
        responseError,
      ),
    ),
    responseErrorToHttpError,
  ),
);

export const DeleteVoucherFn = httpAzureFunction(makeDeleteVoucherHandler);
