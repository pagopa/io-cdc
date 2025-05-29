import { app } from "@azure/functions";

import { InfoFn } from "./functions/info";
import { getConfigOrThrow } from "./config";

const config = getConfigOrThrow();

const Info = InfoFn({ config });
app.http("Info", {
  authLevel: "anonymous",
  handler: Info,
  methods: ["GET"],
  route: "info",
});
