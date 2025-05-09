import { app } from "@azure/functions";

import { InfoFn } from "./functions/info";

const Info = InfoFn({});
app.http("Info", {
  authLevel: "anonymous",
  handler: Info,
  methods: ["GET"],
  route: "info",
});
