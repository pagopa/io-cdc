import { LogoType } from "@io-cdc/ui";

type FeedbackConfig = Record<string, {
    image: LogoType
    title: string
    subtitle: string | null
    description: string
}>

export const FEEDBACK_CONFIG_MAP: FeedbackConfig = {
  success: {
    image: "requestCompleted",
    title: "Fatto!",
    subtitle: "Riceverai un mesaggio su IO con l'esito della tua richiesta.",
    description:
      "Per non perderti i messaggi in app, attiva le notifiche push da Impostazioni > Preferenze",
  },
  /**
   * @test
   * remove this error field and use error-{statusCode} keys
   */
  "error-500": {
    image: "requestError",
    title: "Qualcosa non ha funzionato",
    subtitle: null,
    description: "Riprova più tardi",
  },
  "error-503": {
    image: "requestError",
    title: "Non riusciamo ad inviare la tua richiesta al momento",
    subtitle: null,
    description: "Riprova più tardi",
  },
};
