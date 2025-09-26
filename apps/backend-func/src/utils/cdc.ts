import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { errorsToReadableMessages } from "@pagopa/ts-commons/lib/reporters.js";
import { IResponseType } from "@pagopa/ts-commons/lib/requests.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, identity, pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { CdcAPIClient } from "../clients/cdc.js";
import { Config } from "../config.js";
import { EsitoRichiestaEnum } from "../generated/cdc-api/EsitoRichiestaBean.js";
import { InputBeneficiarioBean } from "../generated/cdc-api/InputBeneficiarioBean.js";
import { ListaEsitoRichiestaBean } from "../generated/cdc-api/ListaEsitoRichiestaBean.js";
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
): res is IResponseType<200, ListaRegistratoBean, never> => res.status === 200;

const isCdcApiRequestCallSuccess = (
  res: IResponseType<number, unknown, never>,
): res is IResponseType<200, ListaEsitoRichiestaBean, never> =>
  res.status === 200;

const statusSuccessfulCodes = [
  "RICHIESTA INSERITA",
  "RICHIESTA NON INSERIBILE",
  "CARTA ATTIVA",
  "IN VALUTAZIONE",
];

const getAlreadyRequestedYearsCdcTE =
  (config: Config) => (user: CdcApiUserData) =>
    pipe(
      getJwtTE(config, user),
      TE.chain((jwt) =>
        pipe(
          TE.of(getCdcClient(config)(jwt)),
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
          TE.map((responseValue) =>
            traceEvent(responseValue)(
              "getAlreadyRequestedYearsCdcTE",
              "cdc.api.request.status.response",
              responseValue,
            ),
          ),
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
          "cdc.api.request.status.error",
          err,
        ),
      ),
    );

const requestSuccessfulCodes = [
  EsitoRichiestaEnum.CIT_REGISTRATO,
  EsitoRichiestaEnum.OK,
];

const requestCdcTE =
  (config: Config) => (user: CdcApiUserData, request: CdcApiRequestData) =>
    request.length > 0
      ? pipe(
          TE.Do,
          TE.bind("client", () =>
            pipe(getJwtTE(config, user), TE.map(getCdcClient(config))),
          ),
          TE.bindW("payload", () =>
            pipe(
              TE.of({
                body: {
                  anniRif: request.map((i) => ({
                    anno: i.year,
                    tsRichiestaEffettuata: i.request_date,
                  })),
                } as InputBeneficiarioBean,
              }),
              TE.map((payload) =>
                traceEvent(payload)(
                  "requestCdcTE",
                  "cdc.api.request.register.payload",
                  payload,
                ),
              ),
            ),
          ),
          TE.chain(({ client, payload }) =>
            TE.tryCatch(
              async () => pipe(await client.registrazione(payload)),
              E.toError,
            ),
          ),
          TE.chainW(
            flow(
              TE.fromEither,
              TE.mapLeft(
                (errors) =>
                  new Error(errorsToReadableMessages(errors).join(" / ")),
              ),
            ),
          ),
          TE.chainW(
            TE.fromPredicate(
              isCdcApiRequestCallSuccess,
              mapCdcApiCallFailure(
                "Card request CDC failure | API result not success.",
              ),
            ),
          ),
          TE.map((successResponse) => successResponse.value),
          TE.map((responseValue) =>
            traceEvent(responseValue)(
              "requestCdcTE",
              "cdc.api.request.register.response",
              responseValue,
            ),
          ),
          TE.map(
            (res) =>
              res.listaEsitoRichiestaPerAnno
                ?.map((req) =>
                  req?.esitoRichiesta
                    ? requestSuccessfulCodes.includes(req.esitoRichiesta)
                    : false,
                )
                .every(identity) || false,
          ),
          TE.chain(
            TE.fromPredicate(
              identity,
              () => new Error("Card request CDC failure. | Invalid response."),
            ),
          ),
          TE.mapLeft((err) =>
            traceEvent(err)(
              "requestCdcTE",
              "cdc.api.request.register.error",
              err,
            ),
          ),
        )
      : pipe(TE.of(true));

export const CdcUtils = (config: Config) => ({
  getAlreadyRequestedYearsCdcTE: getAlreadyRequestedYearsCdcTE(config),
  requestCdcTE: requestCdcTE(config),
});
export type CdcUtils = ReturnType<typeof CdcUtils>;
