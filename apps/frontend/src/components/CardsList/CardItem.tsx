import { Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

type CardItemProps = {
  year: string;
  balance: number;
};

export const CardItem = ({ year, balance }: CardItemProps) => {
  return (
    <Stack>
      <Typography>{`Carta della Cultura ${year}`}</Typography>
      <Typography>{`Credito disponibile ${balance}€`}</Typography>
      <Divider />
    </Stack>
  );
};
