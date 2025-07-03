import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { CdcInput } from '../../components/Input';
import { CdcSelect } from '../../components/Select';
import { useSelector } from 'react-redux';
import { selectCardSelected, selectCardsList } from '../../features/app/selectors';
import { CDC } from '../../features/app/model';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TicketState = {
  selectedCard?: CDC;
  ticketAmount?: number;
};

const GenerateTicket = () => {
  const navigate = useNavigate();
  const { data } = useSelector(selectCardsList);

  const [{ selectedCard, ticketAmount }, setState] = useState<TicketState>({});

  const handleChangeState = useCallback((value: CDC | number, key: keyof TicketState) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const inputError = useMemo(
    () => !!ticketAmount && !!selectedCard && ticketAmount > selectedCard?.balance,
    [selectedCard, ticketAmount],
  );

  return (
    <Stack p={4} justifyContent="space-between" height="100dvh">
      <Stack gap={8}>
        <Stack gap={2}>
          <Typography variant="h2">Genera un buono</Typography>
          <Typography>Scegli quale Carta della Cultura vuoi usare e l&apos;importo</Typography>
        </Stack>
        <Stack gap={2}>
          <CdcSelect data={data} handleChange={handleChangeState} year={selectedCard?.year} />
          <CdcInput icon="euro" onChange={handleChangeState} error={inputError} />
        </Stack>
      </Stack>
      <Stack width="100%" justifySelf="end">
        <Button
          variant="contained"
          onClick={() => navigate('/home')}
          disabled={!(!!selectedCard && !!ticketAmount)}
        >
          Continua
        </Button>
        <Button variant="text">Annulla</Button>
      </Stack>
    </Stack>
  );
};

export default GenerateTicket;
