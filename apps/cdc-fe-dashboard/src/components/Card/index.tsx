import { Icon } from '@io-cdc/ui';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CDC } from '../../features/app/model';
import { Footer } from './Footer';

export const Card = ({ balance, expire_date, max_amount, year }: CDC) => {
  return (
    <Stack direction="column" width="100%" height="100%">
      <Stack sx={{ bgcolor: '#F1ECE6' }}>
        <Stack direction="row" justifyContent="flex-end" gap={2} padding={'16px'}>
          <Icon name="info" />
          <Icon name="help" sx={{ width: 60, height: 60 }} />
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
          >{`Valida fino al ${expire_date}`}</Typography>
        </Stack>
      </Stack>
      <Footer balance={balance} total={max_amount} />
    </Stack>
  );
};
