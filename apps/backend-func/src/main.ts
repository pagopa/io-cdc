import { app } from "@azure/functions";

import { getConfigOrThrow } from "./config";
import { AuthorizeFn } from "./functions/authorize";
import { FimsAuthFn } from "./functions/fauth";
import { FimsCallbackFn } from "./functions/fcb";
import { GetCardRequestsFn } from "./functions/get-requests";
import { GetYearsFn } from "./functions/get-years";
import { InfoFn } from "./functions/info";
import { PostCardRequestsFn } from "./functions/post-requests";
import { getCosmosDbClientInstance } from "./utils/cosmosdb";
import { getFimsClient } from "./utils/fims";
import { getRedisClientFactory } from "./utils/redis";

// Config
const config = getConfigOrThrow();

// Fims
const fimsClient = getFimsClient(config);

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

const FimsAuth = FimsAuthFn({ fimsClient });
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

const PostCardRequests = PostCardRequestsFn({});
app.http("PostCardRequests", {
  authLevel: "function",
  handler: PostCardRequests,
  methods: ["POST"],
  route: "api/v1/card-requests",
});
