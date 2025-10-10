import { app } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { registerAzureFunctionHooks } from "@pagopa/azure-tracing/azure-functions";

import { ServicesAPIClient } from "./clients/services.js";
import { getConfigOrThrow } from "./config.js";
import { AuthorizeFn } from "./functions/authorize.js";
import { FimsAuthFn } from "./functions/fauth.js";
import { FimsCallbackFn } from "./functions/fcb.js";
import { GetCardsFn } from "./functions/get-cards.js";
import { GetCardRequestsFn } from "./functions/get-requests.js";
import { GetVouchersFn } from "./functions/get-vouchers.js";
import { GetYearsFn } from "./functions/get-years.js";
import { InfoFn } from "./functions/info.js";
import { PostCardRequestsFn } from "./functions/post-requests.js";
import { ProcessPendingRequestFn } from "./functions/process-pending-request.js";
import { PendingCardRequestMessage } from "./types/queue-message.js";
import { CdcEnvironment, CdcUtils } from "./utils/cdc.js";
import { getCosmosDbClientInstance } from "./utils/cosmosdb.js";
import { getFimsClient } from "./utils/fims.js";
import { QueueStorage } from "./utils/queue.js";
import { getRedisClientFactory } from "./utils/redis.js";

registerAzureFunctionHooks(app);

// Config
const config = getConfigOrThrow();

// Fims
const fimsClient = getFimsClient(config);

// Queue Storage
const queueStorage: QueueStorage = new QueueStorage(config);

// Audit Blob Storage
const auditContainerClient = BlobServiceClient.fromConnectionString(
  config.AUDIT_LOG_CONNECTION_STRING,
).getContainerClient(config.AUDIT_LOG_CONTAINER);

// CosmosDB singleton
const cosmosDbClient = getCosmosDbClientInstance(
  config.COSMOSDB_CDC_URI,
  config.COSMOSDB_CDC_KEY,
);

// Redis client factory
const redisClientFactory = getRedisClientFactory(config);

// Services client
const servicesClient = ServicesAPIClient(config);

// CdC utils
const cdcUtilsProd = CdcUtils(config, CdcEnvironment.PRODUCTION);
const cdcUtilsTest = CdcUtils(config, CdcEnvironment.TEST);

/*
 * CDC Utility Functions
 */
const Info = InfoFn({ config, redisClientFactory });
app.http("Info", {
  authLevel: "anonymous",
  handler: Info,
  methods: ["GET"],
  route: "api/v1/info",
});

/*
 * CDC Authentication Functions
 */
const FimsAuth = FimsAuthFn({ fimsClient, redisClientFactory });
app.http("FimsAuth", {
  authLevel: "function",
  handler: FimsAuth,
  methods: ["GET"],
  route: "api/v1/fauth",
});

const FimsCallback = FimsCallbackFn({
  auditContainerClient,
  config,
  fimsClient,
  redisClientFactory,
});
app.http("FimsCallback", {
  authLevel: "function",
  handler: FimsCallback,
  methods: ["GET"],
  route: "api/v1/fcb",
});

const Authorize = AuthorizeFn({ redisClientFactory });
app.http("Authorize", {
  authLevel: "function",
  handler: Authorize,
  methods: ["GET"],
  route: "api/v1/authorize",
});

/*
 * CDC Registration Functions
 */
const GetYears = GetYearsFn({ config });
app.http("GetYears", {
  authLevel: "function",
  handler: GetYears,
  methods: ["GET"],
  route: "api/v1/years",
});

const GetCardRequests = GetCardRequestsFn({
  config,
  cosmosDbClient,
  redisClientFactory,
});
app.http("GetCardRequests", {
  authLevel: "function",
  handler: GetCardRequests,
  methods: ["GET"],
  route: "api/v1/card-requests",
});

const PostCardRequests = PostCardRequestsFn({
  config,
  cosmosDbClient,
  queueStorage,
  redisClientFactory,
  servicesClient,
});
app.http("PostCardRequests", {
  authLevel: "function",
  handler: PostCardRequests,
  methods: ["POST"],
  route: "api/v1/card-requests",
});

const ProcessPendingRequest = ProcessPendingRequestFn({
  cdcUtils: cdcUtilsProd,
  config,
  cosmosDbClient,
  inputDecoder: PendingCardRequestMessage,
});
app.storageQueue("ProcessPendingRequest", {
  connection: "STORAGE_ACCOUNT",
  handler: ProcessPendingRequest,
  queueName: config.CARD_REQUEST_QUEUE_NAME,
});

/*
 * CDC Usage Functions
 */
const GetCards = GetCardsFn({
  cdcUtils: cdcUtilsTest,
  config,
  redisClientFactory,
});
app.http("GetCards", {
  authLevel: "function",
  handler: GetCards,
  methods: ["GET"],
  route: "api/v1/cards",
});

const GetVouchers = GetVouchersFn({
  cdcUtils: cdcUtilsTest,
  config,
  redisClientFactory,
});
app.http("GetVouchers", {
  authLevel: "function",
  handler: GetVouchers,
  methods: ["GET"],
  route: "api/v1/vouchers",
});
