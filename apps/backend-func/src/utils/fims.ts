import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as E from "fp-ts/lib/Either.js";
import { toError } from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";
import { BaseClient, Issuer, generators } from "openid-client";

import { Config } from "../config.js";

export const OidcConfig = t.type({
  OIDC_CLIENT_ID: NonEmptyString,
  OIDC_CLIENT_REDIRECT_URI: NonEmptyString,
  OIDC_CLIENT_SECRET: NonEmptyString,
  OIDC_ISSUER_URL: NonEmptyString,
  OIDC_SCOPE: NonEmptyString,
});

export type OidcConfig = t.TypeOf<typeof OidcConfig>;

export const OidcTokens = t.type({
  access_token: NonEmptyString,
});

export type OidcTokens = t.TypeOf<typeof OidcTokens>;

export const OidcUser = t.type({
  family_name: NonEmptyString,
  fiscal_code: FiscalCode,
  given_name: NonEmptyString,
  public_key: NonEmptyString,
  assertion: NonEmptyString,
  assertion_ref: NonEmptyString,
  iss: NonEmptyString,
  sid: NonEmptyString,
  auth_time: NonEmptyString,
  sub: NonEmptyString,
});

export type OidcUser = t.TypeOf<typeof OidcUser>;

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
      nonce: nonce ? nonce : generators.nonce(),
      redirect_uri: this.oidcConfig.OIDC_CLIENT_REDIRECT_URI,
      scope: this.oidcConfig.OIDC_SCOPE,
      state: state ? state : generators.state(),
    };

    return this.client.authorizationUrl(parameters);
  }

  async retrieveUser(
    cbUrl: string,
    code: string,
    state: string,
    nonce: string,
    iss: string,
  ) {
    if (!this.client) throw new Error("Fims client not initialized");

    const tokens = await this.client.callback(
      cbUrl,
      { code, state, iss },
      { state, nonce },
    );

    const access_token = pipe(
      OidcTokens.decode(tokens),
      E.map((tokens) => tokens.access_token),
      E.getOrElseW(() => {
        throw new Error("Invalid fims tokens");
      }),
    );

    const fimsUser = await this.client.userinfo(access_token);

    const user = pipe(
      OidcUser.decode(fimsUser),
      E.getOrElseW(() => {
        throw new Error("Invalid fims user data");
      }),
    );

    return user;
  }
}

let oidcClient: OidcClient;
export const getFimsClient = (config: Config) => {
  if (!oidcClient) {
    oidcClient = new OidcClient({
      OIDC_CLIENT_ID: config.FIMS_CLIENT_ID,
      OIDC_CLIENT_REDIRECT_URI: config.FIMS_REDIRECT_URL,
      OIDC_CLIENT_SECRET: config.FIMS_CLIENT_SECRET,
      OIDC_ISSUER_URL: config.FIMS_ISSUER_URL,
      OIDC_SCOPE: config.FIMS_SCOPE,
    });
  }
  return oidcClient;
};

export const getFimsRedirectTE = (
  client: OidcClient,
  state?: string,
  nonce?: string,
) =>
  pipe(
    TE.tryCatch(() => client.initializeClient(), toError),
    TE.chain(() =>
      TE.tryCatch(
        async () => client.redirectToAuthorizationUrl(state, nonce),
        toError,
      ),
    ),
  );

export const getFimsUserTE = (
  client: OidcClient,
  cbUrl: string,
  code: string,
  state: string,
  nonce: string,
  iss: string,
) =>
  pipe(
    TE.tryCatch(() => client.initializeClient(), toError),
    TE.chain(() =>
      TE.tryCatch(
        () => client.retrieveUser(cbUrl, code, state, nonce, iss),
        toError,
      ),
    ),
  );

/*  
  Check lollipop
  Verificare che l’assertion SAML restituita (claim assertion) sia firmata da un IDP (SPID o CIE)
  Verificare che il campo InResponseTo della assertion SAML corrisponda a assertion_ref
  Verificare che il campo FiscalNumber corrisponda ai claim sub o fiscal_code
  Verificare che la data di emissione della asserzione (NotOnOrAfter) non sia inferiore a 356 giorni
  assertion_ref ha il formato algoritmo-thumbprint(public key), verificare se sia valido generando il thumbprint del claim public_key usando l’algoritmo indicato (ad esempio sha256)
  Verificare la firma dell’header Signature usando il contenuto del claim public_key
  Verificare se il nonce firmato nel campo Signature corrisponde allo state OIDC


  A causa di:
    la dipendenza del protocollo LolliPoP dalle assertion SPID e dalle relative chiavi che possono cambiare nel tempo
    il particolare meccanismo di login implementato nell’app che prevede sessioni lunghe 30 o 365 giorni a parità di assertion
    il cambiamento di una chiave in presenza di una sessione attiva provoca un fallimento nelle verifiche LolliPoP.
    Per gestire questa casistica è fondamentale che tu predisponga un sistema che ti consenta di mantenere uno storico delle chiavi (per validare le assertion precedenti) e di ottenere le nuove, tenendo conto della durata delle sessioni su IO.
    light bulb In ogni caso, in presenza dell'impossibilità di portare a termine la verifica, il tuo sistema dovrebbe fare fallback su una nuova richiesta di login SPID all’utente, specificando che qualcosa è andato storto nel processo di identificazione automatica.
  */
