import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import { SimpleResponseBean } from "../generated/cdc-api/SimpleResponseBean.js";
import { withParams } from "../middlewares/withParams.js";
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
  id: NonEmptyString,
});
type Path = t.TypeOf<typeof Path>;

export const getSession = (sessionToken: string) => (deps: Dependencies) =>
  pipe(
    getSessionTE(deps.redisClientFactory, sessionToken),
    TE.mapLeft(() => responseError(401, "Session not found", "Unauthorized")),
  );

export const deleteVoucher =
  (user: Session, id: string) => (deps: Dependencies) =>
    pipe(
      deps.cdcUtils.deleteCdcVoucherTE(
        {
          first_name: user.given_name,
          fiscal_code: user.fiscal_code,
          last_name: user.family_name,
        },
        id,
      ),
      TE.mapLeft(errorToInternalError),
    );

export const makeDeleteVoucherHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>
  | H.HttpResponse<SimpleResponseBean, 200>,
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
        RTE.map((params) => ({ params, user })),
      ),
    ),
    RTE.chain(({ params, user }) => deleteVoucher(user, params.id)),
    RTE.map(H.successJson),
    responseErrorToHttpError,
  ),
);

export const DeleteVoucherFn = httpAzureFunction(makeDeleteVoucherHandler);
