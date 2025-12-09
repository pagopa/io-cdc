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
import { formatDecimals } from '../../../utils/formatDecimals';

type RadioListProps = {
  cards: Pick<Card, 'residual_amount' | 'year'>[];
};

const TEXT_COLOR = '#555C70';

export const RadioList = ({ cards }: RadioListProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const value = useSelector(selectSelectedCardBonus);

  const onSelect = useCallback(
    (selected: Pick<Card, 'residual_amount' | 'year'>) => {
      dispatch(ticketsActions.setSelectedCard(selected));
      dispatch(ticketsActions.setActiveCard(selected.year));
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
          <Typography variant="h4">Scegli la Carta da usare</Typography>
          <Typography color={TEXT_COLOR} fontSize={18}>
            Seleziona la carta che vuoi usare per generare il buono
          </Typography>
        </Stack>
        <Stack>
          <RadioGroup>
            {cards.map(({ residual_amount, year }, i, arr) =>
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
                      >{`Credito disponibile ${formatDecimals(residual_amount)} €`}</Typography>
                    </Stack>
                  </Stack>
                  {i + 1 === arr.length ? null : <Divider />}
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
