import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { errorsToReadableMessages } from "@pagopa/ts-commons/lib/reporters.js";
import { IResponseType } from "@pagopa/ts-commons/lib/requests.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { CdcAPIClient, CdcAPIClientTest } from "../clients/cdc.js";
import { Config } from "../config.js";
import { ListaRegistratoBean } from "../generated/cdc-api/ListaRegistratoBean.js";
import { Year } from "../models/card_request.js";
import { JwtGenerator } from "./jwt.js";
import { traceEvent } from "./tracing.js";

export const CdcApiUserData = t.type({
  first_name: NonEmptyString,
  fiscal_code: FiscalCode,
  last_name: NonEmptyString,
});
export type CdcApiUserData = t.TypeOf<typeof CdcApiUserData>;

export const CdcApiRequestData = t.array(
  t.type({
    request_date: IsoDateFromString,
    year: Year,
  }),
);
export type CdcApiRequestData = t.TypeOf<typeof CdcApiRequestData>;

const getCdcClient = (config: Config, env: CdcEnvironmentT) =>
  env === CdcEnvironment.PRODUCTION
    ? CdcAPIClient(config)
    : CdcAPIClientTest(config);

const getJwtTE = (
  config: Config,
  env: CdcEnvironmentT,
  user: CdcApiUserData,
) => {
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
    env === CdcEnvironment.PRODUCTION
      ? config.ENCRYPTION_PUBLIC_KEY
      : config.ENCRYPTION_PUBLIC_KEY_TEST,
    env === CdcEnvironment.PRODUCTION
      ? config.JWT_PRIVATE_KEY
      : config.JWT_PRIVATE_KEY_TEST,
    user,
  );
};

const mapCdcApiCallFailure =
  (message: string) =>
  (res: IResponseType<number, unknown, never>): Error =>
    new Error(`${message} | ${res.status} | ${JSON.stringify(res.value)}`);

const isCdcApiStatusCallSuccess = (
  res: IResponseType<number, unknown, never>,
): res is IResponseType<200, ListaRegistratoBean, never> => res.status === 200;

const statusSuccessfulCodes = ["CARTA ATTIVA"];

const getAlreadyRequestedYearsCdcTE =
  (config: Config, env: CdcEnvironmentT) => (user: CdcApiUserData) =>
    pipe(
      getJwtTE(config, env, user),
      TE.chain((jwt) =>
        pipe(
          TE.of(getCdcClient(config, env)(jwt)),
          TE.chain((client) =>
            TE.tryCatch(async () => await client.stato({}), E.toError),
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
          TE.map((res) =>
            (
              res.listaStatoPerAnno
                ?.filter((req) =>
                  req?.statoBeneficiario
                    ? statusSuccessfulCodes.includes(req.statoBeneficiario)
                    : false,
                )
                .map((yr) => yr.annoRiferimento as Year) || []
            ).filter((y) => y !== undefined),
          ),
        ),
      ),
      TE.mapLeft((err) =>
        traceEvent(err)(
          "getAlreadyRequestedYearsCdcTE",
          `cdc.io.api.${env}.request.status.error`,
          err,
        ),
      ),
    );

export enum CdcEnvironment {
  PRODUCTION = "PRODUCTION",
  TEST = "TEST",
}
export type CdcEnvironmentT = keyof typeof CdcEnvironment;

export const CdcUtils = (config: Config, env: CdcEnvironmentT) => ({
  env,
  getAlreadyRequestedYearsCdcTE: getAlreadyRequestedYearsCdcTE(config, env),
});
export type CdcUtils = ReturnType<typeof CdcUtils>;
