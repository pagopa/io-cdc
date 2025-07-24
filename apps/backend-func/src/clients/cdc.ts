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

const fetchWithTimeout = toFetch(
  setFetchTimeout(DEFAULT_REQUEST_TIMEOUT_MS as Millisecond, abortableFetch),
);

const fetchApi: typeof fetchWithTimeout =
  // eslint-disable-next-line
  nodeFetch as any as typeof fetchWithTimeout;

const safeFetch: typeof fetchWithTimeout = async (...args) => {
  const response = await fetchApi(...args);
  emitCustomEvent("cdc.request.args", { args: JSON.stringify(args) })("safeFetch");

  try {
    const clone = response.clone();
    const text = await clone.text();
    emitCustomEvent("cdc.response.parsed", { response: text })(
      "safeFetch",
    );
  } catch (e) {
    emitCustomEvent("cdc.response.not.parsed", {
      error: JSON.stringify(e),
    })("safeFetch");
    throw e;
  }

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
