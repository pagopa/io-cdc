import { Icon, IconType } from '@io-cdc/ui';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ReactNode } from 'react';

type ExpiredInitiativeConfig = Record<
  number,
  {
    image: IconType;
    title: string;
    description: ReactNode | null;
    trackName: 'CDC_REQUEST_EXPIRED' | 'CDC_INITIATIVE_EXPIRED';
    trackProperties: {
      webview: true;
      already_requested?: 'yes' | 'no';
      event_category: 'KO';
    };
  }
>;

export const DEFAULT_CONFIG: ExpiredInitiativeConfig[number] = {
  image: 'timeout',
  title: 'Il periodo per richiedere la Carta della Cultura è terminato',
  description: null,
  trackName: 'CDC_INITIATIVE_EXPIRED',
  trackProperties: {
    webview: true,
    already_requested: 'no',
    event_category: 'KO',
  },
};

export const EXPIRED_INITIATIVE_CONFIG_MAP: ExpiredInitiativeConfig = {
  500: DEFAULT_CONFIG,
  501: {
    image: 'hourglass',
    title: 'Il periodo per richiedere la Carta è terminato',
    description: (
      <span>
        La valutazione della tua richiesta è in corso, <strong>attendi un messaggio su IO</strong>{' '}
        con l&apos;esito
      </span>
    ),
    trackName: 'CDC_INITIATIVE_EXPIRED',
    trackProperties: {
      webview: true,
      already_requested: 'yes',
      event_category: 'KO',
    },
  },
  502: {
    image: 'allYearsRequested',
    title: 'Hai già richiesto Carta della Cultura',
    description: (
      <Stack direction="column" gap={2}>
        <Typography>
          Hai richiesto il contributo <strong>per tutti gli anni disponibili.</strong> Riceverai un
          messaggio su IO quando l’esito sarà pronto.
        </Typography>
        <Button
          variant="text"
          onClick={() =>
            window.location.replace(
              'https://assistenza.ioapp.it/hc/it/articles/39525502308497-Attivare-la-Carta-della-Cultura#h_01K6CQRKS9XGBSSC62SPB5ZX3C',
            )
          }
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Icon sx={{ width: 18, height: 18 }} name="document" />
            <Typography fontWeight={600} fontSize={16} color="inherit">
              Scopri di più
            </Typography>
          </Stack>
        </Button>
      </Stack>
    ),
    trackName: 'CDC_REQUEST_EXPIRED',
    trackProperties: {
      webview: true,
      event_category: 'KO',
    },
  },
};
