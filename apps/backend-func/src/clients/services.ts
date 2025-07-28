import { agent } from "@pagopa/ts-commons";
import {
  AbortableFetch,
  setFetchTimeout,
  toFetch,
} from "@pagopa/ts-commons/lib/fetch.js";
import { Millisecond } from "@pagopa/ts-commons/lib/units.js";
import nodeFetch from "node-fetch";

import { Config } from "../config.js";
import { createClient } from "../generated/services-api/client.js";

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

export const ServicesAPIClient = (config: Config) =>
  createClient<"SubscriptionKey">({
    baseUrl: config.SERVICES_API_URL,
    fetchApi,
    withDefaults: (op) => (params) =>
      op({ SubscriptionKey: config.SERVICES_API_KEY, ...params }),
  });
export type ServicesAPIClient = ReturnType<typeof ServicesAPIClient>;
