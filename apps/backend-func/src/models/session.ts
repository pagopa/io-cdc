import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

export const Session = t.intersection([
  t.type({
    firstName: NonEmptyString,
    lastName: NonEmptyString,
    fiscalCode: FiscalCode,
  }),
  t.partial({ deviceId: NonEmptyString }),
]);
export type Session = t.TypeOf<typeof Session>;
