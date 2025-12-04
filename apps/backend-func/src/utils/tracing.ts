import { emitCustomEvent } from "@pagopa/azure-tracing/logger";

export const traceEvent =
  <T>(input: T) =>
  (caller: string, eventName: string, data: unknown) => {
    emitCustomEvent(eventName, { caller: caller, data: JSON.stringify(data) })(
      caller,
    );
    return input;
  };
