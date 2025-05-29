import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import * as RA from "fp-ts/lib/ReadonlyArray";
import * as Task from "fp-ts/lib/Task";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";

import { getConfigOrThrow } from "../config";
import { ApplicationInfo } from "../generated/definitions/internal/ApplicationInfo";
import { encryptJwtTE } from "../utils/jwt.js";

const applicativeValidation = RTE.getApplicativeReaderTaskValidation(
  Task.ApplicativePar,
  RA.getSemigroup<string>(),
);

const dummyHealthCheck = (): TE.TaskEither<readonly string[], true> =>
  TE.of(true);

export const makeAuthorizeHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<ApplicationInfo, 200>,
  undefined
> = H.of(() =>
  pipe(
    // TODO: Add all the function health checks
    [dummyHealthCheck],
    RA.sequence(applicativeValidation),
    RTE.chainW(() => {
      const config = getConfigOrThrow();
      return pipe(
        encryptJwtTE(config, {
          first_name: "A",
          fiscal_code: "CF",
          last_name: "B",
        }),
        TE.mapLeft(() => ["errore dummy"]),
        RTE.fromTaskEither,
      );
    }),
    RTE.map((jwtOrError) =>
      H.successJson({ jwt: jwtOrError, name: "it works!", version: "0.0.1" }),
    ),
    RTE.mapLeft((problems) => new H.HttpError(problems.join("\n\n"))),
  ),
);

export const AuthorizeFn = httpAzureFunction(makeAuthorizeHandler);
