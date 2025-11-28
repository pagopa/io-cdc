/* eslint-disable */

import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { errorsToReadableMessages } from "@pagopa/ts-commons/lib/reporters.js";
import { IResponseType } from "@pagopa/ts-commons/lib/requests.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, identity, pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { CdcAPIClient, CdcAPIClientTest } from "../clients/cdc.js";
import { Config } from "../config.js";
import { EsitoRichiestaEnum } from "../generated/cdc-api/EsitoRichiestaBean.js";
import { InputBeneficiarioBean } from "../generated/cdc-api/InputBeneficiarioBean.js";
import { ListBorsellinoDetails } from "../generated/cdc-api/ListBorsellinoDetails.js";
import { ListVoucherDetails } from "../generated/cdc-api/ListVoucherDetails.js";
import { ListaEsitoRichiestaBean } from "../generated/cdc-api/ListaEsitoRichiestaBean.js";
import { ListaRegistratoBean } from "../generated/cdc-api/ListaRegistratoBean.js";
import {
  RichiedenteEnum,
  StatoEnum as StatoVoucherEnum,
  VoucherBeanDetails,
} from "../generated/cdc-api/VoucherBeanDetails.js";
import { StatoEnum as StatoRimborsoEnum } from "../generated/cdc-api/RimborsoBean.js";
import {
  ApplicantEnum,
  Refund_statusEnum,
  Voucher_statusEnum,
} from "../generated/definitions/internal/VoucherDetails.js";
import { Year } from "../models/card_request.js";
import { JwtGenerator } from "./jwt.js";
import { traceEvent } from "./tracing.js";

export const CdcApiUserData = t.type({
  first_name: NonEmptyString,
  fiscal_code: FiscalCode,
  last_name: NonEmptyString,
});
export type CdcApiUserData = t.TypeOf<typeof CdcApiUserData>;

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

// CDC STATUS API
const isCdcApiStatusCallSuccess = (
  res: IResponseType<number, unknown, never>,
): res is IResponseType<200, ListaRegistratoBean, never> => res.status === 200;

const statusSuccessfulCodes = [
  "RICHIESTA INSERITA",
  "RICHIESTA NON INSERIBILE",
  "CARTA ATTIVA",
  "IN VALUTAZIONE",
];

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
          TE.map((responseValue) =>
            traceEvent(responseValue)(
              "getAlreadyRequestedYearsCdcTE",
              `cdc.api.${env}.request.status.response`,
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
          `cdc.api.${env}.request.status.error`,
          err,
        ),
      ),
    );

// CDC REGISTRATION API
export const CdcApiRequestData = t.array(
  t.type({
    request_date: IsoDateFromString,
    year: Year,
  }),
);
export type CdcApiRequestData = t.TypeOf<typeof CdcApiRequestData>;

const isCdcApiRequestCallSuccess = (
  res: IResponseType<number, unknown, never>,
): res is IResponseType<200, ListaEsitoRichiestaBean, never> =>
  res.status === 200;

const requestSuccessfulCodes = [
  EsitoRichiestaEnum.CIT_REGISTRATO,
  EsitoRichiestaEnum.OK,
];

const requestCdcTE =
  (config: Config, env: CdcEnvironmentT) =>
  (user: CdcApiUserData, request: CdcApiRequestData) =>
    request.length > 0
      ? pipe(
          TE.Do,
          TE.bind("client", () =>
            pipe(
              getJwtTE(config, env, user),
              TE.map(getCdcClient(config, env)),
            ),
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
                  `cdc.api.${env}.request.register.payload`,
                  payload,
                ),
              ),
            ),
          ),
          TE.chain(({ client, payload }) =>
            TE.tryCatch(
              async () => await client.registrazione(payload),
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
              `cdc.api.${env}.request.register.response`,
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
              `cdc.api.${env}.request.register.error`,
              err,
            ),
          ),
        )
      : pipe(TE.of(true));

// CDC LIST CARDS API
const isCdcApiGetCardsCallSuccess = (
  res: IResponseType<number, unknown, never>,
): res is IResponseType<200, ListBorsellinoDetails, never> =>
  res.status === 200;

