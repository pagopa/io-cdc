import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";

import { Year } from "../models/card_request.js";

export interface PendingCardRequestMessage {
  fiscal_code: FiscalCode;
  request_date: Date;
  request_id: NonEmptyString;
  years: Year[];
}
