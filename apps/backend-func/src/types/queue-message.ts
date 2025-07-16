import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as t from "io-ts";

import { Year } from "../models/card_request.js";

export const PendingCardRequestMessage = t.type({
  first_name: NonEmptyString,
  fiscal_code: FiscalCode,
  last_name: NonEmptyString,
  request_date: IsoDateFromString,
  request_id: NonEmptyString,
  years: t.array(Year),
});
export type PendingCardRequestMessage = t.TypeOf<
  typeof PendingCardRequestMessage
>;
