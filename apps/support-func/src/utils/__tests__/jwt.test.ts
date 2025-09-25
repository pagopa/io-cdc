import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import { describe, expect, it } from "vitest";

import { JwtConfig, JwtGenerator } from "../jwt.js";

const algKeys = "RS256" as NonEmptyString;
const algSignature = "RS256" as NonEmptyString;
const algEncription = "RSA-OAEP-256" as NonEmptyString;
const encEncryption = "A256CBC-HS512" as NonEmptyString;
const issuer = "PagoPA" as NonEmptyString;
const audience = "Sogei" as NonEmptyString;
const expiration = "1m" as NonEmptyString;

const jwtConfig: JwtConfig = {
  algEncription,
  algKeys,
  algSignature,
  audience,
  encEncryption,
  expiration,
  issuer,
};

const jwtPayload = {
  fiscal_code: "AAABBB00C00D000E",
};

const jwtGenerator = new JwtGenerator(jwtConfig);

describe("JWT Util", () => {
  it("should encode and sign a jwt", async () => {
    const jwt = await pipe(
      jwtGenerator.generateKeyPairTE(),
      TE.chain(({ privateKey }) =>
        jwtGenerator.signJwtTE(privateKey, jwtPayload),
      ),
    )();

    expect(E.isRight(jwt)).toBe(true);
  });

  it("should verify an encoded jwt", async () => {
    const verifiedJwt = await pipe(
      jwtGenerator.generateKeyPairTE(),
      TE.chain(({ privateKey, publicKey }) =>
        pipe(
          jwtGenerator.signJwtTE(privateKey, jwtPayload),
          TE.chain((jwt) => jwtGenerator.decodeAndVerifyJwtTE(publicKey, jwt)),
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
      jwtGenerator.generateKeyPairTE(),
      TE.chain(({ privateKey, publicKey }) =>
        pipe(
          jwtGenerator.signJwtTE(privateKey, jwtPayload),
          TE.chain((jwt) => jwtGenerator.encrypTokenTE(publicKey, jwt)),
        ),
      ),
    )();

    expect(E.isRight(encryptedJwt)).toBe(true);
  });

  it("should encode, sign a jwt, encrypt it and decrypt it", async () => {
    const jwt = await pipe(
      jwtGenerator.generateKeyPairTE(),
      TE.chain(({ privateKey, publicKey }) =>
        pipe(
          jwtGenerator.signJwtTE(privateKey, jwtPayload),
          TE.chain((jwt) => jwtGenerator.encrypTokenTE(publicKey, jwt)),
          TE.chain((token) => jwtGenerator.decryptTokenTE(privateKey, token)),
        ),
      ),
    )();

    expect(E.isRight(jwt)).toBe(true);
  });

  it("should encode, sign a jwt, encrypt it, decrypt it and verify it", async () => {
    const verifiedJwt = await pipe(
      jwtGenerator.generateKeyPairTE(),
      TE.chain(({ privateKey, publicKey }) =>
        pipe(
          jwtGenerator.signJwtTE(privateKey, jwtPayload),
          TE.chain((jwt) => jwtGenerator.encrypTokenTE(publicKey, jwt)),
          TE.chain((token) => jwtGenerator.decryptTokenTE(privateKey, token)),
          TE.chain((jwt) => jwtGenerator.decodeAndVerifyJwtTE(publicKey, jwt)),
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
      jwtGenerator.generateKeyPairTE(),
      TE.chain(({ privateKey, publicKey }) =>
        jwtGenerator.signThenEncryptJwtTE(publicKey, privateKey, jwtPayload),
      ),
    )();

    expect(E.isRight(encryptedJwt)).toBe(true);
  });
  it("should decryptAndVerifyjwtTE", async () => {
    const verifiedJwt = await pipe(
      jwtGenerator.generateKeyPairTE(),
      TE.chain(({ privateKey, publicKey }) =>
        pipe(
          jwtGenerator.signThenEncryptJwtTE(publicKey, privateKey, jwtPayload),
          TE.chain((encryptedJwt) =>
            jwtGenerator.decryptAndVerifyjwtTE(
              publicKey,
              privateKey,
              encryptedJwt,
            ),
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
