import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

export const Session = t.intersection([
  t.type({
    given_name: NonEmptyString,
    fiscal_code: FiscalCode,
    family_name: NonEmptyString,
  }),
  t.partial({ device_id: NonEmptyString }),
]);
export type Session = t.TypeOf<typeof Session>;
