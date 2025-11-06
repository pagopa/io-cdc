import { Box, Button, Divider, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectSelectedCardBonus } from '../../../features/app/selectors';
import { Card } from '../../../features/app/model';
import { trackWebviewEvent } from '../../../utils/trackEvent';
import { APP_ROUTES } from '../../../routes/appRoutes';
import { ticketsActions } from '../../../features/app/reducers';
import { useToast } from '../../../contexts';

type RadioListProps = {
  cards: Pick<Card, 'residual_amount' | 'year'>[];
};

const TEXT_COLOR = '#5C6F82';

export const RadioList = ({ cards }: RadioListProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const value = useSelector(selectSelectedCardBonus);

  const onSelect = useCallback(
    (selected: Pick<Card, 'residual_amount' | 'year'>) => {
      dispatch(ticketsActions.setSelectedCard(selected));
    },
    [dispatch],
  );

  const onClickBottom = useCallback(() => {
    if (!value.year) {
      showToast({
        messageType: 'error',
        message: "Scegli un'opzione per continuare",
      });
      return;
    }
    trackWebviewEvent('CDC_BONUS_CARD_SELECTED');
    navigate(APP_ROUTES.SELECT_AMOUNT);
  }, [navigate, showToast, value]);

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
      <Stack gap={2}>
        <Stack gap={2}>
          <Typography variant="h2">Scegli la Carta da usare</Typography>
          <Typography color={TEXT_COLOR} fontSize={16}>
            Seleziona la carta che vuoi usare per generare il buono
          </Typography>
        </Stack>
        <Stack>
          <RadioGroup>
            {cards.map(({ residual_amount, year }) =>
              residual_amount <= 0 ? null : (
                <Box key={year}>
                  <Stack direction="row">
                    <Radio
                      checked={value?.year === year}
                      onChange={() => onSelect({ residual_amount, year })}
                    />
                    <Stack onClick={() => null} gap={0.5} paddingX={1.25} paddingY={2}>
                      <Typography
                        fontSize={16}
                        fontWeight={600}
                      >{`Carta della Cultura ${year}`}</Typography>
                      <Typography
                        fontSize={14}
                        color={TEXT_COLOR}
                      >{`Credito disponibile ${residual_amount?.toFixed(2)}€`}</Typography>
                    </Stack>
                  </Stack>
                  <Divider />
                </Box>
              ),
            )}
          </RadioGroup>
        </Stack>
      </Stack>
      <Stack width="100%" justifySelf="end">
        <Button variant="contained" onClick={onClickBottom}>
          Continua
        </Button>
      </Stack>
    </Box>
  );
};
