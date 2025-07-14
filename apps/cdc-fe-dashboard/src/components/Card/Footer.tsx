import { LinearProgress, Stack, Typography } from '@mui/material';
import { Notches } from '../Notches';

type FooterProps = {
  balance: number;
  total: number;
};

export const Footer = ({ balance, total }: FooterProps) => {
  return (
    <Stack>
      <Notches />
      <Stack
        bgcolor="#F1ECE6"
        direction="column"
        paddingBottom={4}
        rowGap={0.5}
        alignItems="center"
        borderRadius="0 0 16px 16px"
      >
        <Stack direction="row" justifyContent="center" alignItems="baseline" gap={1}>
          <Typography fontWeight={700} fontSize={22}>
            {balance}
          </Typography>
          <Typography>{`di ${total}€`}</Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={balance}
          sx={{ background: '#fff', width: '30%', borderRadius: '4px' }}
        />
      </Stack>
    </Stack>
  );
};
