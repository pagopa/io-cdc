import { CheckboxList, Loader, SectionTitle } from '@io-cdc/ui';
import { Button, Chip, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/appRoutes';
import { useRequestBonusMutation } from '../../features/app/services';
import { useLoadYears } from '../../hooks';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';
import { RequestLoader } from '../../components';
import { checkExpirationDate } from './utils';
import { useToast } from '../../contexts';

const SelectYear = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [requestBonus] = useRequestBonusMutation();
  const { yearsList, notAvailableYears, isError, error, isSuccess } = useLoadYears();

  const hasCompleted = isSuccess || isError;

  useEffect(() => {
    if (isError && isFetchBaseQueryError(error)) {
      navigate(APP_ROUTES.EXPIRED, {
        state: {
          status: error.status,
        },
      });
    }
  }, [error, isError, navigate]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(notAvailableYears);

  useEffect(() => {
    setSelectedItems(notAvailableYears);
  }, [notAvailableYears]);

  const mappedYearsList = useMemo(
    () =>
      yearsList
        .map(({ label, value, disabled }) => ({
          label,
          value,
          disabled,
          rightComponent: disabled ? (
            <Chip label="Già richiesta" color="info" size="small" />
          ) : undefined,
        }))
        .sort((a, b) => Number(a.value) - Number(b.value)),
    [yearsList],
  );

  const allSelected = useMemo(
    () => mappedYearsList.every(({ value, disabled }) => disabled || selectedItems.includes(value)),
    [mappedYearsList, selectedItems],
  );

  const onSelectYear = useCallback(
    (value: string[]) => {
      setSelectedItems(value.length ? value : notAvailableYears);
    },
    [notAvailableYears],
  );

  const onConfirm = useCallback(async () => {
    if (selectedItems.length <= notAvailableYears.length) {
      showToast({
        messageType: 'error',
        message: "Scegli un'opzione per continuare",
      });
      return;
    }

    const canPost = checkExpirationDate();

    if (!canPost) {
      navigate(APP_ROUTES.EXPIRED, { state: { status: notAvailableYears.length ? 501 : 500 } });
      return;
    }

    const newYears = selectedItems.filter((year) => !notAvailableYears.includes(year));

    try {
      setIsLoading(true);
      const { error, data } = await requestBonus(newYears);
      if (error) {
        throw new Error('Something went wrong');
      }
      if (data)
        navigate(APP_ROUTES.FEEDBACK_REQUEST, {
          state: {
            status: 200,
            years: newYears.length,
          },
        });
    } catch (e) {
      navigate(APP_ROUTES.FEEDBACK_REQUEST, {
        state: {
          status: 503,
        },
      });
    }
  }, [selectedItems, notAvailableYears, showToast, navigate, requestBonus]);

  if (!hasCompleted) return <RequestLoader />;

  if (isLoading)
    return (
      <Stack flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <Loader />
        <Typography fontSize={22} fontWeight={700} textAlign="center">
          Stiamo inviando la tua richiesta
        </Typography>
      </Stack>
    );

  return (
    <Stack padding={2} flex={1} justifyContent="space-between" rowGap={2} overflow="hidden">
      <SectionTitle
        title="Per quale anno vuoi richiedere la Carta della Cultura?"
        description="Per ogni anno selezionato, assicurati che il tuo ISEE non superi i 15.000 € e che la tua residenza sia in Italia."
      />
      <Stack rowGap={2} flex={1} overflow="scroll">
        <CheckboxList
          title="ANNO"
          value={selectedItems}
          multiple
          buttonLabel={allSelected ? 'Deseleziona tutti' : 'Seleziona tutti'}
          onChange={onSelectYear}
          options={mappedYearsList}
          disableSelectAll={
            mappedYearsList.length - selectedItems.length === 1 ||
            mappedYearsList.every(({ disabled }) => disabled)
          }
        />
      </Stack>
      <Button onClick={onConfirm} size="medium" variant="contained">
        Continua
      </Button>
    </Stack>
  );
};

export default SelectYear;
