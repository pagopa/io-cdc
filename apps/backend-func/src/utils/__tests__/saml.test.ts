import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import { pipe } from "fp-ts/lib/function.js";
import * as O from "fp-ts/lib/Option.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { describe, expect, it } from "vitest";
import { aSAMLResponse } from "../../__mocks__/assertion.mock.js";
import { parseAssertion } from "../lollipop.js";
import {
  getIssueIstantFromSamlResponse,
  getIssuerFromSamlResponse,
  getNotOnOrAfterFromSamlResponse,
} from "../saml.js";

const assertion = await pipe(
  parseAssertion(aSAMLResponse as NonEmptyString),
  TE.getOrElse(() => {
    throw new Error("Cannot parse saml response");
  }),
)();

describe("SamlUtils", () => {
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
