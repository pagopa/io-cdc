import { afterEach, describe, it, vi } from "vitest";

import { getCosmosDbClientInstanceMock } from "../../__mocks__/cosmosdb.mock.js";
import { Config } from "../../config.js";

const config = {
  COSMOSDB_CDC_DATABASE_NAME: "database",
} as unknown as Config;

const cosmosDbClientMock = getCosmosDbClientInstanceMock();

describe("process-pending-requests | saveCardRequests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should ", async () => {});
});
