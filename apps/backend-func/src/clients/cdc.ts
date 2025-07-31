import { agent } from "@pagopa/ts-commons";
import {
  AbortableFetch,
  setFetchTimeout,
  toFetch,
} from "@pagopa/ts-commons/lib/fetch.js";
import { Millisecond } from "@pagopa/ts-commons/lib/units.js";
import nodeFetch from "node-fetch";

import { Config } from "../config.js";
import { createClient } from "../generated/cdc-api/client.js";
import { emitCustomEvent } from "@pagopa/azure-tracing/logger";

// 10 seconds timeout by default
const DEFAULT_REQUEST_TIMEOUT_MS = 10000;

// Must be an https endpoint so we use an https agent
const abortableFetch = AbortableFetch(agent.getHttpFetch(process.env));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchWithTimeout = toFetch(
  setFetchTimeout(DEFAULT_REQUEST_TIMEOUT_MS as Millisecond, abortableFetch),
);

const fetchApi: typeof fetchWithTimeout =
  // eslint-disable-next-line
  nodeFetch as any as typeof fetchWithTimeout;

// This function is used to ensure that the fetch API is safe to use
// It allows us to get also chunked data
const safeFetch: typeof fetchWithTimeout = async (...args) => {
  emitCustomEvent("cdc.api.request.args", { args: JSON.stringify(args) })(
    "safeFetch",
  );
  const response = await fetchApi(...args);
  const clone = response.clone();
  const res = await clone.text();
  emitCustomEvent("cdc.api.request.response", { args: JSON.stringify(res) })(
    "safeFetch",
  );
  return response;
};

export const CdcAPIClient = (config: Config) => (jwt: string) =>
  createClient<"JwtAuth">({
    basePath: "",
    baseUrl: config.CDC_API_BASE_URL,
    fetchApi: safeFetch,
    withDefaults: (op) => (params) => op({ JwtAuth: jwt, ...params }),
  });

export const CdcAPIClientTest = (config: Config) => (jwt: string) =>
  createClient<"JwtAuth">({
    basePath: "",
    baseUrl: config.CDC_API_BASE_URL_TEST,
    fetchApi: safeFetch,
    withDefaults: (op) => (params) => op({ JwtAuth: jwt, ...params }),
  });

export type CdcAPIClient = ReturnType<typeof CdcAPIClient>;
