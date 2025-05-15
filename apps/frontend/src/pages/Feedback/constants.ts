import { IconType } from '@io-cdc/ui';

export type FeedbackState = {
  status: keyof typeof CONFIG_BY_STATUS;
};

export const CONFIG_BY_STATUS: Record<
  number,
  {
    title: string;
    subTitle: string;
    icon: IconType;
    description?: string;
  }
> = {
  200: {
    title: 'Fatto!',
    icon: 'party',
    subTitle: "Riceverai un messaggio su IO con l'esito della tua richiesta.",
    description:
      'Per non perderti i messaggi in app, attiva le notifiche push da Impostazioni > Preferenze',
  },
  503: {
    icon: 'umbrella',
    title: 'Non riusciamo ad inviare la tua richiesta al momento',
    subTitle: 'Riprova più tardi.',
  },
  500: {
    icon: 'umbrella',
    title: 'Qualcosa non ha funzionato',
    subTitle: 'Riprova più tardi.',
  },
};
