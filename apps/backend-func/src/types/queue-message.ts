import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as t from "io-ts";

import { Year } from "../models/card_request.js";

export const PendingCardRequestMessage = t.type({
  fiscal_code: FiscalCode,
  request_date: IsoDateFromString,
  request_id: NonEmptyString,
  years: t.array(Year),
});
export type PendingCardRequestMessage = t.TypeOf<
  typeof PendingCardRequestMessage
>;
