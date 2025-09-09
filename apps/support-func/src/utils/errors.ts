import * as H from "@pagopa/handler-kit";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as t from "io-ts";

export const ResponseError = t.type({
  code: t.number,
  message: t.string,
  title: t.string,
});

export type ResponseError = t.TypeOf<typeof ResponseError>;

export const responseError = (
  code: number,
  message: string,
  title: string,
): ResponseError => ({
  code,
  message,
  title,
});

export const toResponseError =
  (e: unknown) =>
  (code: number, title: string): ResponseError => ({
    code,
    message: JSON.stringify(e),
    title,
  });

export const errorToValidationError = (e: Error) => ({
  code: 400 as const,
  message: e.message,
  title: "Bad Request",
});

export const errorToNotFoundError = (e: Error) => ({
  code: 404 as const,
  message: e.message,
  title: "Not Found",
});

export const errorToInternalError = (e: Error): ResponseError => ({
  code: 500 as const,
  message: e.message,
  title: "Internal Server Error",
});

export const responseErrorToHttpError = RTE.orElseW((e: ResponseError) =>
  RTE.right(
    H.problemJson({
      message: e.message,
      status: e.code as H.HttpErrorStatusCode,
      title: e.title,
    }),
  ),
);
