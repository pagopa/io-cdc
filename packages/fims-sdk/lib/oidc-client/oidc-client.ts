import * as client from "openid-client";
import { z } from "zod";

const oidcConfigSchema = z.object({
  OIDC_CLIENT_ID: z.string().min(1),
  OIDC_CLIENT_REDIRECT_URI: z.string().url(),
  OIDC_CLIENT_SECRET: z.string().min(1),
  OIDC_ISSUER_URL: z.string().url(),
  OIDC_SCOPE: z.string().min(1),
});

export type OidcConfig = z.TypeOf<typeof oidcConfigSchema>;

export class OidcClient {
  clientConfig: client.Configuration | undefined;
  oidcConfig: OidcConfig;

  constructor(oidcConfig: OidcConfig) {
    this.oidcConfig = oidcConfig;
  }

  async initializeClientConfiguration() {
    if (!this.clientConfig) {
      this.clientConfig = await client.discovery(
        new URL(this.oidcConfig.OIDC_ISSUER_URL),
        this.oidcConfig.OIDC_CLIENT_ID,
        this.oidcConfig.OIDC_CLIENT_SECRET,
      );
    }
  }

  redirectToAuthorizationUrl(state?: string, nonce?: string): string {
    if (!this.clientConfig) throw new Error("Fims client not initialized");

    const parameters: Record<string, string> = {
      redirect_uri: this.oidcConfig.OIDC_CLIENT_REDIRECT_URI,
      scope: this.oidcConfig.OIDC_SCOPE,
      state: state ? state : client.randomState(),
      nonce: nonce ? nonce : client.randomNonce(),
    };

    const redirectTo: URL = client.buildAuthorizationUrl(
      this.clientConfig,
      parameters,
    );

    return redirectTo.toString();
  }

  async retrieveIdToken(
    cbUrl: string,
    authCode: string,
    state: string,
    nonce: string,
  ) {
    if (!this.clientConfig) throw new Error("Fims client not initialized");

    const callbackUrl = new URL(cbUrl);
    const tokens: client.TokenEndpointResponse =
      await client.authorizationCodeGrant(this.clientConfig, callbackUrl, {
        expectedNonce: nonce,
        expectedState: state,
        pkceCodeVerifier: authCode,
      });

    return tokens.id_token;
  }
}
