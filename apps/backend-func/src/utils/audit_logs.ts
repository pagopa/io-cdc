import { ContainerClient, RestError } from "@azure/storage-blob";
import { hashFiscalCode } from "@pagopa/ts-commons/lib/hash.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import { randomBytes } from "crypto";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

export enum OperationTypes {
  DELETE_VOUCHER = "delete-voucher",
  FIMS = "fims",
  GET_CARDS = "get-cards",
  GET_STATUS = "get-status",
  GET_VOUCHER = "get-voucher",
  GET_VOUCHERS = "get-vouchers",
  LOLLIPOP = "lollipop",
  POST_CARD_REQUEST = "post-card-request",
  POST_VOUCHER = "post-voucher",
}

const AuditExchangeDoc = t.type({
  authCode: t.string,
  fiscalCode: FiscalCode,
});

const AuditVerifyDoc = t.type({
  assertion: t.string,
  assertionRef: t.string,
  fiscalCode: FiscalCode,
  publicKey: NonEmptyString,
});

const AuditPartnerApiDoc = t.type({
  fiscalCode: FiscalCode,
  request: t.string,
  response: t.string,
});

const ActionTag = t.type({
  DateTime: t.string,
  FiscalCode: FiscalCode,
  Type: t.union([
    t.literal(OperationTypes.FIMS),
    t.literal(OperationTypes.LOLLIPOP),
    t.literal(OperationTypes.GET_STATUS),
    t.literal(OperationTypes.POST_CARD_REQUEST),
    t.literal(OperationTypes.GET_CARDS),
    t.literal(OperationTypes.GET_VOUCHERS),
    t.literal(OperationTypes.POST_VOUCHER),
    t.literal(OperationTypes.GET_VOUCHER),
    t.literal(OperationTypes.DELETE_VOUCHER),
  ]),
});

const AuditLogContent = t.union([
  AuditExchangeDoc,
  AuditVerifyDoc,
  AuditPartnerApiDoc,
]);

export type AuditExchangeDoc = t.TypeOf<typeof AuditExchangeDoc>;
export type AuditVerifyDoc = t.TypeOf<typeof AuditVerifyDoc>;
export type AuditPartnerApiDoc = t.TypeOf<typeof AuditPartnerApiDoc>;
export type ActionTag = t.TypeOf<typeof ActionTag>;
export type AuditLogContent = t.TypeOf<typeof AuditLogContent>;

/**
 * File name pattern "${hash(CF)}-${UTCDateTime}-tokentype-IdToken-randomBytes(3)".
 *
 * @param fiscal_number User Fiscal Number
 * @param token_type Token Type
 * @param token_id Token ID
 * @returns File Name
 */
export const generateBlobName = (
  fiscal_number: FiscalCode,
  type: OperationTypes,
): string => {
  const UTCDateTime = new Date().toISOString();
  const randomBytesPart = randomBytes(3).toString("hex");
  return `${hashFiscalCode(
    fiscal_number,
  )}-${UTCDateTime}-${type}-${randomBytesPart}`;
};

const encodeAuditLogDoc = (doc: AuditLogContent): string => {
  if (AuditLogContent.is(doc)) {
    return JSON.stringify(AuditLogContent.encode(doc));
  } else {
    throw new Error("Invalid type");
  }
};

export const storeAuditLog = (
  containerClient: ContainerClient,
  auditLogDoc: AuditExchangeDoc | AuditVerifyDoc,
  tags: ActionTag,
): TE.TaskEither<Error, true> =>
  pipe(
    TE.tryCatch(
      () => {
        const content = encodeAuditLogDoc(auditLogDoc);
        const blockBlobClient = containerClient.getBlockBlobClient(
          generateBlobName(tags.FiscalCode, tags.Type),
        );
        return blockBlobClient.upload(content, content.length, { tags });
      },
      (err) =>
        err instanceof RestError
          ? new Error(err.message)
          : new Error(String(err)),
    ),
    TE.chain((blobResponse) => {
      if (blobResponse._response.status >= 300) {
        return TE.left(
          new Error(`Cannot store audit log | ${JSON.stringify(blobResponse)}`),
        );
      }
      return TE.right(true);
    }),
  );

export const fireAndForgetPartnerApiAuditLog = (
  containerClient: ContainerClient,
  auditLogDoc: AuditPartnerApiDoc,
  tags: ActionTag,
): void => {
  const content = encodeAuditLogDoc(auditLogDoc);
  const blockBlobClient = containerClient.getBlockBlobClient(
    generateBlobName(tags.FiscalCode, tags.Type),
  );
  blockBlobClient.upload(content, content.length, { tags }).catch(() => {
    // DO NOTHING, we are in fire-and-forget mode
  });
};
