import * as TE from "fp-ts/TaskEither";
import { toError } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as jose from "jose";

import { Config } from "../config.js";

const alg = "RSA-OAEP-256";
const enc = "A256CBC-HS512";
const issuer = "PagoPA";
const audience = "Sogei";
const expiration = "1m";

export const encryptJwtTE = (config: Config, claims: Record<string, string>) =>
  pipe(
    TE.tryCatch(() => jose.importSPKI(config.JWT_PUBLIC_KEY, alg), toError),
    TE.chain((privateKey) =>
      TE.tryCatch(
        () =>
          new jose.EncryptJWT(claims)
            .setProtectedHeader({ alg, enc })
            .setIssuedAt()
            .setIssuer(issuer)
            .setAudience(audience)
            .setExpirationTime(expiration)
            .encrypt(privateKey),
        toError,
      ),
    ),
  );
