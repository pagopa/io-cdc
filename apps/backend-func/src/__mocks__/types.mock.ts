import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";

import { CardRequest } from "../models/card_request.js";
import { RequestAudit } from "../models/request_audit.js";
import { Session } from "../models/session.js";
import { PendingCardRequestMessage } from "../types/queue-message.js";
import { OidcConfig } from "../utils/fims.js";

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

export const aPendingCardRequestMessage: PendingCardRequestMessage = {
  first_name: aValidFirstName,
  fiscal_code: aValidFiscalCode,
  last_name: aValidLastName,
  request_date: new Date("2025-07-12T14:16:49.633Z"),
  request_id: "anystringedid" as NonEmptyString,
  years: ["2020", "2021", "2023"],
};

export const aValidSession: Session = {
  family_name: aValidLastName,
  fiscal_code: aValidFiscalCode,
  given_name: aValidFirstName,
};

export const anOidcConfig: OidcConfig = {
  OIDC_CLIENT_ID: "clientid" as NonEmptyString,
  OIDC_CLIENT_REDIRECT_URI: "redirecturl" as NonEmptyString,
  OIDC_CLIENT_SECRET: "clientsecret" as NonEmptyString,
  OIDC_ISSUER_URL: "issuerurl" as NonEmptyString,
  OIDC_SCOPE: "scope" as NonEmptyString,
};
