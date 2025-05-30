import { app } from "@azure/functions";

import { getConfigOrThrow } from "./config";
import { InfoFn } from "./functions/info";
import { getRedisClientFactory } from "./utils/redis";
import { FimsAuthFn } from "./functions/fauth";
import { FimsCallbackFn } from "./functions/fcb";
import { AuthorizeFn } from "./functions/authorize";

const config = getConfigOrThrow();

const redisClientFactory = getRedisClientFactory(config);

const Info = InfoFn({ config, redisClientFactory });
app.http("Info", {
  authLevel: "anonymous",
  handler: Info,
  methods: ["GET"],
  route: "api/v1/info",
});

const FimsAuth = FimsAuthFn({});
app.http("FimsAuth", {
  authLevel: "function",
  handler: FimsAuth,
  methods: ["GET"],
  route: "api/v1/fauth",
});

const FimsCallback = FimsCallbackFn({});
app.http("FimsCallback", {
  authLevel: "function",
  handler: FimsCallback,
  methods: ["GET"],
  route: "api/v1/fcb",
});

const Authorize = AuthorizeFn({});
app.http("Authorize", {
  authLevel: "function",
  handler: Authorize,
  methods: ["GET"],
  route: "api/v1/authorize",
});
