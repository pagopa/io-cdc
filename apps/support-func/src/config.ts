/**
 * Config module
 *
 * Single point of access for the application confguration. Handles validation on required environment variables.
 * The configuration is evaluate eagerly at the first access to the module. The module exposes convenient methods to access such value.
 */

import { NumberFromString } from "@pagopa/ts-commons/lib/numbers.js";
import * as reporters from "@pagopa/ts-commons/lib/reporters.js";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import { withDefault } from "@pagopa/ts-commons/lib/types.js";
import * as E from "fp-ts/lib/Either.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

export type Config = t.TypeOf<typeof Config>;
export const Config = t.type({
  ALGORITHM_ENCRYPTION: NonEmptyString,

  ALGORITHM_KEYS: NonEmptyString,

  ALGORITHM_SIGNATURE: NonEmptyString,
  APPLICATIONINSIGHTS_CONNECTION_STRING: NonEmptyString,

  CDC_API_BASE_URL: NonEmptyString,
  CDC_API_BASE_URL_TEST: NonEmptyString,

  COSMOSDB_CDC_DATABASE_NAME: NonEmptyString,
  COSMOSDB_CDC_KEY: NonEmptyString,

  COSMOSDB_CDC_URI: NonEmptyString,
  ENCODING_ENCRYPTION: NonEmptyString,

  ENCRYPTION_PUBLIC_KEY: NonEmptyString,
  FETCH_TIMEOUT_MS: withDefault(t.string, "10000").pipe(NumberFromString),

  JWT_AUDIENCE: NonEmptyString,

  JWT_EXPIRATION: NonEmptyString,
  JWT_ISSUER: NonEmptyString,
  JWT_PRIVATE_KEY: NonEmptyString,

  isProduction: t.boolean,
});

export const envConfig = {
  ...process.env,
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
