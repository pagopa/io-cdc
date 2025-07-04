import { forwardRef, useCallback, useState } from 'react';
import { StyledSelect } from './styled';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import { Icon } from '@io-cdc/ui';
import { ArrowDropDown } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import { ResponseGetCardsDto } from '../../features/app/dto';
import { CDC } from '../../features/app/model';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" timeout={{ enter: 700, exit: 500 }} ref={ref} {...props} />;
});

type CdcSelectProps = {
  data: ResponseGetCardsDto | undefined;
  year: string | undefined;
  handleChange: (value: CDC, key: 'selectedCard') => void;
};

export const CdcSelect = ({ data, handleChange, year }: CdcSelectProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenSelect = useCallback(() => {
    setOpen(true);
  }, []);

  const handleSelectOption = useCallback(
    (value: CDC) => {
      handleChange(value, 'selectedCard');
      setOpen(false);
    },
    [handleChange],
  );

  return (
    <>
      <StyledSelect
        onClick={handleOpenSelect}
        variant="outlined"
        value={year}
        label={'Seleziona la Carta della Cultura'}
        InputLabelProps={{ shrink: !!year }}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #e3e7eb',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ArrowDropDown />
            </InputAdornment>
          ),
        }}
      />

      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
        PaperProps={{ style: { backgroundColor: '#fff', gap: 24 } }}
      >
        <DialogTitle alignSelf="end">
          <Icon name="closeCircle" onClick={() => setOpen(false)} />
        </DialogTitle>
        <DialogContent>
          <Stack gap={4}>
            {data?.map((card) => (
              <Stack
                key={card.year}
                sx={{ width: '100%' }}
                onClick={() => handleSelectOption(card)}
              >
                <Typography fontWeight={600}>{`Carta della Cultura ${card.year}`}</Typography>
                <Typography
                  fontSize={14}
                  lineHeight={'18px'}
                >{`Credito disponibile ${card.balance}€`}</Typography>
                <Divider />
              </Stack>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
