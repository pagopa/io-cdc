import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as O from "fp-ts/lib/Option.js";
import { flow, pipe } from "fp-ts/lib/function.js";

export const SAML_NAMESPACE = {
  ASSERTION: "urn:oasis:names:tc:SAML:2.0:assertion",
  PROTOCOL: "urn:oasis:names:tc:SAML:2.0:protocol",
};

export const getAttributeFromSamlResponse =
  (tagName: string, attrName: string, namespace: string) =>
  (doc: Document): O.Option<string> =>
    pipe(
      O.fromNullable(doc.getElementsByTagNameNS(namespace, tagName).item(0)),
      O.chain((element) =>
        O.fromEither(NonEmptyString.decode(element.getAttribute(attrName))),
      ),
    );

export const getValueFromSamlResponse =
  (tagName: string, namespace: string) =>
  (doc: Document): O.Option<string> =>
    pipe(
      O.fromNullable(doc.getElementsByTagNameNS(namespace, tagName).item(0)),
      O.chain((element) =>
        O.fromEither(NonEmptyString.decode(element.textContent)),
      ),
    );

export const getNotOnOrAfterFromSamlResponse = getAttributeFromSamlResponse(
  "SubjectConfirmationData",
  "NotOnOrAfter",
  SAML_NAMESPACE.ASSERTION,
);

export const getRequestIDFromSamlResponse = getAttributeFromSamlResponse(
  "SubjectConfirmationData",
  "InResponseTo",
  SAML_NAMESPACE.ASSERTION,
);

export const getIssueIstantFromSamlResponse = flow(
  getAttributeFromSamlResponse(
    "Response",
    "IssueInstant",
    SAML_NAMESPACE.PROTOCOL,
  ),
  O.map(IsoDateFromString.decode),
  O.chain(O.fromEither),
);

export const getIssuerFromSamlResponse = getValueFromSamlResponse(
  "Issuer",
  SAML_NAMESPACE.ASSERTION,
);

export const getFiscalNumberFromSamlResponse = (
  doc: Document,
): O.Option<FiscalCode> =>
  pipe(
    O.fromNullable(
      doc.getElementsByTagNameNS(SAML_NAMESPACE.ASSERTION, "Attribute"),
    ),
    O.chainNullableK((collection) =>
      Array.from(collection).find(
        (elem) => elem.getAttribute("Name") === "fiscalNumber",
      ),
    ),
    O.chainNullableK(
      (fiscalCodeElement) =>
        fiscalCodeElement.textContent?.trim().replace("TINIT-", ""),
    ),
    O.chain((fiscalCode) => O.fromEither(FiscalCode.decode(fiscalCode))),
  );
