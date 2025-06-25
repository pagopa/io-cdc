import { DefaultAzureCredential } from "@azure/identity";
import { QueueServiceClient } from "@azure/storage-queue";
import * as E from "fp-ts/lib/Either.js";
import * as O from "fp-ts/lib/Option.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, pipe } from "fp-ts/lib/function.js";

import { Config } from "../config.js";
import { PendingCardRequestMessage } from "../types/queue-message.js";
import { toBase64 } from "./base64.js";

interface QueueItem {
  name: string;
}

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

  createQueue = (queueName: string) =>
    pipe(
      TE.tryCatch(
        async () =>
          this.queueServiceClient.listQueues().byPage({ maxPageSize: 100 }),
        E.toError,
      ),
      TE.chain((iterator) =>
        TE.tryCatch(async () => {
          const page = (await iterator.next()).value;
          return page.queueItems || [];
        }, E.toError),
      ),
      TE.map((pageItems: QueueItem[]) => pageItems.map((i) => i.name)),
      TE.chain(
        flow(
          O.fromPredicate((queues) => queues.indexOf(queueName) < 0),
          O.fold(
            // in we find the queue in queues we are done
            () => TE.of(true as const),
            // in we don't find the queue in queues we create it
            () =>
              pipe(
                TE.tryCatch(
                  () => this.queueServiceClient.createQueue(queueName),
                  E.toError,
                ),
                TE.map(() => true as const),
              ),
          ),
        ),
      ),
    );

  enqueueMessage = (queueName: string, message: string) =>
    pipe(
      this.createQueue(queueName),
      TE.chain(() => this.createMessage(queueName, message)),
    );

  enqueuePendingCardRequestMessage = (message: PendingCardRequestMessage) =>
    this.enqueueMessage(this.config.CARD_REQUEST_QUEUE_NAME, toBase64(message));

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
