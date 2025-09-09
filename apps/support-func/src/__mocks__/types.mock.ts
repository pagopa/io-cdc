import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";

import { CardRequest } from "../models/card_request.js";
import { RequestAudit } from "../models/request_audit.js";

export const aValidFiscalCode = "AAABBB00C00D000E" as FiscalCode;
export const aValidFirstName = "Aname" as NonEmptyString;
export const aValidLastName = "Asurname" as NonEmptyString;

export const aRequestAudit: RequestAudit = {
  fiscalCode: aValidFiscalCode,
  id: "anystringedid" as NonEmptyString,
  requestDate: new Date("2025-07-11T14:16:49.633Z"),
  requestId: "anystringedid" as NonEmptyString,
  years: ["2020", "2021", "2023"],
};

export const aCardRequest: CardRequest = {
  createdAt: new Date(),
  fiscalCode: aValidFiscalCode,
  id: "anystringedid" as NonEmptyString,
  requestDate: new Date("2025-07-11T14:16:49.633Z"),
  requestId: "anystringedid" as NonEmptyString,
  year: "2020",
};
