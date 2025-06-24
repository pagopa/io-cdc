import {
  Verifier,
  algMap,
  verifySignatureHeader,
} from "@mattrglobal/http-signatures";
import { JwkPublicKey } from "@pagopa/ts-commons/lib/jwk.js";
import * as crypto from "crypto";
import { JsonWebKey } from "crypto";
import * as A from "fp-ts/lib/Array.js";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, pipe } from "fp-ts/lib/function.js";

import { AssertionRef } from "../types/lollipop.js";
import { getAlgoFromAssertionRef } from "./lollipopKeys.js";

// ----------------------
// Custom Verifiers
// ----------------------

/**
 * Builder for `ecdsa-p256-sha256` signature verifier with dsaEncoding defined by the caller.
 * It's based on the`ecdsa-p256-sha256` one, defined in @mattrglobal/http-signatures library.
 * See https://github.com/mattrglobal/http-signatures/blob/v4.0.1/src/common/cryptoPrimatives.ts
 *
 * @param key the public key
 * @returns a function that takes the data and the signature
 *  and return the comparison between them, based on the algorithm and the public key
 */
export const getVerifyEcdsaSha256WithEncoding =
  (dsaEncoding: crypto.DSAEncoding) =>
  (key: JsonWebKey) =>
  async (data: Uint8Array, signature: Uint8Array): Promise<boolean> => {
    const keyObject = crypto.createPublicKey({ format: "jwk", key });
    return crypto.createVerify("SHA256").update(data).verify(
      {
        dsaEncoding,
        key: keyObject,
      },
      signature,
    );
  };

/**
 * Builder for `rsa-pss-sha256` signature verifier  with dsaEncoding defined by the caller
 * It's based on the`rsa-pss-sha512` one, defined in @mattrglobal/http-signatures library.
 * See https://github.com/mattrglobal/http-signatures/blob/v4.0.1/src/common/cryptoPrimatives.ts
 *
 * @param key the public key
 * @returns a function that takes the data and the signature
 *  and return the comparison between them, based on the algorithm and the public key
 */
export const getVerifyRsaPssSha256WithEncoding =
  (dsaEncoding: crypto.DSAEncoding) =>
  (key: JsonWebKey) =>
  async (data: Uint8Array, signature: Uint8Array): Promise<boolean> => {
    const keyObject = crypto.createPublicKey({ format: "jwk", key });
    return crypto.createVerify("SHA256").update(data).verify(
      {
        dsaEncoding,
        key: keyObject,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      },
      signature,
    );
  };

export type SupportedAlgTypes = keyof typeof extendedAlgMap;

export const extendedAlgMap = {
  ...algMap,
  // Override standard algos
  ["ecdsa-p256-sha256"]: {
    verify: getVerifyEcdsaSha256WithEncoding,
  },
  ["rsa-pss-sha256"]: {
    verify: getVerifyRsaPssSha256WithEncoding,
  },
};

export const getCustomVerifyWithEncoding =
  (dsaEncoding: crypto.DSAEncoding) =>
  (keyMap: Readonly<Record<string, { readonly key: JsonWebKey }>>) =>
  async (
    signatureParams: {
      readonly alg: SupportedAlgTypes;
      readonly keyid: string;
    },
    data: Uint8Array,
    signature: Uint8Array,
  ): Promise<boolean> => {
    if (keyMap[signatureParams.keyid] === undefined) {
      return Promise.resolve(false);
    }
    return extendedAlgMap[signatureParams.alg].verify(dsaEncoding)(
      keyMap[signatureParams.keyid].key,
    )(data, signature);
  };

export const verifyHttpSignatures = (
  assertion_ref: AssertionRef,
  httpHeaders: Record<string, string>,
  url: string,
  publicKey: JwkPublicKey,
) =>
  pipe(
    TE.of(getAlgoFromAssertionRef(assertion_ref)),
    TE.map((algo) => `${algo}-`),
    TE.map((assertionRefPrefix) => assertion_ref.split(assertionRefPrefix)),
    TE.chain(
      flow(
        A.tail,
        TE.fromOption(() => new Error("Unexpected assertionRef")),
        TE.map((_) => _.join("")),
      ),
    ),
    TE.map((thumbprint) => ({
      httpHeaders,
      method: "GET",
      url,
      verifier: {
        verify: getCustomVerifyWithEncoding("der")({
          [thumbprint]: {
            key: publicKey,
          },
        }),
      } as Verifier,
    })),
    TE.chain((params) =>
      TE.tryCatch(async () => verifySignatureHeader(params), E.toError),
    ),
    TE.map((res) =>
      res.map((r) =>
        r.verified
          ? TE.of(true as const)
          : TE.left(
              new Error(
                `HTTP Request Signature failed ${JSON.stringify(r.reason)}`,
              ),
            ),
      ),
    ),
    TE.chainW((res) =>
      res.unwrapOr(
        TE.left(new Error("An error occurred during signature check")),
      ),
    ),
  );
