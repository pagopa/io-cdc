import { Icon } from '@io-cdc/ui';
import { Stack, IconButton, Typography } from '@mui/material';
import { Footer } from './Footer';
import { Card as CardType } from '../../store/services/model';
import { useState } from 'react';
import { HelpSheet } from '../../pages/Home/components/HelpSheet';

const ICON_STYLE_RESET = { color: 'unset', backgroundColor: 'unset', padding: 0 };

export const Card = ({ balance, expireDate, maxAmount, year }: CardType) => {
  const [isHelpSheetOpen, setIsHelpSheetOpen] = useState(false);
  return (
    <Stack direction="column" width="100%" height="100%">
      <Stack sx={{ bgcolor: '#F1ECE6' }}>
        <Stack direction="row" justifyContent="flex-end" gap={2} padding={'16px'}>
          <IconButton sx={ICON_STYLE_RESET}>
            <Icon name="info" />
          </IconButton>
          <IconButton onClick={() => setIsHelpSheetOpen(true)} sx={ICON_STYLE_RESET}>
            <Icon name="help" />
          </IconButton>
          <HelpSheet isOpen={isHelpSheetOpen} onClose={() => setIsHelpSheetOpen(false)} />
        </Stack>
        <Stack padding={1} alignItems="center" gap={2}>
          <Stack
            bgcolor="#FFF"
            width={66}
            height={66}
            borderRadius={1}
            justifyContent="center"
            alignItems="center"
          >
            <Icon name="ente" sx={{ width: 48, height: 48 }} />
          </Stack>
          <Typography fontWeight={700} fontSize={28}>
            {`Carta della Cultura ${year}`}
          </Typography>
          <Typography fontWeight={400} fontSize={16} color="#17324D">
            Ministero della cultura
          </Typography>
          <Typography
            color="#5C6F82"
            fontSize="12px"
            fontWeight={400}
          >{`Valida fino al ${expireDate}`}</Typography>
        </Stack>
      </Stack>
      <Footer balance={balance} total={maxAmount} />
    </Stack>
  );
};
