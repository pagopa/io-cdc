import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as O from "fp-ts/lib/Option.js";
import { flow, pipe } from "fp-ts/lib/function.js";

const SAML_NAMESPACE = {
  ASSERTION: "urn:oasis:names:tc:SAML:2.0:assertion",
  PROTOCOL: "urn:oasis:names:tc:SAML:2.0:protocol",
};

export const getAttributeFromSamlResponse =
  (tagName: string, attrName: string) =>
  (doc: Document): O.Option<string> =>
    pipe(
      O.fromNullable(
        doc.getElementsByTagNameNS(SAML_NAMESPACE.ASSERTION, tagName).item(0),
      ),
      O.chain((element) =>
        O.fromEither(NonEmptyString.decode(element.getAttribute(attrName))),
      ),
    );

export const getNotOnOrAfterFromSamlResponse = getAttributeFromSamlResponse(
  "SubjectConfirmationData",
  "NotOnOrAfter",
);

export const getRequestIDFromSamlResponse = getAttributeFromSamlResponse(
  "SubjectConfirmationData",
  "InResponseTo",
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

export const getIssuerFromSamlResponse = (
  doc: Document,
): O.Option<NonEmptyString> =>
  pipe(
    doc.evaluate("//Response/Assertion/Issuer", doc),
    (issuer) => issuer.stringValue,
    NonEmptyString.decode,
    O.fromEither,
  );
