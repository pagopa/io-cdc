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
import { CdcUtils } from "../utils/cdc.js";
import {
  errorToInternalError,
  errorToValidationError,
  responseError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { RedisClientFactory } from "../utils/redis.js";
import { getSessionTE } from "../utils/session.js";

interface Dependencies {
  cdcUtils: CdcUtils;
  config: Config;
  redisClientFactory: RedisClientFactory;
}

const Headers = t.type({
  token: NonEmptyString,
});
type Headers = t.TypeOf<typeof Headers>;

const Path = t.type({
  year: Year,
});
type Path = t.TypeOf<typeof Path>;

export const getSession = (sessionToken: string) => (deps: Dependencies) =>
  pipe(
    getSessionTE(deps.redisClientFactory, sessionToken),
    TE.mapLeft(() => responseError(401, "Session not found", "Unauthorized")),
  );

export const getVouchers =
  (user: Session, year: string) => (deps: Dependencies) =>
    pipe(
      deps.cdcUtils.getCdcVouchersTE(
        {
          first_name: user.given_name,
          fiscal_code: user.fiscal_code,
          last_name: user.family_name,
        },
        year,
      ),
      TE.mapLeft(errorToInternalError),
    );

export const makeGetVouchersHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>
  | H.HttpResponse<VoucherDetails[], 200>,
  Dependencies
> = H.of((req) =>
  pipe(
    withParams(Headers, req.headers),
    RTE.mapLeft(errorToValidationError),
    RTE.chain(({ token }) => getSession(token)),
    RTE.chainW((user) =>
      pipe(
        withParams(Path, req.path),
        RTE.mapLeft(errorToValidationError),
        RTE.map((path) => ({ path, user })),
      ),
    ),
    RTE.chain(({ path, user }) => getVouchers(user, path.year)),
    RTE.map(H.successJson),
    responseErrorToHttpError,
  ),
);

export const GetVouchersFn = httpAzureFunction(makeGetVouchersHandler);
