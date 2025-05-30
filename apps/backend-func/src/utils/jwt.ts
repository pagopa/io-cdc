import * as TE from "fp-ts/TaskEither";
import * as A from "fp-ts/Array";
import { toError } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as jose from "jose";

const algKeys = "RS256";
const algSignature = "RS256";
const algEncription = "RSA-OAEP-256";
const encEncryption = "A256CBC-HS512";

const issuer = "PagoPA";
const audience = "Sogei";
const expiration = "1m";

export const generateKeyPairTE = () =>
  pipe(
    TE.tryCatch(() => jose.generateKeyPair(algKeys), toError),
    TE.chain(({ privateKey, publicKey }) =>
      pipe(
        TE.Do,
        TE.bind("publicKey", () =>
          TE.tryCatch(() => jose.exportSPKI(publicKey), toError),
        ),
        TE.bind("privateKey", () =>
          TE.tryCatch(() => jose.exportPKCS8(privateKey), toError),
        ),
      ),
    ),
    TE.map(({ publicKey, privateKey }) => {
      console.log(publicKey);
      console.log(privateKey);
      return { publicKey, privateKey };
    }),
  );

export const signJwtTE = (privateKey: string, claims: Record<string, string>) =>
  pipe(
    TE.tryCatch(() => jose.importPKCS8(privateKey, algKeys), toError),
    TE.chain((privateKey) =>
      TE.tryCatch(
        () =>
          new jose.SignJWT(claims)
            .setProtectedHeader({ alg: algSignature })
            .setIssuedAt()
            .setIssuer(issuer)
            .setAudience(audience)
            .setExpirationTime(expiration)
            .sign(privateKey),
        toError,
      ),
    ),
  );

export const decodeAndVerifyJwtTE = (publicKey: string, jwt: string) =>
  pipe(
    TE.tryCatch(() => jose.importSPKI(publicKey, algKeys), toError),
    TE.chain((publicKey) =>
      pipe(
        TE.tryCatch(
          () => jose.jwtVerify(jwt, publicKey, { issuer, audience }),
          toError,
        ),
        TE.map(({ payload }) => {
          return payload as Record<string, string>;
        }),
      ),
    ),
  );

export const encrypTokenTE = (publicKey: string, token: string) =>
  pipe(
    TE.tryCatch(() => jose.importSPKI(publicKey, algKeys), toError),
    TE.chain((publicKey) =>
      TE.tryCatch(
        () =>
          new jose.CompactEncrypt(new TextEncoder().encode(token))
            .setProtectedHeader({ alg: algEncription, enc: encEncryption })
            .encrypt(publicKey),
        toError,
      ),
    ),
  );

export const decryptTokenTE = (privateKey: string, token: string) =>
  pipe(
    TE.tryCatch(() => jose.importPKCS8(privateKey, algKeys), toError),
    TE.chain((privateKey) =>
      TE.tryCatch(() => jose.compactDecrypt(token, privateKey), toError),
    ),
    TE.map(({ plaintext }) => new TextDecoder().decode(plaintext)),
  );

export const signThenEncryptJwtTE = (
  publicKey: string,
  privateKey: string,
  claims: Record<string, string>,
) =>
  pipe(
    signJwtTE(privateKey, claims),
    TE.chain((jwt) => encrypTokenTE(publicKey, jwt)),
  );

export const decryptAndVerifyjwtTE = (
  publicKey: string,
  privateKey: string,
  token: string,
) =>
  pipe(
    decryptTokenTE(privateKey, token),
    TE.chain((jwt) => decodeAndVerifyJwtTE(publicKey, jwt)),
  );
