import * as H from "@pagopa/handler-kit";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import * as t from "io-ts";

export const AppError = t.type({
  code: H.HttpErrorStatusCode,
  message: t.string,
  title: t.string,
});
export type AppError = t.TypeOf<typeof AppError>;

export const appError = (
  code: H.HttpErrorStatusCode,
  message: string,
  title: string,
): AppError => ({
  code,
  message: message,
  title,
});

export const toAppError =
  (e: unknown) =>
  (code: H.HttpErrorStatusCode, title: string): AppError => ({
    code,
    message: JSON.stringify(e),
    title,
  });

export const errorToValidationError = (e: Error) => ({
  code: 400 as const,
  message: e.message,
  title: "Bad Request",
});

export const errorToInternalError = (e: Error): AppError => ({
  code: 500 as const,
  message: e.message,
  title: "Internal Server Error",
});

export const appErrorToHttpError = RTE.orElseW((e: AppError) =>
  RTE.right(
    H.problemJson({ title: e.title, status: e.code, message: e.message }),
  ),
);
