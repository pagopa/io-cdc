import { PatternString } from "@pagopa/ts-commons/lib/strings.js";
import * as t from "io-ts";

export enum AssertionType {
  "OIDC" = "OIDC",
  "SAML" = "SAML",
}

export enum JwkPubKeyHashAlgorithmEnum {
  "sha256" = "sha256",
  "sha384" = "sha384",
  "sha512" = "sha512",
}
export const JwkPubKeyHashAlgorithm = t.union([
  t.literal("sha256"),
  t.literal("sha384"),
  t.literal("sha512"),
]);
export type JwkPubKeyHashAlgorithm = t.TypeOf<typeof JwkPubKeyHashAlgorithm>;

export const AssertionRefSha256 = PatternString(
  "^(sha256-[A-Za-z0-9-_=]{1,44})$",
);
export type AssertionRefSha256 = t.TypeOf<typeof AssertionRefSha256>;

export const AssertionRefSha384 = PatternString(
  "^(sha384-[A-Za-z0-9-_=]{1,66})$",
);
export type AssertionRefSha384 = t.TypeOf<typeof AssertionRefSha384>;

export const AssertionRefSha512 = PatternString(
  "^(sha512-[A-Za-z0-9-_=]{1,88})$",
);
export type AssertionRefSha512 = t.TypeOf<typeof AssertionRefSha512>;

export const AssertionRef = t.union([
  AssertionRefSha256,
  AssertionRefSha384,
  AssertionRefSha512,
]);
export type AssertionRef = t.TypeOf<typeof AssertionRef>;
