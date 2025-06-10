import { readableReport } from "@pagopa/ts-commons/lib/reporters.js";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

export const withParams =
  <A>(codec: t.Type<A>, payload: unknown) =>
  () =>
    pipe(
      codec.decode(payload),
      E.mapLeft((errors) => new Error(readableReport(errors))),
      TE.fromEither,
    );
