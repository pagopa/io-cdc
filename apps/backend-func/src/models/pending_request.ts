import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as t from "io-ts";

import { Year } from "./card_request.js";

export const PendingRequest = t.type({
  fiscalCode: FiscalCode,
  requestDate: IsoDateFromString,
  requestId: NonEmptyString,
  years: t.array(Year),
});
export type PendingRequest = t.TypeOf<typeof PendingRequest>;
