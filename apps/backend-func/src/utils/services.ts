import { errorsToReadableMessages } from "@pagopa/ts-commons/lib/reporters.js";
import { IResponseType } from "@pagopa/ts-commons/lib/requests.js";
import { FiscalCode } from "@pagopa/ts-commons/lib/strings.js";
import * as E from "fp-ts/lib/Either.js";
import * as O from "fp-ts/lib/Option.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, pipe } from "fp-ts/lib/function.js";

import { ServicesAPIClient } from "../clients/services.js";
import { Activation } from "../generated/services-api/Activation.js";
import { ActivationStatusEnum } from "../generated/services-api/ActivationStatus.js";
import { ProblemJson } from "../generated/services-api/ProblemJson.js";

const isServiceApiGetActivationCallNotFound = (
  res: IResponseType<number, unknown, never>,
): res is
  | IResponseType<200, Activation, never>
  | IResponseType<404, ProblemJson, never> =>
  res.status === 200 || res.status === 404;

const isServiceApiUpsertActivationCallSuccess = (
  res: IResponseType<number, unknown, never>,
): res is IResponseType<200, Activation, never> => res.status === 200;

const mapServiceApiActivationCallFailure =
  (message: string) =>
  (res: IResponseType<number, unknown, never>): Error =>
    new Error(`${message} | ${res.status}`);

const upsertServiceActivation = (
  servicesClient: ServicesAPIClient,
  fiscalCode: FiscalCode,
): TE.TaskEither<Error, Activation> =>
  pipe(
    TE.tryCatch(
      async () =>
        servicesClient.upsertServiceActivation({
          payload: {
            fiscal_code: fiscalCode,
            status: ActivationStatusEnum.ACTIVE,
          },
        }),
      E.toError,
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
        isServiceApiUpsertActivationCallSuccess,
        mapServiceApiActivationCallFailure("Cannot upsert service activation"),
      ),
    ),
    TE.map((successResponse) => successResponse.value),
  );

const getServiceActivation = (
  servicesClient: ServicesAPIClient,
  fiscalCode: FiscalCode,
): TE.TaskEither<Error, O.Option<Activation>> =>
  pipe(
    TE.tryCatch(
      async () =>
        servicesClient.getServiceActivationByPOST({
          payload: { fiscal_code: fiscalCode },
        }),
      E.toError,
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
        isServiceApiGetActivationCallNotFound,
        mapServiceApiActivationCallFailure("Cannot get service activation"),
      ),
    ),
    TE.map((res) => (res.status === 200 ? O.some(res.value) : O.none)),
  );

export const activateSpecialServiceIfNotActive = (
  servicesClient: ServicesAPIClient,
  fiscalCode: FiscalCode,
): TE.TaskEither<Error, true> =>
  pipe(
    getServiceActivation(servicesClient, fiscalCode),
    TE.chain(
      flow(
        O.fold(
          () => upsertServiceActivation(servicesClient, fiscalCode),
          (activation) => TE.of<Error, Activation>(activation),
        ),
        TE.map(() => true as const),
      ),
    ),
  );
