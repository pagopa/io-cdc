import * as E from "fp-ts/lib/Either.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import { describe, expect, it } from "vitest";

import {
  errorToInternalError,
  errorToValidationError,
  responseError,
  responseErrorToHttpError,
  toResponseError,
} from "../errors";

describe("Errors", () => {
  it("should build a ResponseError from unknown error", async () => {
    const e = { any: "unknow object" };
    const res = toResponseError(e)(500, "Unknown error");
    expect(res).toEqual(responseError(500, JSON.stringify(e), "Unknown error"));
  });

  it("should build a 400 ResponseError (Bad Request) from Error", async () => {
    const e = new Error("Bad Request");
    const res = errorToValidationError(e);
    expect(res).toEqual(responseError(400, "Bad Request", "Bad Request"));
  });

  it("should build a 500 ResponseError (Internal Error) from Error", async () => {
    const e = new Error("Internal Error");
    const res = errorToInternalError(e);
    expect(res).toEqual(
      responseError(500, "Internal Error", "Internal Server Error"),
    );
  });
});

describe("HttpResponse", () => {
  it("should transform a ResponseError to an HttpResponse with ProblemJson in RTE chain", async () => {
    const errorRTE = RTE.of(
      responseError(500, "Unknown error", "Unknown error"),
    );
    const res = await responseErrorToHttpError(errorRTE)({})(); // apply deps to RTE and run TE
    expect(E.isRight(res)).toBe(true); // errors are managed as successfull response
    if (E.isRight(res))
      expect(res.right).toEqual({
        code: 500,
        message: "Unknown error",
        title: "Unknown error",
      });
  });
});
