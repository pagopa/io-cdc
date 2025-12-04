import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import { VoucherDetails } from "../generated/definitions/internal/VoucherDetails.js";
import { withParams } from "../middlewares/withParams.js";
import { Year } from "../models/card_request.js";
import { Session } from "../models/session.js";
import { CdcClientEnvironmentRouter } from "../utils/env_router.js";
import {
  errorToInternalError,
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

const Body = t.type({
  amount: t.number,
  year: Year,
});
type Body = t.TypeOf<typeof Body>;

export const getSession = (sessionToken: string) => (deps: Dependencies) =>
  pipe(
    getSessionTE(deps.redisClientFactory, sessionToken),
    TE.mapLeft(() => responseError(401, "Session not found", "Unauthorized")),
  );

export const postVouchers =
  (user: Session, voucher: Body) => (deps: Dependencies) =>
    pipe(
      deps.cdcClientEnvironmentRouter.getClient(user.fiscal_code),
      (cdcClient) =>
        cdcClient.postCdcVouchersTE(
          {
            first_name: user.given_name,
            fiscal_code: user.fiscal_code,
            last_name: user.family_name,
          },
          voucher.year,
          voucher.amount,
        ),
      TE.mapLeft(errorToInternalError),
    );

export const makePostVouchersHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>
  | H.HttpResponse<VoucherDetails, 200>,
  Dependencies
> = H.of((req) =>
  pipe(
    withParams(Headers, req.headers),
    RTE.mapLeft(errorToValidationError),
    RTE.chain(({ token }) => getSession(token)),
    RTE.chainW((user) =>
      pipe(
        withParams(Body, req.body),
        RTE.mapLeft(errorToValidationError),
        RTE.map((voucher) => ({ user, voucher })),
      ),
    ),
    RTE.chain(({ user, voucher }) => postVouchers(user, voucher)),
    RTE.map(H.successJson),
    RTE.mapLeft((responseError) =>
      traceEvent(responseError)(
        "post-vouchers",
        "cdc.function.error",
        responseError,
      ),
    ),
    responseErrorToHttpError,
  ),
);

export const PostVouchersFn = httpAzureFunction(makePostVouchersHandler);
