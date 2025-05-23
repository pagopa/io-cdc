import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import * as RA from "fp-ts/lib/ReadonlyArray";
import * as Task from "fp-ts/lib/Task";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";

import { ApplicationInfo } from "../generated/definitions/internal/ApplicationInfo";

const applicativeValidation = RTE.getApplicativeReaderTaskValidation(
  Task.ApplicativePar,
  RA.getSemigroup<string>(),
);

const dummyHealthCheck = (): TE.TaskEither<readonly string[], true> =>
  TE.of(true);

export const makeInfoHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<ApplicationInfo, 200>,
  undefined
> = H.of(() =>
  pipe(
    // TODO: Add all the function health checks
    [dummyHealthCheck],
    RA.sequence(applicativeValidation),
    RTE.map(() => H.successJson({ name: "it works!", version: "0.0.1" })),
    RTE.mapLeft((problems) => new H.HttpError(problems.join("\n\n"))),
  ),
);

export const InfoFn = httpAzureFunction(makeInfoHandler);
