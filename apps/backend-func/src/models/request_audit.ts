import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as t from "io-ts";

import { Year } from "./card_request.js";

export const RequestAudit = t.type({
  fiscalCode: FiscalCode,
  id: NonEmptyString,
  requestDate: IsoDateFromString,
  requestId: NonEmptyString,
  years: t.array(Year),
});
export type RequestAudit = t.TypeOf<typeof RequestAudit>;
