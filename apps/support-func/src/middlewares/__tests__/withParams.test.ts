import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as E from "fp-ts/lib/Either.js";
import * as t from "io-ts";
import { describe, expect, it } from "vitest";

import { withParams } from "../withParams.js";

const AnyParamsCodec = t.intersection([
  t.type({
    mandatory: NonEmptyString,
  }),
  t.partial({
    optional: NonEmptyString,
  }),
]);
type AnyParamsCodec = t.TypeOf<typeof AnyParamsCodec>;

const ExactParamsCodec = t.exact(AnyParamsCodec);
type ExactParamsCodec = t.TypeOf<typeof ExactParamsCodec>;

const payloadWithOnlyMandatory = {
  mandatory: "mandatory",
};

const payloadWithAllParams = {
  mandatory: "mandatory",
  optional: "optional",
};

const payloadWithExtraParams = {
  extra: "extra",
  mandatory: "mandatory",
  optional: "optional",
};

const payloadWithOtherParams = {
  other: "other",
};

describe("withParams", () => {
  it("should decode mandatory params from a payload with mandatory params only", async () => {
    const res = await withParams(AnyParamsCodec, payloadWithOnlyMandatory)()(); // apply RTE with no deps and apply TE
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(payloadWithOnlyMandatory);
  });

  it("should decode params from a payload with mandatory and optional params", async () => {
    const res = await withParams(AnyParamsCodec, payloadWithAllParams)()(); // apply RTE with no deps and apply TE
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(payloadWithAllParams);
  });

  it("should allow extra params from a payload with extra params if codec is not exact", async () => {
    const res = await withParams(AnyParamsCodec, payloadWithExtraParams)()(); // apply RTE with no deps and apply TE
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(payloadWithExtraParams);
  });

  it("should filter extra params from a payload with extra params if codec is exact", async () => {
    const res = await withParams(ExactParamsCodec, payloadWithExtraParams)()(); // apply RTE with no deps and apply TE
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(payloadWithAllParams);
  });

  it("should fail decoding from a payload with other params if codec is not exact", async () => {
    const res = await withParams(AnyParamsCodec, payloadWithOtherParams)()(); // apply RTE with no deps and apply TE
    expect(E.isLeft(res)).toBe(true);
  });

  it("should fail decoding from a payload with other params if codec is exact", async () => {
    const res = await withParams(ExactParamsCodec, payloadWithOtherParams)()(); // apply RTE with no deps and apply TE
    expect(E.isLeft(res)).toBe(true);
  });
});
