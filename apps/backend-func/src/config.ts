/**
 * Config module
 *
 * Single point of access for the application confguration. Handles validation on required environment variables.
 * The configuration is evaluate eagerly at the first access to the module. The module exposes convenient methods to access such value.
 */

import { NumberFromString } from "@pagopa/ts-commons/lib/numbers";
import * as reporters from "@pagopa/ts-commons/lib/reporters";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import { withDefault } from "@pagopa/ts-commons/lib/types";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";

export type Config = t.TypeOf<typeof Config>;
export const Config = t.type({
  APPLICATIONINSIGHTS_CONNECTION_STRING: NonEmptyString,

  CDC_BASE_URL: NonEmptyString,

  COSMOSDB_CDC_DATABASE_NAME: NonEmptyString,
  COSMOSDB_CDC_KEY: NonEmptyString,
  COSMOSDB_CDC_URI: NonEmptyString,

  FETCH_TIMEOUT_MS: withDefault(t.string, "10000").pipe(NumberFromString),

  FIMS_BASE_URL: NonEmptyString,
  FIMS_CLIENT_ID: NonEmptyString,
  FIMS_CLIENT_SECRET: NonEmptyString,
  FIMS_ISSUER_URL: NonEmptyString,
  FIMS_SCOPE: NonEmptyString,

  JWT_PRIVATE_KEY: NonEmptyString,
  JWT_PUBLIC_KEY: NonEmptyString,

  ENCRYPTION_PUBLIC_KEY: NonEmptyString,
  ENCRYPTION_PRIVATE_KEY: NonEmptyString,

  JWT_ISSUER: NonEmptyString,
  JWT_AUDIENCE: NonEmptyString,
  JWT_EXPIRATION: NonEmptyString,
  ALGORITHM_KEYS: NonEmptyString,
  ALGORITHM_SIGNATURE: NonEmptyString,
  ALGORITHM_ENCRYPTION: NonEmptyString,
  ENCODING_ENCRYPTION: NonEmptyString,

  REDIS_CLUSTER_ENABLED: t.boolean,
  REDIS_PASSWORD: NonEmptyString,
  REDIS_PORT: NonEmptyString,
  REDIS_TLS_ENABLED: t.boolean,
  REDIS_URL: NonEmptyString,

  SERVICES_API_KEY: NonEmptyString,
  SERVICES_API_URL: NonEmptyString,

  isProduction: t.boolean,
});

export const envConfig = {
  ...process.env,
  REDIS_CLUSTER_ENABLED: pipe(
    O.fromNullable(process.env.REDIS_CLUSTER_ENABLED),
    O.map((value: string) => value.toLowerCase() === "true"),
    O.toUndefined,
  ),
  REDIS_TLS_ENABLED: pipe(
    O.fromNullable(process.env.REDIS_TLS_ENABLED),
    O.map((value: string) => value.toLowerCase() === "true"),
    O.toUndefined,
  ),
  isProduction: process.env.NODE_ENV === "production",
};

const errorOrConfig: t.Validation<Config> = Config.decode(envConfig);

/**
 * Read the application configuration and check for invalid values.
 * Configuration is eagerly evalued when the application starts.
 *
 * @returns either the configuration values or an Error
 */
export const getConfigOrError = (): E.Either<Error, Config> =>
  pipe(
    errorOrConfig,
    E.mapLeft(
      (errors: readonly t.ValidationError[]) =>
        new Error(
          `Invalid configuration: ${reporters.readableReportSimplified(
            errors,
          )}`,
        ),
    ),
  );

export const getConfigOrThrow = (): Config =>
  pipe(
    errorOrConfig,
    E.getOrElseW((errors) => {
      throw new Error(
        `Invalid configuration: ${reporters.readableReport(errors)}`,
      );
    }),
  );
