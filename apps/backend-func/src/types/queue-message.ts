import { FiscalCode, Ulid } from "@pagopa/ts-commons/lib/strings.js";

export interface CardMessage {
  activation_date: Date;
  expiration_date: Date;
  fiscal_code: FiscalCode;
  request_id: Ulid;
}
