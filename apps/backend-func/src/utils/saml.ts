import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import { DOMParser } from "@xmldom/xmldom";
import * as E from "fp-ts/lib/Either.js";
import * as O from "fp-ts/lib/Option.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, pipe } from "fp-ts/lib/function.js";
import { SignedXml } from "xml-crypto";
import * as xpath from "xpath";

export const parseAssertion = (assertionXml: NonEmptyString) =>
  TE.tryCatch(
    async () => new DOMParser().parseFromString(assertionXml, "text/xml"),
    flow(
      E.toError,
      (e) => new Error(`Error parsing retrieved saml response: ${e.message}`),
    ),
  );

export const SAML_NAMESPACE = {
  ASSERTION: "urn:oasis:names:tc:SAML:2.0:assertion",
  PROTOCOL: "urn:oasis:names:tc:SAML:2.0:protocol",
  SIGNATURE: "http://www.w3.org/2000/09/xmldsig#",
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
    O.chainNullableK((fiscalCodeElement) =>
      fiscalCodeElement.textContent?.trim().replace("TINIT-", ""),
    ),
    O.chain((fiscalCode) => O.fromEither(FiscalCode.decode(fiscalCode))),
  );

export const getSignaturesFromSamlResponse = (doc: Document) =>
  pipe(
    doc.getElementsByTagNameNS(SAML_NAMESPACE.SIGNATURE, "Signature"),
    O.fromNullable,
    O.getOrElseW(() => {
      throw new Error("Missing signature");
    }),
  );

export const getIdpKeysFromMetadata = (doc: Document, idp: string) => {
  const xpathExpression = `//*[local-name()='EntityDescriptor'][contains(@entityID,'${idp}')]/*[local-name()='IDPSSODescriptor']/*[local-name()='KeyDescriptor']//*[name()='ds:X509Certificate']/text()`;
  const idpKeysSelection = xpath.select(xpathExpression, doc)?.toString();

  let keys = idpKeysSelection?.split(",").map((k) => addHeaders(sanitize(k)));
  if (!keys) keys = [];
  return keys;
};

export const checkAssertionSignatures = async (
  assertionXml: NonEmptyString,
  idpKeysBaseUrl: NonEmptyString,
) => {
  let doc;
  try {
    doc = new DOMParser().parseFromString(assertionXml, "text/xml");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (ex) {
    throw "Invalid assertion";
  }

  const issuer = doc
    .getElementsByTagNameNS(SAML_NAMESPACE.ASSERTION, "Issuer")
    .item(0)?.textContent;
  if (!issuer) throw "Issuer not found";

  const CIE_IDP_IDENTIFIERS = [
    "https://collaudo.idserver.servizicie.interno.gov.it/idp/profile/SAML2/POST/SSO",
    "https://idserver.servizicie.interno.gov.it/idp/profile/SAML2/POST/SSO",
    "https://preproduzione.idserver.servizicie.interno.gov.it/idp/profile/SAML2/POST/SSO",
  ];

  const isCie = CIE_IDP_IDENTIFIERS.includes(issuer);

  const issueInstant = doc
    .getElementsByTagNameNS(SAML_NAMESPACE.PROTOCOL, "Response")
    .item(0)
    ?.getAttribute("IssueInstant");
  if (!issueInstant) throw "IssueInstant not found";
  const issueInstantTimestamp = pipe(
    issueInstant,
    IsoDateFromString.decode,
    E.map((date) => Math.floor(date.getTime() / 1000).toString()),
    E.getOrElseW(() => {
      throw "Invalid IssueInstant";
    }),
  );

  const idpKeyEndpoint = isCie
    ? `${idpKeysBaseUrl}/cie`
    : `${idpKeysBaseUrl}/spid`;

  const idpKeysTimestampsResponse = await fetch(idpKeyEndpoint);
  const idpKeysTimestamps: string[] = await idpKeysTimestampsResponse.json();

  // get latest keys
  const latestIdpKeysResponse = await fetch(`${idpKeyEndpoint}/latest`);
  const latestIdpKeys: string = await latestIdpKeysResponse.text();
  const parsedLatestIdpKeys: Document = new DOMParser().parseFromString(
    latestIdpKeys,
    "text/xml",
  );

  const latestKeys = getIdpKeysFromMetadata(parsedLatestIdpKeys, issuer);

  // find alternative keys with a suitable timestamp if latest keys do not work
  // the timestamp is suitable if just before issueinstant
  const alternativeSuitableTimestamp = idpKeysTimestamps
    .filter((ts) => ts <= issueInstantTimestamp)
    .sort()
    .pop();

  let alternativeKeys: string[] = [];
  if (alternativeSuitableTimestamp) {
    const idpKeysResponse = await fetch(
      `${idpKeyEndpoint}/${alternativeSuitableTimestamp}`,
    );
    const idpKeys: string = await idpKeysResponse.text();
    const parsedIdpKeys: Document = new DOMParser().parseFromString(
      idpKeys,
      "text/xml",
    );
    alternativeKeys = getIdpKeysFromMetadata(parsedIdpKeys, issuer);
  }

  const keys = [...latestKeys, ...alternativeKeys];

  // we check signatures against sanitized and headered latest keys and the alternative keys
  checkSignatures(assertionXml, doc, keys);
};

export const sanitize = (key: string) =>
  key.replaceAll("\n", "").replaceAll(" ", "");

export const addHeaders = (key: string) =>
  key.indexOf("-----BEGIN") >= 0
    ? key
    : `-----BEGIN CERTIFICATE-----\n${key}\n-----END CERTIFICATE-----`;

export const checkSignatures = (
  xml: NonEmptyString,
  doc: Document,
  keys: string[],
) => {
  let verified = false;
  const errors: unknown[] = [];
  keys?.forEach((key) => {
    const sig = new SignedXml({ publicCert: key });
    const signatures = getSignaturesFromSamlResponse(doc);
    for (let i = 0; i < signatures.length; i++) {
      const signature = signatures.item(i)?.cloneNode(true);
      if (!signature) throw "Cannot get signature";
      sig.loadSignature(signature);
      let res;
      try {
        res = sig.checkSignature(xml);
        if (res) verified = true;
      } catch (ex) {
        errors.push(ex);
        continue;
      }
    }
  });
  if (!verified) throw `Cannot verify signature|${JSON.stringify(errors)}`;
};