const getCdcCardsTE =
  (config: Config, env: CdcEnvironmentT) => (user: CdcApiUserData) =>
    pipe(
      getJwtTE(config, env, user),
      TE.chain((jwt) =>
        pipe(
          TE.of(getCdcClient(config, env)(jwt)),
          TE.chain((client) =>
            TE.tryCatch(
              async () => await client.getListaBorsellino({}),
              E.toError,
            ),
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
              isCdcApiGetCardsCallSuccess,
              mapCdcApiCallFailure(
                `Get cards CDC failure | API result not success.`,
              ),
            )(response),
          ),
          TE.map((successResponse) => {
            traceEvent(successResponse.value)(
              "getCdcCardsTE",
              `cdc.api.${env}.request.cards.response`,
              successResponse.value,
            );
            return successResponse.value;
          }),
          TE.chain(({ listaRisultati }) =>
            pipe(
              listaRisultati,
              TE.fromPredicate(
                (cards) => !!cards,
                () => new Error("Invalid cdc cards list"),
              ),
              TE.chain(
                TE.fromPredicate(
                  (cards) => cards.length > 0,
                  () => new Error("Empty cdc cards list"),
                ),
              ),
              TE.map((cards) =>
                cards.map((c) => ({
                  card_name: `Carta della Cultura ${c.annoRif}`,
                  expiration_date: new Date(config.CDC_CARDS_EXPIRATION_DATE),
                  residual_amount: c.importoResiduo,
                  year: c.annoRif,
                })),
              ),
            ),
          ),
        ),
      ),
      TE.mapLeft((err) =>
        traceEvent(err)(
          "getCdcCardsTE",
          `cdc.api.${env}.request.cards.error`,
          err,
        ),
      ),
    );

// CDC LIST VOUCHER API
const isCdcApiGetVouchersCallSuccess = (
  res: IResponseType<number, unknown, never>,
): res is IResponseType<200, ListVoucherDetails, never> => res.status === 200;

const mapVoucher = (config: Config, v: VoucherBeanDetails) => ({
  amount: v.importoRichiesto,
  applicant:
    v.richiedente === RichiedenteEnum.SELF
      ? ApplicantEnum.SELF
      : ApplicantEnum.FAMILY_MEMBER,
  card_year: v.annoRif,
  expiration_date: v.dataScadenza
    ? new Date(v.dataScadenza)
    : new Date(config.CDC_CARDS_EXPIRATION_DATE),
  id: v.codVoucher,
  refund:
    v.rimborso &&
    v.rimborso.importoDaRiaccreditare &&
    v.rimborso.importoDaRiaccreditare > 0
      ? {
          amount: v.rimborso.importoDaRiaccreditare,
          refund_status: mapVoucherRefundStatus(v.rimborso.stato),
        }
      : undefined,
  merchant: v.esercente || undefined,
  voucher_status: mapVoucherStatus(v.stato),
  spending_date: v.dataConferma ? new Date(v.dataConferma) : undefined,
});

const mapVoucherStatus = (status: StatoVoucherEnum): Voucher_statusEnum => {
  switch (status) {
    case StatoVoucherEnum.INSERITO:
      return Voucher_statusEnum.PENDING;
    case StatoVoucherEnum.PREVALIDATO:
    case StatoVoucherEnum["INVIATO A CONSAP"]:
    case StatoVoucherEnum.UTILIZZATO:
      return Voucher_statusEnum.USED;
    case StatoVoucherEnum.CANCELLATO:
      return Voucher_statusEnum.CANCELLED;
    case StatoVoucherEnum.SCADUTO:
      return Voucher_statusEnum.EXPIRED;
  }
};

const mapVoucherRefundStatus = (
  status?: StatoRimborsoEnum,
): Refund_statusEnum => {
  switch (status) {
    case StatoRimborsoEnum["VOUCHER RICONVERTITO"]:
      return Refund_statusEnum.COMPLETED;
    case StatoRimborsoEnum["RICONVERSIONE IN CORSO"]:
      return Refund_statusEnum.PENDING;
    case StatoRimborsoEnum["RICONVERSIONE RIFIUTATA"]:
    default:
      return Refund_statusEnum.FAILED;
  }
};

const getCdcVouchersTE =
  (config: Config, env: CdcEnvironmentT) =>
  (user: CdcApiUserData, year?: string) =>
    pipe(
      getJwtTE(config, env, user),
      TE.chain((jwt) =>
        pipe(
          TE.of(getCdcClient(config, env)(jwt)),
          TE.chain((client) =>
            TE.tryCatch(
              async () =>
                await client.getListaVoucher(year ? { annoRif: year } : {}),
              E.toError,
            ),
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
              isCdcApiGetVouchersCallSuccess,
              mapCdcApiCallFailure(
                `Get vouchers CDC failure | API result not success.`,
              ),
            )(response),
          ),
          TE.map((successResponse) => {
            traceEvent(successResponse.value)(
              "getCdcVouchersTE",
              `cdc.api.${env}.request.vouchers.response`,
              successResponse.value,
            );
            return successResponse.value;
          }),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          TE.chain(({ listaRisultati, ..._ }) =>
            pipe(
              listaRisultati,
              TE.fromPredicate(
                (vouchers) => !!vouchers,
                () => new Error("Undefined cdc vouchers list"),
              ),
              TE.map((vouchers) => vouchers.map((v) => mapVoucher(config, v))),
              TE.map((vouchers) =>
                // we do not want to see cancelled vouchers
                vouchers.filter(
                  (v) => v.voucher_status !== Voucher_statusEnum.CANCELLED,
                ),
              ),
            ),
          ),
        ),
      ),
      TE.mapLeft((err) =>
        traceEvent(err)(
          "getCdcVouchersTE",
          `cdc.api.${env}.request.vouchers.error`,
          err,
        ),
      ),
    );

