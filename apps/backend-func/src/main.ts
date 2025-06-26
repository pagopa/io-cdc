import { app } from "@azure/functions";
import { registerAzureFunctionHooks } from "@pagopa/azure-tracing/azure-functions";

import { getConfigOrThrow } from "./config.js";
import { AuthorizeFn } from "./functions/authorize.js";
import { FimsAuthFn } from "./functions/fauth.js";
import { FimsCallbackFn } from "./functions/fcb.js";
import { GetCardRequestsFn } from "./functions/get-requests.js";
import { GetYearsFn } from "./functions/get-years.js";
import { InfoFn } from "./functions/info.js";
import { LoadTestFn } from "./functions/load-test.js";
import { PostCardRequestsFn } from "./functions/post-requests.js";
import { ProcessPendingRequestFn } from "./functions/process-pending-request.js";
import { PendingCardRequestMessage } from "./types/queue-message.js";
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

// CosmosDB singleton
const cosmosDbClient = getCosmosDbClientInstance(
  config.COSMOSDB_CDC_URI,
  config.COSMOSDB_CDC_KEY,
);

// Redis client factory
const redisClientFactory = getRedisClientFactory(config);

const Info = InfoFn({ config, redisClientFactory });
app.http("Info", {
  authLevel: "anonymous",
  handler: Info,
  methods: ["GET"],
  route: "api/v1/info",
});

const FimsAuth = FimsAuthFn({ fimsClient, redisClientFactory });
app.http("FimsAuth", {
  authLevel: "function",
  handler: FimsAuth,
  methods: ["GET"],
  route: "api/v1/fauth",
});

const FimsCallback = FimsCallbackFn({ config, fimsClient, redisClientFactory });
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

const GetYears = GetYearsFn({});
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
});
app.http("PostCardRequests", {
  authLevel: "function",
  handler: PostCardRequests,
  methods: ["POST"],
  route: "api/v1/card-requests",
});

const ProcessPendingRequest = ProcessPendingRequestFn({
  config,
  cosmosDbClient,
  inputDecoder: PendingCardRequestMessage,
  redisClientFactory,
});
app.storageQueue("ProcessPendingRequest", {
  connection: "STORAGE_ACCOUNT",
  handler: ProcessPendingRequest,
  queueName: config.CARD_REQUEST_QUEUE_NAME,
});

const LoadTest = LoadTestFn({
  config,
  cosmosDbClient,
  queueStorage,
});
app.http("LoadTest", {
  authLevel: "function",
  handler: LoadTest,
  methods: ["POST"],
  route: "api/v1/load-test",
});
