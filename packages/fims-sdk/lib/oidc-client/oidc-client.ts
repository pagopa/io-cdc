import * as client from "openid-client";
import { z } from "zod";

const oidcConfigSchema = z.object({
  OIDC_CLIENT_ID: z.string().min(1),
  OIDC_CLIENT_REDIRECT_URI: z.string().url(),
  OIDC_CLIENT_SECRET: z.string().min(1),
  OIDC_ISSUER_URL: z.string().url(),
  OIDC_SCOPE: z.string().min(1),
});

type OidcConfig = z.TypeOf<typeof oidcConfigSchema>;

export class FimsClient {
  clientConfig: client.Configuration | undefined;
  oidcConfig: OidcConfig;

  constructor(oidcConfig: OidcConfig) {
    this.oidcConfig = oidcConfig;
    this.initialize();
  }

  buildAuthorizationUrl(): string {
    if (!this.clientConfig) throw new Error("Fims client not configured");

    const parameters: Record<string, string> = {
      redirect_uri: this.oidcConfig.OIDC_CLIENT_REDIRECT_URI,
      scope: this.oidcConfig.OIDC_SCOPE,
      state: client.randomState(),
    };

    const redirectTo: URL = client.buildAuthorizationUrl(
      this.clientConfig,
      parameters,
    );

    return redirectTo.toString();
  }

  async getTokens(
    cbUrl: string,
    authCode: string,
    state: string,
    nonce: string,
  ) {
    if (!this.clientConfig) throw new Error("Fims client not configured");

    const callbackUrl = new URL(cbUrl);
    const tokens: client.TokenEndpointResponse =
      await client.authorizationCodeGrant(this.clientConfig, callbackUrl, {
        expectedNonce: nonce,
        expectedState: state,
        pkceCodeVerifier: authCode,
      });
    return tokens.id_token;
  }

  initialize() {
    client
      .discovery(
        new URL(this.oidcConfig.OIDC_ISSUER_URL),
        this.oidcConfig.OIDC_CLIENT_ID,
        this.oidcConfig.OIDC_CLIENT_SECRET,
      )
      .catch((error) => {
        throw new Error(
          `Cannot configure fims client | ${JSON.stringify(error)}`,
        );
      })
      .then((clientConfig) => {
        this.clientConfig = clientConfig;
      });
  }
}
