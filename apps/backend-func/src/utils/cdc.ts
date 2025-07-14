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
import { Years } from "../generated/definitions/internal/Years.js";
import { Year } from "../models/card_request.js";
import { JwtGenerator } from "./jwt.js";

export const CdcApiUserData = t.type({
  first_name: NonEmptyString,
  fiscal_code: FiscalCode,
  last_name: NonEmptyString,
});
export type CdcApiUserData = t.TypeOf<typeof CdcApiUserData>;

export const CdcApiRequestData = t.type({
  request_date: IsoDateFromString,
  years: Years,
});
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
    new Error(`${message} | ${res.status}`);

const isCdcApiCallSuccess = (
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
      TE.map(getCdcClient(config)),
      TE.chain((client) =>
        TE.tryCatch(async () => client.stato({}), E.toError),
      ),
      TE.chainW(
        flow(
          TE.fromEither,
          TE.mapLeft(
            (errors) => new Error(errorsToReadableMessages(errors).join(" / ")),
          ),
        ),
      ),
      TE.chainW(
        TE.fromPredicate(
          isCdcApiCallSuccess,
          mapCdcApiCallFailure(
            "Citizen status CDC failure | API result not compliant.",
          ),
        ),
      ),
      TE.map((successResponse) => successResponse.value),
      TE.map((res) =>
        (
          res.listaEsitoRichiestaPerAnno
            ?.filter((req) =>
              req?.esitoRichiesta
                ? statusSuccessfulCodes.includes(req.esitoRichiesta)
                : false,
            )
            .map((yr) => yr.annoRiferimento as Year) || []
        ).filter((y) => y !== undefined),
      ),
    );

const requestSuccessfulCodes = [
  EsitoRichiestaEnum.CIT_REGISTRATO,
  EsitoRichiestaEnum.OK,
];

const requestCdcTE =
  (config: Config) => (user: CdcApiUserData, request: CdcApiRequestData) =>
    pipe(
      getJwtTE(config, user),
      TE.map(getCdcClient(config)),
      TE.chain((client) =>
        TE.tryCatch(
          async () =>
            client.registrazione({
              body: {
                anniRif: request.years.map((y) => ({ anno: y })),
                tsRichiestaEffettuata: request.request_date,
              } as InputBeneficiarioBean,
            }),
          E.toError,
        ),
      ),
      TE.chainW(
        flow(
          TE.fromEither,
          TE.mapLeft(
            (errors) => new Error(errorsToReadableMessages(errors).join(" / ")),
          ),
        ),
      ),
      TE.chainW(
        TE.fromPredicate(
          isCdcApiCallSuccess,
          mapCdcApiCallFailure(
            "Card request CDC failure | API result not compliant.",
          ),
        ),
      ),
      TE.map((successResponse) => successResponse.value),
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
          () => new Error("Card request CDC failure."),
        ),
      ),
    );

export const CdcUtils = (config: Config) => ({
  getAlreadyRequestedYearsCdcTE: getAlreadyRequestedYearsCdcTE(config),
  requestCdcTE: requestCdcTE(config),
});
export type CdcUtils = ReturnType<typeof CdcUtils>;
