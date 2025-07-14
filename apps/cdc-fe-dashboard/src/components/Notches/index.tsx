import { Typography } from '@mui/material';
import { Notch, NotchContainer, NotchedPaper } from './styled';

export const Notches = () => {
  return (
    <NotchContainer>
      <NotchedPaper elevation={3}>
        <Notch side="left" />
        <Notch side="right" />
        <Typography fontSize="12px">Disponibile</Typography>
      </NotchedPaper>
    </NotchContainer>
  );
};
