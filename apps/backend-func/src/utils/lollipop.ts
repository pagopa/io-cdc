import { JwkPublicKey } from "@pagopa/ts-commons/lib/jwk.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, pipe } from "fp-ts/lib/function.js";
import { DOMParser } from "@xmldom/xmldom";
import { AssertionRef } from "../types/lollipop.js";
import {
  calculateAssertionRef,
  getAlgoFromAssertionRef,
} from "../utils/lollipopKeys.js";
import {
  getFiscalNumberFromSamlResponse,
  getNotOnOrAfterFromSamlResponse,
  getRequestIDFromSamlResponse,
} from "../utils/saml.js";

type Verifier = (assertion: Document) => TE.TaskEither<Error, true>;

export const parseAssertion = (assertionXml: NonEmptyString) =>
  TE.tryCatch(
    async () => new DOMParser().parseFromString(assertionXml, "text/xml"),
    flow(
      E.toError,
      (e) => new Error(`Error parsing retrieved saml response: ${e.message}`),
    ),
  );

export const getAssertionRefVsInRensponseToVerifier =
  (pubKey: JwkPublicKey, assertionRefFromHeader: AssertionRef): Verifier =>
  (assertion): ReturnType<Verifier> =>
    pipe(
      assertion,
      getRequestIDFromSamlResponse,
      TE.fromOption(
        () => new Error("Missing request id in the retrieved saml assertion."),
      ),
      TE.filterOrElse(
        AssertionRef.is,
        () =>
          new Error(
            "InResponseTo in the assertion do not contains a valid Assertion Ref.",
          ),
      ),
      TE.bindTo("inResponseTo"),
      TE.bind("algo", ({ inResponseTo }) =>
        TE.of(getAlgoFromAssertionRef(inResponseTo)),
      ),
      TE.chain(({ algo, inResponseTo }) =>
        pipe(
          pubKey,
          calculateAssertionRef(algo),
          TE.mapLeft(
            (e) =>
              new Error(
                `Error calculating the hash of the provided public key: ${e.message}`,
              ),
          ),
          TE.filterOrElse(
            (calcAssertionRef) =>
              calcAssertionRef === inResponseTo &&
              assertionRefFromHeader === inResponseTo,
            (calcAssertionRef) =>
              new Error(
                `The hash of provided public key do not match the InReponseTo in the assertion: fromSaml=${inResponseTo},fromPublicKey=${calcAssertionRef},fromHeader=${assertionRefFromHeader}`,
              ),
          ),
        ),
      ),
      TE.map(() => true as const),
    );

export const getAssertionUserIdVsCfVerifier =
  (fiscalCodeFromHeader: FiscalCode): Verifier =>
  (assertion): ReturnType<Verifier> =>
    pipe(
      assertion,
      getFiscalNumberFromSamlResponse,
      TE.fromOption(
        () =>
          new Error(
            "Missing or invalid Fiscal Code in the retrieved saml assertion.",
          ),
      ),
      TE.filterOrElse(
        (fiscalCodeFromAssertion) =>
          fiscalCodeFromAssertion === fiscalCodeFromHeader,
        (fiscalCodeFromAssertion) =>
          new Error(
            `The provided user id do not match the fiscalNumber in the assertion: fromSaml=${fiscalCodeFromAssertion},fromHeader=${fiscalCodeFromHeader}`,
          ),
      ),
      TE.map(() => true as const),
    );

export const getAssertionNotOnOrAfterVerifier =
  (): Verifier =>
  (assertion): ReturnType<Verifier> =>
    pipe(
      assertion,
      getNotOnOrAfterFromSamlResponse,
      TE.fromOption(() => new Error("NotOnOrAfter not found in assertion")),
      TE.chain(
        TE.fromPredicate(
          (notOnOrAfter) => new Date().toISOString() < notOnOrAfter,
          (notOnOrAfter) => new Error(`NotOnOrAfter ${notOnOrAfter} is passed`),
        ),
      ),
      TE.map(() => true as const),
    );

export const getAssertionSignatureVerifier =
  (): Verifier => (): ReturnType<Verifier> =>
    TE.of(true);
