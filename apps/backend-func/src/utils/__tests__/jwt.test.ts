import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { describe, expect, it } from "vitest";

import {
  decodeAndVerifyJwtTE,
  decryptAndVerifyjwtTE,
  decryptTokenTE,
  encrypTokenTE,
  generateKeyPairTE,
  signJwtTE,
  signThenEncryptJwtTE,
} from "../jwt.js";

const jwtPayload = {
  first_name: "First",
  fiscal_code: "Fiscalcode",
  last_name: "Last",
};

describe("JWT Util", () => {
  it("should encode and sign a jwt", async () => {
    const jwt = await pipe(
      generateKeyPairTE(),
      TE.chain(({ privateKey }) => signJwtTE(privateKey, jwtPayload)),
    )();

    expect(E.isRight(jwt)).toBe(true);
  });

  it("should verify an encoded jwt", async () => {
    const verifiedJwt = await pipe(
      generateKeyPairTE(),
      TE.chain(({ privateKey, publicKey }) =>
        pipe(
          signJwtTE(privateKey, jwtPayload),
          TE.chain((jwt) => decodeAndVerifyJwtTE(publicKey, jwt)),
        ),
      ),
    )();

    expect(E.isRight(verifiedJwt)).toBe(true);
    if (E.isRight(verifiedJwt)) {
      expect(verifiedJwt.right).contains(jwtPayload);
    }
  });

  it("should encode, sign a jwt and encrypt it", async () => {
    const encryptedJwt = await pipe(
      generateKeyPairTE(),
      TE.chain(({ privateKey, publicKey }) =>
        pipe(
          signJwtTE(privateKey, jwtPayload),
          TE.chain((jwt) => encrypTokenTE(publicKey, jwt)),
        ),
      ),
    )();

    expect(E.isRight(encryptedJwt)).toBe(true);
  });

  it("should encode, sign a jwt, encrypt it and decrypt it", async () => {
    const jwt = await pipe(
      generateKeyPairTE(),
      TE.chain(({ privateKey, publicKey }) =>
        pipe(
          signJwtTE(privateKey, jwtPayload),
          TE.chain((jwt) => encrypTokenTE(publicKey, jwt)),
          TE.chain((token) => decryptTokenTE(privateKey, token)),
        ),
      ),
    )();

    expect(E.isRight(jwt)).toBe(true);
  });

  it("should encode, sign a jwt, encrypt it, decrypt it and verify it", async () => {
    const verifiedJwt = await pipe(
      generateKeyPairTE(),
      TE.chain(({ privateKey, publicKey }) =>
        pipe(
          signJwtTE(privateKey, jwtPayload),
          TE.chain((jwt) => encrypTokenTE(publicKey, jwt)),
          TE.chain((token) => decryptTokenTE(privateKey, token)),
          TE.chain((jwt) => decodeAndVerifyJwtTE(publicKey, jwt)),
        ),
      ),
    )();

    expect(E.isRight(verifiedJwt)).toBe(true);
    if (E.isRight(verifiedJwt)) {
      expect(verifiedJwt.right).contains(jwtPayload);
    }
  });

  it("should signThenEncryptJwtTE", async () => {
    const encryptedJwt = await pipe(
      generateKeyPairTE(),
      TE.chain(({ privateKey, publicKey }) =>
        signThenEncryptJwtTE(publicKey, privateKey, jwtPayload),
      ),
    )();

    expect(E.isRight(encryptedJwt)).toBe(true);
  });
  it("should decryptAndVerifyjwtTE", async () => {
    const verifiedJwt = await pipe(
      generateKeyPairTE(),
      TE.chain(({ privateKey, publicKey }) =>
        pipe(
          signThenEncryptJwtTE(publicKey, privateKey, jwtPayload),
          TE.chain((encryptedJwt) =>
            decryptAndVerifyjwtTE(publicKey, privateKey, encryptedJwt),
          ),
        ),
      ),
    )();

    expect(E.isRight(verifiedJwt)).toBe(true);
    if (E.isRight(verifiedJwt)) {
      expect(verifiedJwt.right).contains(jwtPayload);
    }
  });
});
