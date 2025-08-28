import { useCallback, useState } from 'react';
import { StyledSelect } from './styled';
import { Box, Divider, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { Icon } from '@io-cdc/ui';
import { ArrowDropDown } from '@mui/icons-material';
import { Sheet } from 'react-modal-sheet';
import { UseFormSetValue } from 'react-hook-form';
import { BonusGeneratorForm } from '../../pages/SelectCardGenerateTicket/components/NewBonusForm';
import { Card } from '../../features/app/model';

type CdcSelectProps = {
  cards: Pick<Card, 'balance' | 'year'>[];
  onSelect: UseFormSetValue<BonusGeneratorForm>;
  value?: string;
};

const TEXT_COLOR = '#5C6F82';

export const CdcSelect = ({ cards, onSelect, value }: CdcSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = useCallback(
    (card: Pick<Card, 'balance' | 'year'>) => {
      onSelect('card', card);
      setIsOpen(false);
    },
    [onSelect],
  );

  return (
    <>
      <StyledSelect
        onClick={() => setIsOpen(true)}
        variant="outlined"
        value={value}
        label={value ? undefined : 'Seleziona la Carta della Cultura'}
        // InputLabelProps={{ shrink: !!year }}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: '2px solid #e3e7eb',
          },
        }}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <ArrowDropDown />
            </InputAdornment>
          ),
        }}
      />
      <Sheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        disableDrag
        snapPoints={[1]}
        initialSnap={0}
        detent="full-height"
      >
        <Sheet.Container
          style={{
            height: '100dvh',
            borderRadius: 0,
            transitionDuration: isOpen ? '0ms' : '500ms',
          }}
        >
          <Sheet.Header>
            <Stack alignItems="end" paddingX={3}>
              <IconButton
                onClick={() => setIsOpen(false)}
                sx={{
                  color: 'unset',
                  fontSize: '14px',
                }}
              >
                <Icon name="close" />
              </IconButton>
            </Stack>
          </Sheet.Header>
          <Sheet.Content>
            <Stack padding={3} paddingTop={1}>
              {cards.map(({ balance, year }, index, array) => (
                <Box key={year}>
                  <Stack
                    onClick={() => handleSelectOption({ year, balance })}
                    gap={0.5}
                    paddingX={1.25}
                    paddingY={2}
                  >
                    <Typography
                      fontSize={16}
                      fontWeight={600}
                    >{`Carta della Cultura ${year}`}</Typography>
                    <Typography
                      fontSize={14}
                      color={TEXT_COLOR}
                    >{`Credito disponibile ${balance}€`}</Typography>
                  </Stack>
                  {index !== array.length - 1 && <Divider />}
                </Box>
              ))}
            </Stack>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};
