import { JwkPublicKey } from "@pagopa/ts-commons/lib/jwk.js";
import { FiscalCode } from "@pagopa/ts-commons/lib/strings.js";
import { addYears, isAfter } from "date-fns";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

import { AssertionRef } from "../types/lollipop.js";
import {
  calculateAssertionRef,
  getAlgoFromAssertionRef,
} from "../utils/lollipopKeys.js";
import {
  getFiscalNumberFromSamlResponse,
  getIssueIstantFromSamlResponse,
  getRequestIDFromSamlResponse,
} from "../utils/saml.js";

type Verifier = (assertion: Document) => TE.TaskEither<Error, true>;

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

export const getAssertionIssueInstantVerifier =
  (): Verifier =>
  (assertion): ReturnType<Verifier> =>
    pipe(
      assertion,
      getIssueIstantFromSamlResponse,
      TE.fromOption(() => new Error("IssueInstant not found in assertion")),
      TE.chain(
        TE.fromPredicate(
          (issueInstant) => isAfter(addYears(issueInstant, 1), new Date()),
          (issueInstant) =>
            new Error(`IssueInstant ${issueInstant} is more than 1 years ago`),
        ),
      ),
      TE.map(() => true as const),
    );

export const getAssertionSignatureVerifier =
  (): Verifier => (): ReturnType<Verifier> =>
    TE.of(true);
