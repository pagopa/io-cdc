import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

export const years = ["2021", "2022", "2023", "2024", "2025"] as const;

const [first, second, ...rest] = years;

export const Year = t.union([
  t.literal(first),
  t.literal(second),
  ...rest.map((value) => t.literal(value)),
]);
export type Year = t.TypeOf<typeof Year>;

export const CardRequest = t.type({
  createdAt: IsoDateFromString,
  id: NonEmptyString,
  fiscalCode: FiscalCode,
  year: Year,
});
export type CardRequest = t.TypeOf<typeof CardRequest>;
