import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";

import { CardRequest } from "../models/card_request.js";
import { Session } from "../models/session.js";
import { OidcConfig } from "../utils/fims.js";

export const aValidFiscalCode = "AAABBB00C00D000E" as FiscalCode;

export const aCardRequest: CardRequest = {
  createdAt: new Date(),
  fiscalCode: aValidFiscalCode,
  id: "anystringedid" as NonEmptyString,
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
