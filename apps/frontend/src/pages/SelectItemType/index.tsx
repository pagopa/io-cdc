import { Stack } from '@mui/system';
import { useCallback, useEffect, useMemo } from 'react';
import { Header } from '../../components';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/appRoutes';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { RadioList } from '../../components';
import { ticketsActions } from '../../features/app/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteGuard } from '../../hooks';
import { useToast } from '../../contexts';
import { selectTypology } from '../../features/app/selectors';
import { VOUCHER_TYPOLOGY } from '../../features/app/model';
import { useGetTypologiesQuery } from '../../features/app/services';
import { EmptyState, Loader } from '@io-cdc/ui';
import { Button, capitalize } from '@mui/material';

const SelectItemType = () => {
  //TODO test only
  useRouteGuard();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const selectedTypology = useSelector(selectTypology);

  const { data: typologies, isFetching, refetch, isError } = useGetTypologiesQuery();

  const itemTypeOptions = useMemo(() => {
    if (!typologies) return [];
    return typologies.map(({ typology }) => ({
      label: capitalize(typology.toLowerCase()),
      subLabel: `placeholder subtitle for ${typology.toLowerCase()}`,
      id: typology,
      value: typology,
    }));
  }, [typologies]);

  const onRadioSelect = useCallback(
    (selectedTypology: VOUCHER_TYPOLOGY) => {
      dispatch(ticketsActions.setTypology(selectedTypology));
    },
    [dispatch],
  );

  const onRadioSubmit = useCallback(() => {
    if (!selectedTypology) {
      showToast({
        messageType: 'error',
        message: "Scegli un'opzione per continuare",
      });
      return;
    }
    // TODO here could be inserted new mixpanel event (this is a placeholder)
    trackWebviewEvent('CDC_BONUS_TYPOLOGY_SELECTED');
    navigate(APP_ROUTES.SELECT_AMOUNT);
  }, [navigate, showToast, selectedTypology]);

  const onBackHeader = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_GENERATION_BACK', {
      // TODO here could be inserted new mixpanel event (this is a placeholder)
      screen: 'CDC_BONUS_TYPOLOGY_INSERT',
    });
    dispatch(ticketsActions.setTypology(undefined));
    navigate(-1);
  }, [dispatch, navigate]);

  useEffect(() => {
    // TODO here could be inserted new mixpanel event (this is a placeholder)
    trackWebviewEvent('CDC_TYPOLOGY_SELECTION');
  }, [dispatch]);

  if (isFetching)
    return (
      <Stack flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <Loader />
      </Stack>
    );

  if (isError)
    return (
      <Stack flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <EmptyState icon="info" title="Errore nel caricamento delle tipologie" />
        <Button variant="text" onClick={() => refetch()}>
          Riprova
        </Button>
      </Stack>
    );

  return (
    <Stack p={3} gap={3} flex={1}>
      <Header onBack={onBackHeader} />
      <RadioList
        title="Scegli la Tipologia"
        subTitle="Seleziona la tipologia di bene da acquistare"
        onSelect={(value: string) => onRadioSelect(value as VOUCHER_TYPOLOGY)}
        onSubmit={onRadioSubmit}
        options={itemTypeOptions}
        value={selectedTypology}
      />
    </Stack>
  );
};

export default SelectItemType;
