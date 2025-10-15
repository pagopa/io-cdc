import { LinearProgress, Stack, Typography } from '@mui/material';
import { Notches } from '../Notches';

const MAX_AMOUNT = 100;

type FooterProps = {
  residual_amount: number;
};

export const CardFooter = ({ residual_amount }: FooterProps) => {
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
            {residual_amount}
          </Typography>
          <Typography>{`di ${MAX_AMOUNT}€`}</Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={(residual_amount * 100) / MAX_AMOUNT}
          sx={{ background: '#fff', width: '30%', borderRadius: '4px' }}
        />
      </Stack>
    </Stack>
  );
};
