import { Icon } from '@io-cdc/ui';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Notches } from '../Notches';
import LinearProgress from '@mui/material/LinearProgress';
import { CDC } from '../../features/app/model';

export const Card = ({ balance, expire_date, max_amount, year }: CDC) => {
  return (
    <Stack direction="column" width="100%">
      <Stack sx={{ bgcolor: '#F1ECE6' }}>
        <Stack direction="row" justifyContent="flex-end" gap={2} padding={3}>
          <Icon name="info" />
          <Icon name="question" />
        </Stack>
        <Stack padding={4} alignItems="center" gap={3}>
          <Icon name="ente" sx={{ width: 66, height: 66 }} />
          <Typography fontWeight={700} fontSize={28}>
            {`Carta della Cultura ${year}`}
          </Typography>
          <Typography fontWeight={400} fontSize={16} color="#17324D">
            Ministero della cultura
          </Typography>
          <Typography color="#5C6F82">{`Valida fino al ${expire_date}`}</Typography>
        </Stack>
      </Stack>
      <Stack>
        <Notches />
        <Stack
          sx={{ bgcolor: '#F1ECE6', borderRadius: '0 0 16px 16px' }}
          direction="column"
          paddingBottom={4}
          gap={2}
          alignItems="center"
        >
          <Stack direction="row" justifyContent="center" alignItems="baseline" gap={1}>
            <Typography fontWeight={700} fontSize={22}>
              {balance}
            </Typography>
            <Typography>{`di ${max_amount}€`}</Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={balance}
            sx={{ background: '#fff', width: '30%', borderRadius: '4px' }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
