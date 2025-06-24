import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import { DOMParser } from "@xmldom/xmldom";
import * as O from "fp-ts/lib/Option.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import { describe, expect, it } from "vitest";

import { aSAMLResponse } from "../../__mocks__/assertion.mock.js";
import { idpsMetadata } from "../../__mocks__/idps.mock.js";
import { aDifferentPublicKey, aPrimaryKey } from "../../__mocks__/keys.mock.js";
import {
  checkSignatures,
  getIdpKeysFromMetadata,
  getIssueIstantFromSamlResponse,
  getIssuerFromSamlResponse,
  getNotOnOrAfterFromSamlResponse,
  getSignaturesFromSamlResponse,
  parseAssertion,
} from "../saml.js";

const assertion = await pipe(
  parseAssertion(aSAMLResponse as NonEmptyString),
  TE.getOrElse(() => {
    throw new Error("Cannot parse saml response");
  }),
)();

describe("SamlUtils", () => {
  it("should get Signature from saml response", () => {
    const signature = getSignaturesFromSamlResponse(assertion);
    expect(signature).toBeDefined();
  });

  it("should get Issuer from saml response", () => {
    const maybeIssuer = getIssuerFromSamlResponse(assertion);
    expect(O.isSome(maybeIssuer)).toBe(true);
  });

  it("should get NotOnOrAfter from saml response", () => {
    const maybeNotOnOrAfter = getNotOnOrAfterFromSamlResponse(assertion);
    expect(O.isSome(maybeNotOnOrAfter)).toBe(true);
  });

  it("should get IssueIstant from saml response", () => {
    const maybeIssueInstant = getIssueIstantFromSamlResponse(assertion);
    expect(O.isSome(maybeIssueInstant)).toBe(true);
  });
});

describe("IDPMetadata", () => {
  it("should extract the given idp keys", () => {
    const parsedIdpMetadata: Document = new DOMParser().parseFromString(
      idpsMetadata,
      "text/xml",
    );
    const issuer = "https://posteid.poste.it";
    const keys = getIdpKeysFromMetadata(parsedIdpMetadata, issuer);
    expect(keys?.length).toBe(2);
  });
});

describe("CheckSignatures", () => {
  it("should verify signatures when right key given", () => {
    expect(() =>
      checkSignatures(aSAMLResponse, assertion, [aPrimaryKey.publicKey]),
    ).not.toThrow();
  });

  it("should throw when wrong key given", () => {
    expect(() =>
      checkSignatures(aSAMLResponse, assertion, [aDifferentPublicKey]),
    ).toThrow();
  });
});
