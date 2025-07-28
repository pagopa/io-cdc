import { JwkPublicKey } from "@pagopa/ts-commons/lib/jwk.js";
import * as E from "fp-ts/lib/Either.js";
import * as O from "fp-ts/lib/Option.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import * as B from "fp-ts/lib/boolean.js";
import { flow, pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import {
  AssertionRef,
  AssertionRefSha256,
  AssertionRefSha384,
  AssertionRefSha512,
  JwkPubKeyHashAlgorithm,
  JwkPubKeyHashAlgorithmEnum,
} from "../types/lollipop.js";
import { calculateThumbprint } from "./thumbprint.js";

export const MASTER_HASH_ALGO = JwkPubKeyHashAlgorithmEnum.sha512;
export const AssertionRefByType = t.intersection([
  t.type({
    master: AssertionRef,
  }),
  t.partial({
    used: AssertionRef,
  }),
]);

export type AssertionRefByType = t.TypeOf<typeof AssertionRefByType>;

const getMasterAssertionRefType = (
  masterAlgo: JwkPubKeyHashAlgorithm,
): (typeof AssertionRef.types)[number] => {
  switch (masterAlgo) {
    case JwkPubKeyHashAlgorithmEnum.sha512:
      return AssertionRefSha512;
    case JwkPubKeyHashAlgorithmEnum.sha384:
      return AssertionRefSha384;
    case JwkPubKeyHashAlgorithmEnum.sha256:
      return AssertionRefSha256;
    default:
      return AssertionRefSha256;
  }
};

export const calculateAssertionRef =
  (algo: JwkPubKeyHashAlgorithm) =>
  (jwkPublicKey: JwkPublicKey): TE.TaskEither<Error, AssertionRef> =>
    pipe(
      jwkPublicKey,
      calculateThumbprint(algo),
      TE.chainEitherK(
        flow(
          (thumbprint) => `${algo}-${thumbprint}`,
          AssertionRef.decode,
          E.mapLeft(() => Error("Cannot decode master AssertionRef")),
        ),
      ),
    );

export const algoToAssertionRefSet = new Set([
  { algo: JwkPubKeyHashAlgorithmEnum.sha256, type: AssertionRefSha256 },
  { algo: JwkPubKeyHashAlgorithmEnum.sha384, type: AssertionRefSha384 },
  { algo: JwkPubKeyHashAlgorithmEnum.sha512, type: AssertionRefSha512 },
]);

export const getAlgoFromAssertionRef = (
  assertionRef: AssertionRef,
): JwkPubKeyHashAlgorithm =>
  pipe(
    Array.from(algoToAssertionRefSet),
    (ar) => ar.find((entry) => entry.type.is(assertionRef)),
    O.fromNullable,
    O.map((pubKeyHashAlgo) => pubKeyHashAlgo.algo),
    O.getOrElseW(() => void 0 as never),
  );

/**
 * Return all assertionsRef related to a given used pubKey
 */
export const getAllAssertionsRef = (
  masterAlgo: JwkPubKeyHashAlgorithm,
  usedAlgo: JwkPubKeyHashAlgorithm,
  jwkPubKey: JwkPublicKey,
): TE.TaskEither<Error, AssertionRefByType> =>
  pipe(
    jwkPubKey,
    calculateAssertionRef(usedAlgo),
    TE.chain((usedAssertionRef) =>
      pipe(
        usedAssertionRef,
        getMasterAssertionRefType(masterAlgo).is,
        B.fold(
          () =>
            pipe(
              jwkPubKey,
              calculateAssertionRef(masterAlgo),
              TE.map((validMasterLollipopPubKeyAssertionRef) => ({
                master: validMasterLollipopPubKeyAssertionRef,
                used: usedAssertionRef,
              })),
            ),
          () => TE.of({ master: usedAssertionRef }),
        ),
      ),
    ),
  );
