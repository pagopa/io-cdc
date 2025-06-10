import { readableReport } from "@pagopa/ts-commons/lib/reporters.js";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

export const withParams =
  <A, D>(codec: t.Type<A>, payload: unknown) =>
  (_: D) =>
    pipe(
      codec.decode(payload),
      E.mapLeft((errors) => new Error(readableReport(errors))),
      TE.fromEither,
    );
