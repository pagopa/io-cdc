import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as TE from "fp-ts/TaskEither";
import { toError } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { BaseClient, generators, Issuer } from "openid-client";
import { Config } from "../config";

export const OidcConfig = t.type({
  OIDC_CLIENT_ID: NonEmptyString,
  OIDC_CLIENT_REDIRECT_URI: NonEmptyString,
  OIDC_CLIENT_SECRET: NonEmptyString,
  OIDC_ISSUER_URL: NonEmptyString,
  OIDC_SCOPE: NonEmptyString,
});

export type OidcConfig = t.TypeOf<typeof OidcConfig>;

export class OidcClient {
  client: BaseClient | undefined;
  oidcConfig: OidcConfig;

  constructor(oidcConfig: OidcConfig) {
    this.oidcConfig = oidcConfig;
  }

  async initializeClient() {
    if (!this.client) {
      const issuer = await Issuer.discover(this.oidcConfig.OIDC_ISSUER_URL);
      this.client = new issuer.Client({
        client_id: this.oidcConfig.OIDC_CLIENT_ID,
        client_secret: this.oidcConfig.OIDC_CLIENT_SECRET,
        redirect_uris: [this.oidcConfig.OIDC_CLIENT_REDIRECT_URI],
        response_types: ["code"],
      });
    }
  }

  redirectToAuthorizationUrl(state?: string, nonce?: string): string {
    if (!this.client) throw new Error("Fims client not initialized");

    const parameters: Record<string, string> = {
      redirect_uri: this.oidcConfig.OIDC_CLIENT_REDIRECT_URI,
      scope: this.oidcConfig.OIDC_SCOPE,
      state: state ? state : generators.state(),
      nonce: nonce ? nonce : generators.nonce(),
    };

    return this.client.authorizationUrl(parameters);
  }

  async retrieveIdToken(
    cbUrl: string,
    authCode: string,
    state: string,
    nonce: string,
  ) {
    if (!this.client) throw new Error("Fims client not initialized");

    const tokens = await this.client.callback(
      cbUrl,
      { code: authCode, state },
      {
        nonce,
      },
    );

    return tokens.id_token;
  }
}

export const getFimsClient = (config: Config) =>
  new OidcClient({
    OIDC_CLIENT_ID: config.FIMS_CLIENT_ID,
    OIDC_CLIENT_REDIRECT_URI: config.FIMS_REDIRECT_URL,
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
    TE.tryCatch(() => client.initializeClient(), toError),
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
    TE.tryCatch(() => client.initializeClient(), toError),
    TE.map(() => client.retrieveIdToken(cbUrl, authCode, state, nonce)),
  );
