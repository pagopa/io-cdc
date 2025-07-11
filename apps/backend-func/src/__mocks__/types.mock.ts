import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";

import { CardRequest } from "../models/card_request.js";
import { Session } from "../models/session.js";
import { OidcConfig } from "../utils/fims.js";
import { RequestAudit } from "../models/request_audit.js";

export const aValidFiscalCode = "AAABBB00C00D000E" as FiscalCode;

export const aRequestAudit: RequestAudit = {
  fiscalCode: aValidFiscalCode,
  id: "anystringedid" as NonEmptyString,
  requestDate: new Date(),
  requestId: "anystringedid" as NonEmptyString,
  years: ["2020", "2021", "2023"],
};

export const aCardRequest: CardRequest = {
  createdAt: new Date(),
  fiscalCode: aValidFiscalCode,
  id: "anystringedid" as NonEmptyString,
  requestDate: new Date(),
  requestId: "anystringedid" as NonEmptyString,
  year: "2020",
};

export const aValidSession: Session = {
  family_name: "Asurname" as NonEmptyString,
  fiscal_code: aValidFiscalCode,
  given_name: "Aname" as NonEmptyString,
};

export const anOidcConfig: OidcConfig = {
  OIDC_CLIENT_ID: "clientid" as NonEmptyString,
  OIDC_CLIENT_REDIRECT_URI: "redirecturl" as NonEmptyString,
  OIDC_CLIENT_SECRET: "clientsecret" as NonEmptyString,
  OIDC_ISSUER_URL: "issuerurl" as NonEmptyString,
  OIDC_SCOPE: "scope" as NonEmptyString,
};
