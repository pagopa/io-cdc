import { errorsToReadableMessages } from "@pagopa/ts-commons/lib/reporters.js";
import { IResponseType } from "@pagopa/ts-commons/lib/requests.js";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { CdcAPIClient } from "../clients/cdc.js";
import { Config } from "../config.js";
import { CitizenStatus } from "../generated/definitions/internal/CitizenStatus.js";
import { JwtGenerator } from "./jwt.js";

export const CdcApiUserData = t.type({
  fiscal_code: t.string,
});
export type CdcApiUserData = t.TypeOf<typeof CdcApiUserData>;

const getCdcClient = (config: Config) => CdcAPIClient(config);

const getJwtTE = (config: Config, user: CdcApiUserData) => {
  const jwtGenerator = new JwtGenerator({
    algEncription: config.ALGORITHM_ENCRYPTION,
    algKeys: config.ALGORITHM_KEYS,
    algSignature: config.ALGORITHM_SIGNATURE,
    audience: config.JWT_AUDIENCE,
    encEncryption: config.ENCODING_ENCRYPTION,
    expiration: config.JWT_EXPIRATION,
    issuer: config.JWT_ISSUER,
  });
  return jwtGenerator.signThenEncryptJwtTE(
    config.ENCRYPTION_PUBLIC_KEY,
    config.JWT_PRIVATE_KEY,
    user,
  );
};

const mapCdcApiCallFailure =
  (message: string) =>
  (res: IResponseType<number, unknown, never>): Error =>
    new Error(`${message} | ${res.status} | ${JSON.stringify(res.value)}`);

const isCdcApiStatusCallSuccess = (
  res: IResponseType<number, unknown, never>,
): res is IResponseType<200, CitizenStatus, never> => res.status === 200;

const getStatusTE = (config: Config) => (user: CdcApiUserData) =>
  pipe(
    getJwtTE(config, user),
    TE.chain((jwt) =>
      pipe(
        TE.of(getCdcClient(config)(jwt)),
        TE.chain((client) =>
          TE.tryCatch(async () => await client.getStatus({}), E.toError),
        ),
        TE.chain((response) =>
          pipe(
            response,
            TE.fromEither,
            TE.mapLeft(
              (errors) =>
                new Error(errorsToReadableMessages(errors).join(" / ")),
            ),
          ),
        ),
        TE.chain((response) =>
          TE.fromPredicate(
            isCdcApiStatusCallSuccess,
            mapCdcApiCallFailure(
              `Citizen status CDC failure | API result not success.`,
            ),
          )(response),
        ),
        TE.map((successResponse) => successResponse.value),
      ),
    ),
  );

export const CdcUtils = (config: Config) => ({
  getStatusTE: getStatusTE(config),
});
export type CdcUtils = ReturnType<typeof CdcUtils>;
