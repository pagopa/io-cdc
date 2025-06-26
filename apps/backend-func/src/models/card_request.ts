import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as t from "io-ts";

export const years = ["2020", "2021", "2022", "2023", "2024", "2025"] as const;

const [first, second, ...rest] = years;

export const Year = t.union([
  t.literal(first),
  t.literal(second),
  ...rest.map((value) => t.literal(value)),
]);
export type Year = t.TypeOf<typeof Year>;

export const CardRequest = t.type({
  createdAt: IsoDateFromString,
  fiscalCode: FiscalCode,
  id: NonEmptyString,
  requestId: NonEmptyString,
  year: Year,
});
export type CardRequest = t.TypeOf<typeof CardRequest>;