// CDC POST VOUCHER API
const isCdcApiPostVouchersCallSuccess = (
  res: IResponseType<number, unknown, never>,
): res is IResponseType<200, VoucherBeanDetails, never> => res.status === 200;

const postCdcVouchersTE =
  (config: Config, env: CdcEnvironmentT) =>
  (user: CdcApiUserData, year: string, amount: number) =>
    pipe(
      getJwtTE(config, env, user),
      TE.chain((jwt) =>
        pipe(
          TE.of(getCdcClient(config, env)(jwt)),
          TE.chain((client) =>
            TE.tryCatch(
              async () =>
                await client.generaVoucher({
                  body: { anno: year, idBene: 7, importo: amount }, // idBene is fixed to 7 as per CDC API spec (LIBRO)
                }),
              E.toError,
            ),
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
              isCdcApiPostVouchersCallSuccess,
              mapCdcApiCallFailure(
                `Post vouchers CDC failure | API result not success.`,
              ),
            )(response),
          ),
          TE.map((successResponse) => successResponse.value),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          TE.chain((voucher) =>
            pipe(
              voucher,
              TE.fromPredicate(
                (voucher) => voucher.codVoucher !== undefined,
                () => new Error("Invalid Voucher Error"),
              ),
              TE.map((v) => mapVoucher(config, v)),
            ),
          ),
        ),
      ),
      TE.mapLeft((err) =>
        traceEvent(err)(
          "postCdcVouchersTE",
          `cdc.api.${env}.request.post.voucher.error`,
          err,
        ),
      ),
    );

// CDC GET VOUCHER API
const isCdcApiGetVoucherCallSuccess = (
  res: IResponseType<number, unknown, never>,
): res is IResponseType<200, VoucherBeanDetails, never> => res.status === 200;

const getCdcVoucherTE =
  (config: Config, env: CdcEnvironmentT) =>
  (user: CdcApiUserData, id: string) =>
    pipe(
      getJwtTE(config, env, user),
      TE.chain((jwt) =>
        pipe(
          TE.of(getCdcClient(config, env)(jwt)),
          TE.chain((client) =>
            TE.tryCatch(
              async () =>
                await client.getDettaglioVoucher({
                  codVoucher: id,
                }),
              E.toError,
            ),
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
              isCdcApiGetVoucherCallSuccess,
              mapCdcApiCallFailure(
                `Get voucher CDC failure | API result not success.`,
              ),
            )(response),
          ),
          TE.map((successResponse) => successResponse.value),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          TE.chain((voucher) =>
            pipe(
              voucher,
              TE.fromPredicate(
                (voucher) => voucher.codVoucher !== undefined,
                () => new Error("Invalid Voucher Error"),
              ),
              TE.map((v) => mapVoucher(config, v)),
            ),
          ),
        ),
      ),
      TE.mapLeft((err) =>
        traceEvent(err)(
          "getCdcVoucherTE",
          `cdc.api.${env}.request.get.voucher.error`,
          err,
        ),
      ),
    );

// CDC DELETE VOUCHER API
const isCdcApiDeleteVoucherCallSuccess = (
  res: IResponseType<number, unknown, never>,
): res is IResponseType<200, undefined, never> => res.status === 200;

const deleteCdcVoucherTE =
  (config: Config, env: CdcEnvironmentT) =>
  (user: CdcApiUserData, id: string) =>
    pipe(
      getJwtTE(config, env, user),
      TE.chain((jwt) =>
        pipe(
          TE.of(getCdcClient(config, env)(jwt)),
          TE.chain((client) =>
            TE.tryCatch(
              async () =>
                await client.annullaVoucher({
                  codVoucher: id,
                }),
              E.toError,
            ),
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
              isCdcApiDeleteVoucherCallSuccess,
              mapCdcApiCallFailure(
                `Get voucher CDC failure | API result not success.`,
              ),
            )(response),
          ),
          TE.map(() => true),
        ),
      ),
      TE.mapLeft((err) =>
        traceEvent(err)(
          "deleteCdcVoucherTE",
          `cdc.api.${env}.request.delete.voucher.error`,
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
  deleteCdcVoucherTE: deleteCdcVoucherTE(config, env),
  getAlreadyRequestedYearsCdcTE: getAlreadyRequestedYearsCdcTE(config, env),
  getCdcCardsTE: getCdcCardsTE(config, env),
  getCdcVoucherTE: getCdcVoucherTE(config, env),
  getCdcVouchersTE: getCdcVouchersTE(config, env),
  postCdcVouchersTE: postCdcVouchersTE(config, env),
  requestCdcTE: requestCdcTE(config, env),
});
export type CdcUtils = ReturnType<typeof CdcUtils>;
