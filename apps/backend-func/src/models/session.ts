import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

export const Session = t.intersection([
  t.type({
    family_name: NonEmptyString,
    fiscal_code: FiscalCode,
    given_name: NonEmptyString,
  }),
  t.partial({ device_id: NonEmptyString }),
]);
export type Session = t.TypeOf<typeof Session>;
