import * as crypto from "crypto";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

export const getRandomError = <T>(input: T) =>
  pipe(
    TE.of(crypto.randomInt(100)),
    TE.chain(
      TE.fromPredicate(
        (n) => n < 20,
        () => new Error("Random error generated"),
      ),
    ),
    TE.map(() => input),
  );
