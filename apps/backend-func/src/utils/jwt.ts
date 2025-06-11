import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import { toError } from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";
import * as jose from "jose";

export const JwtConfig = t.type({
  algEncription: NonEmptyString,
  algKeys: NonEmptyString,
  algSignature: NonEmptyString,
  audience: NonEmptyString,
  encEncryption: NonEmptyString,
  expiration: NonEmptyString,
  issuer: NonEmptyString,
});
export type JwtConfig = t.TypeOf<typeof JwtConfig>;

export class JwtGenerator {
  protected readonly config: JwtConfig;
  public readonly decodeAndVerifyJwtTE = (publicKey: string, jwt: string) =>
    pipe(
      TE.tryCatch(
        () => jose.importSPKI(publicKey, this.config.algKeys),
        toError,
      ),
      TE.chain((publicKey) =>
        pipe(
          TE.tryCatch(
            () =>
              jose.jwtVerify(jwt, publicKey, {
                audience: this.config.audience,
                issuer: this.config.issuer,
              }),
            toError,
          ),
          TE.map(({ payload }) => payload as Record<string, string>),
        ),
      ),
    );

  public readonly decryptAndVerifyjwtTE = (
    publicKey: string,
    privateKey: string,
    token: string,
  ) =>
    pipe(
      this.decryptTokenTE(privateKey, token),
      TE.chain((jwt) => this.decodeAndVerifyJwtTE(publicKey, jwt)),
    );

  public readonly decryptTokenTE = (privateKey: string, token: string) =>
    pipe(
      TE.tryCatch(
        () => jose.importPKCS8(privateKey, this.config.algKeys),
        toError,
      ),
      TE.chain((privateKey) =>
        TE.tryCatch(() => jose.compactDecrypt(token, privateKey), toError),
      ),
      TE.map(({ plaintext }) => new TextDecoder().decode(plaintext)),
    );

  public readonly encrypTokenTE = (publicKey: string, token: string) =>
    pipe(
      TE.tryCatch(
        () => jose.importSPKI(publicKey, this.config.algKeys),
        toError,
      ),
      TE.chain((publicKey) =>
        TE.tryCatch(
          () =>
            new jose.CompactEncrypt(new TextEncoder().encode(token))
              .setProtectedHeader({
                alg: this.config.algEncription,
                enc: this.config.encEncryption,
              })
              .encrypt(publicKey),
          toError,
        ),
      ),
    );

  public readonly generateKeyPairTE = () =>
    pipe(
      TE.tryCatch(() => jose.generateKeyPair(this.config.algKeys), toError),
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
      TE.map(({ privateKey, publicKey }) => ({ privateKey, publicKey })),
    );

  public readonly signJwtTE = (
    privateKey: string,
    claims: Record<string, string>,
  ) =>
    pipe(
      TE.tryCatch(
        () => jose.importPKCS8(privateKey, this.config.algKeys),
        toError,
      ),
      TE.chain((privateKey) =>
        TE.tryCatch(
          () =>
            new jose.SignJWT(claims)
              .setProtectedHeader({ alg: this.config.algSignature })
              .setIssuedAt()
              .setIssuer(this.config.issuer)
              .setAudience(this.config.audience)
              .setExpirationTime(this.config.expiration)
              .sign(privateKey),
          toError,
        ),
      ),
    );

  public readonly signThenEncryptJwtTE = (
    publicKey: string,
    privateKey: string,
    claims: Record<string, string>,
  ) =>
    pipe(
      this.signJwtTE(privateKey, claims),
      TE.chain((jwt) => this.encrypTokenTE(publicKey, jwt)),
    );

  constructor(config: JwtConfig) {
    this.config = config;
  }
}
