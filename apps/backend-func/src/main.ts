import { app } from "@azure/functions";

import { InfoFn } from "./functions/info";
import { getConfigOrThrow } from "./config";
import { getRedisClientFactory } from "./utils/redis";

const config = getConfigOrThrow();

const redisClientFactory = getRedisClientFactory(config);

const Info = InfoFn({ config, redisClientFactory });
app.http("Info", {
  authLevel: "anonymous",
  handler: Info,
  methods: ["GET"],
  route: "info",
});
