import * as TE from "fp-ts/lib/TaskEither.js";
import { vi } from "vitest";

import { QueueStorage } from "../utils/queue.js";

// mock queue storage
export const enqueueMessageMock = vi
  .fn()
  .mockImplementation(() => TE.right(true));

export const queueStorageMock = {
  enqueuePendingCardRequestMessage: enqueueMessageMock,
} as unknown as QueueStorage;
