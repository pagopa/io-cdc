import { app } from "@azure/functions";
import { registerAzureFunctionHooks } from "@pagopa/azure-tracing/azure-functions";

import { getConfigOrThrow } from "./config.js";
import { InfoFn } from "./functions/info.js";
import { StatusFn } from "./functions/status.js";
import { CdcUtils } from "./utils/cdc.js";
import { getCosmosDbClientInstance } from "./utils/cosmosdb.js";

registerAzureFunctionHooks(app);

// Config
const config = getConfigOrThrow();

// CosmosDB singleton
const cosmosDbClient = getCosmosDbClientInstance(
  config.COSMOSDB_CDC_URI,
  config.COSMOSDB_CDC_KEY,
);

// CdC utils
const cdcUtils = CdcUtils(config);

const Info = InfoFn({ config });
app.http("Info", {
  authLevel: "anonymous",
  handler: Info,
  methods: ["GET"],
  route: "api/v1/info",
});

const Status = StatusFn({
  cdcUtils,
  config,
  cosmosDbClient,
});
app.http("Status", {
  authLevel: "function",
  handler: Status,
  methods: ["POST"],
  route: "api/v1/status",
});
