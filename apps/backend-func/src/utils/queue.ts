import { DefaultAzureCredential } from "@azure/identity";
import { QueueServiceClient } from "@azure/storage-queue";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

import { Config } from "../config.js";
import { PendingCardRequestMessage } from "../types/queue-message.js";
import { toBase64 } from "./base64.js";

export class QueueStorage {
  config: Config;

  createMessage = (queueName: string, message: string) =>
    pipe(
      this.queueServiceClient.getQueueClient(queueName),
      TE.of,
      TE.chain((queueClient) =>
        TE.tryCatch(() => queueClient.sendMessage(message), E.toError),
      ),
      TE.map(() => true as const),
    );

  enqueuePendingCardRequestMessage = (message: PendingCardRequestMessage) =>
    this.createMessage(this.config.CARD_REQUEST_QUEUE_NAME, toBase64(message));

  queueServiceClient: QueueServiceClient;

  constructor(config: Config) {
    this.config = config;
    const credential = new DefaultAzureCredential();
    this.queueServiceClient = new QueueServiceClient(
      this.config.STORAGE_ACCOUNT__queueServiceUri,
      credential,
    );
  }
}
