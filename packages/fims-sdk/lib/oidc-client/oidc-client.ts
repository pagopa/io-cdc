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

export type OidcClient = {
  getAuthorizationUrl: () => string;
  getTokens: (
    cbUrl: string,
    authCode: string,
    state: string,
    nonce: string,
  ) => Promise<string | undefined>;
};

export const FimsClient: (oidcConfig: OidcConfig) => Promise<OidcClient> = async (
  oidcConfig: OidcConfig,
) => {
  const clientConfig: client.Configuration = await client.discovery(
    new URL(oidcConfig.OIDC_ISSUER_URL),
    oidcConfig.OIDC_CLIENT_ID,
    oidcConfig.OIDC_CLIENT_SECRET,
  );

  const getAuthorizationUrl = () => {
    const parameters: Record<string, string> = {
      redirect_uri: oidcConfig.OIDC_CLIENT_REDIRECT_URI,
      scope: oidcConfig.OIDC_SCOPE,
      state: client.randomState(),
    };

    const redirectTo: URL = client.buildAuthorizationUrl(
      clientConfig,
      parameters,
    );

    return redirectTo.toString();
  };

  const getTokens = async (
    cbUrl: string,
    authCode: string,
    state: string,
    nonce: string,
  ) => {
    const callbackUrl = new URL(cbUrl);
    const tokens: client.TokenEndpointResponse =
      await client.authorizationCodeGrant(clientConfig, callbackUrl, {
        pkceCodeVerifier: authCode,
        expectedState: state,
        expectedNonce: nonce,
      });
    return tokens.id_token;
  };

  return {
    getAuthorizationUrl,
    getTokens,
  };
};