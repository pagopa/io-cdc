import { Button, Divider, Stack, Typography } from '@mui/material';
import { Carousel } from '../../components/Carousel';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetBonusQuery, useGetCardsQuery } from '../../features/app/services';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { APP_ROUTES } from '../../utils/appRoutes';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { BonusCard } from '../BonusList/components/BonusItem';
import { EmptyState } from '@io-cdc/ui';
import { Toast } from '../../components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectTicketDeleted } from '../../features/app/selectors';
import { ticketsActions } from '../../features/app/reducers';
import { OthersBonusSheet } from '../../components/OthersBonusSheet';

const TEXT_COLOR = '#5C6F82';

const Home = () => {
  const dispatch = useDispatch();
  const deleted = useSelector(selectTicketDeleted);

  const { data } = useGetCardsQuery();
  const { data: bonusList } = useGetBonusQuery();

  const [openToast, setOpenToast] = useState(deleted);
  const [openSheet, setOpenSheet] = useState(false);

  const navigate = useNavigate();

  const lastUpdateLabel = useMemo(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const label = `Saldo aggiornato al ${formattedDate}, ${formattedTime}`;
    return label;
  }, []);

  const onClickBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_GENERATION_START');
    navigate(APP_ROUTES.SELECT_CARD);
  }, [navigate]);

  const onClickBRetailers = useCallback(() => {
    trackWebviewEvent('CDC_CARD_SHOW_RETAILERS');
    //TODO add retailers redirect
  }, []);

  useEffect(() => {
    if (!data) return;
    trackWebviewEvent('CDC_CARD_DETAIL');
  }, [data]);

  const onClickShowAll = useCallback(() => {
    trackWebviewEvent('CDC_SHOW_BONUS_LIST');
    navigate(APP_ROUTES.BONUS_LIST);
  }, [navigate]);

  const toSpend = useMemo(() => {
    const tbs = bonusList?.filter(({ amount }) => amount > 0) ?? [];
    return tbs.slice(0, 4);
  }, [bonusList]);

  const spent = useMemo(() => {
    const tbs = bonusList?.filter(({ amount }) => amount < 0) ?? [];
    return tbs.slice(0, 4);
  }, [bonusList]);
  if (!data) return <div>no data</div>;

  return (
    <Stack justifyContent="center" alignItems="center" paddingInline={2}>
      <Carousel list={data} />
      <Typography sx={{ fontSize: 12 }} color={TEXT_COLOR}>
        {lastUpdateLabel}
      </Typography>
      <Stack width="100%" paddingInline={2} gap={4}>
        {bonusList && bonusList.length > 0 ? (
          <Stack width="100%" gap={2} paddingTop={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontWeight={700}>BUONI DA SPENDERE</Typography>
              <Button sx={{ padding: 0 }} onClick={onClickShowAll}>
                Mostra tutti
              </Button>
            </Stack>
            {toSpend.length ? (
              toSpend.map((bonus, index, array) => (
                <Stack gap={3} key={bonus.id} paddingTop={3}>
                  <BonusCard bonus={bonus} spent={false} openSheet={() => setOpenSheet(true)} />
                  {index !== array.length - 1 && <Divider />}
                </Stack>
              ))
            ) : (
              <Stack minHeight={100} justifyContent="center">
                <EmptyState icon="info" title="Non sono stati trovati buoni" />
              </Stack>
            )}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontWeight={700}>BUONI SPESI</Typography>
              <Button sx={{ padding: 0 }} onClick={onClickShowAll}>
                Mostra tutti
              </Button>
            </Stack>
            {spent.length ? (
              spent.map((bonus, index, array) => (
                <Stack gap={3} key={bonus.id} paddingTop={3}>
                  <BonusCard bonus={bonus} spent={true} />
                  {index !== array.length - 1 && <Divider />}
                </Stack>
              ))
            ) : (
              <Stack minHeight={100} justifyContent="center">
                <EmptyState icon="info" title="Non sono stati trovati buoni" />
              </Stack>
            )}
          </Stack>
        ) : (
          <Stack justifyContent="center" alignItems="center" py={4} gap={2}>
            <Typography fontWeight={600}>Genera un buono</Typography>
            <Typography textAlign="center">
              Qui troverai i buoni che genererai per i tuoi acquisti.
            </Typography>
          </Stack>
        )}

        <Stack gap={2}>
          <Button variant="contained" onClick={onClickBonus}>
            Genera buono
          </Button>
          <Button variant="text" onClick={onClickBRetailers}>
            Mostra esercenti
          </Button>
        </Stack>
      </Stack>
      <Toast
        open={openToast}
        onClose={() => {
          dispatch(ticketsActions.setDeleted(false));
          setOpenToast(false);
        }}
        iconName="alertCheckCircle"
        bodyText="Hai annullato il buono"
      />
      <OthersBonusSheet isOpen={openSheet} onClose={() => setOpenSheet(false)} />
    </Stack>
  );
};

export default Home;
