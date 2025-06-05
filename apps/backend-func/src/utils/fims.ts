import { OidcClient } from "@pagopa/fims-sdk";
import * as TE from "fp-ts/TaskEither";
import { toError } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

import { Config } from "../config";

export const getFimsClient = (config: Config) =>
  new OidcClient({
    OIDC_CLIENT_ID: config.FIMS_CLIENT_ID,
    OIDC_CLIENT_REDIRECT_URI: config.FIMS_BASE_URL,
    OIDC_CLIENT_SECRET: config.FIMS_CLIENT_SECRET,
    OIDC_ISSUER_URL: config.FIMS_ISSUER_URL,
    OIDC_SCOPE: config.FIMS_SCOPE,
  });

export const getFimsRedirectTE = (
  client: OidcClient,
  state?: string,
  nonce?: string,
) =>
  pipe(
    TE.tryCatch(() => client.initializeClientConfiguration(), toError),
    TE.map(() => client.redirectToAuthorizationUrl(state, nonce)),
  );

export const getFimsIdentityTE = (
  client: OidcClient,
  cbUrl: string,
  authCode: string,
  state: string,
  nonce: string,
) =>
  pipe(
    TE.tryCatch(() => client.initializeClientConfiguration(), toError),
    TE.map(() => client.retrieveIdToken(cbUrl, authCode, state, nonce)),
  );
