import { HttpStatusCodeEnum } from "@pagopa/ts-commons/lib/responses.js";
import * as E from "fp-ts/lib/Either.js";
import { vi } from "vitest";

import { ActivationStatusEnum } from "../generated/services-api/ActivationStatus.js";
import { createClient } from "../generated/services-api/client.js";
import { aValidFiscalCode } from "./types.mock.js";

const servicesAPIClientMock = createClient<"SubscriptionKey">({
  baseUrl: "",
  fetchApi: async () => new Response(),
  withDefaults: (op) => (params) => op({ SubscriptionKey: "", ...params }),
});

export const makeServiceResponse = (
  status: HttpStatusCodeEnum,
  value: string,
) => ({
  headers: [],
  status,
  value,
});

export const upsertServiceActivationMock = vi.fn().mockImplementation(() =>
  E.right(
    makeServiceResponse(
      HttpStatusCodeEnum.HTTP_STATUS_200,
      JSON.stringify({
        fiscal_code: aValidFiscalCode,
        service_id: "qwertyuiop",
        status: ActivationStatusEnum.PENDING,
        version: 1,
      }),
    ),
  ),
);

export const getServiceActivationMock = vi.fn().mockImplementation(() =>
  E.right(
    makeServiceResponse(
      HttpStatusCodeEnum.HTTP_STATUS_404,
      JSON.stringify({
        detail: "Not found",
        instance: "",
        status: 404,
        title: "Not Found",
        type: "",
      }),
    ),
  ),
);

export const servicesClientMock = {
  ...servicesAPIClientMock,
  getServiceActivationByPOST: getServiceActivationMock,
  upsertServiceActivation: upsertServiceActivationMock,
};
