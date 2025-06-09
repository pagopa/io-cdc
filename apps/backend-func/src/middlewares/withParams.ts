import * as t from "io-ts";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { readableReport } from "@pagopa/ts-commons/lib/reporters";

export const withParams =
  <A, D>(codec: t.Type<A>, payload: unknown) =>
  (_: D) =>
    pipe(
      codec.decode(payload),
      E.mapLeft((errors) => new Error(readableReport(errors))),
      TE.fromEither,
    );
