import { QueueService } from "azure-storage";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

import { Config } from "../config.js";
import { toBase64 } from "./base64.js";

export class QueueStorage {
  config: Config;
  createMessage = (queueName: string, message: string) =>
    TE.tryCatch(
      async () =>
        new Promise<boolean>((resolve, reject) =>
          this.queueService.createMessage(queueName, message, (error: Error) =>
            error ? reject(error) : resolve(true),
          ),
        ),
      E.toError,
    );

  createQueue = (queueName: string) =>
    TE.tryCatch(
      () =>
        new Promise<boolean>((resolve, reject) =>
          this.queueService.createQueueIfNotExists(queueName, (error: Error) =>
            error ? reject(error) : resolve(true),
          ),
        ),
      E.toError,
    );

  enqueueMessage = (queueName: string, message: string) =>
    pipe(
      this.createQueue(queueName),
      TE.chain(() => this.createMessage(queueName, message)),
    );

  enqueuePendingCGNMessage = (message: string) =>
    this.enqueueMessage(this.config.CARD_REQUEST_QUEUE_NAME, toBase64(message));

  queueService: QueueService;

  constructor(config: Config) {
    this.config = config;
    this.queueService = new QueueService(this.config.STORAGE_CONNECTION_STRING);
  }
}
