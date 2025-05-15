import { CheckboxList, Loader, SectionTitle } from '@io-cdc/ui';
import { Button, Chip, Stack, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../utils/appRoutes';
import { selectYearsList } from '../../features/app/selectors';
import { useSelector } from 'react-redux';
import { useRequestBonusMutation } from '../../features/app/services';

const SelectYear = () => {
  const yearsList = useSelector(selectYearsList);
  const [requestBonus, { isLoading }] = useRequestBonusMutation();

  const mappedYearsList = useMemo(
    () =>
      yearsList.map(({ alreadyRequested, ...option }) => ({
        ...option,
        disabled: alreadyRequested,
        rightComponent: alreadyRequested ? (
          <Chip label="Già richiesta" color="primary" size="small" />
        ) : undefined,
      })),
    [yearsList],
  );

  const alredaySelected = yearsList
    .filter(({ alreadyRequested }) => alreadyRequested)
    .map(({ value }) => value);

  const [selectedItems, setSelectedItems] = useState<string[]>(alredaySelected);

  const navigate = useNavigate();

  const onSelectYear = useCallback((value: string[]) => {
    setSelectedItems(value);
  }, []);

  const onConfirm = useCallback(async () => {
    const newYears = yearsList
      .filter(({ value }) => selectedItems.includes(value) && !alredaySelected.includes(value))
      .map(({ value }) => value);
    try {
      const { error, data } = await requestBonus(newYears);
      if (error) {
        throw new Error('Something went wrong');
      }
      if (data)
        navigate(APP_ROUTES.FEEDBACK, {
          state: {
            status: 200,
          },
        });
    } catch (e) {
      console.log(e);
      navigate(APP_ROUTES.FEEDBACK, {
        state: {
          status: 500,
        },
      });
    }
  }, [alredaySelected, navigate, requestBonus, selectedItems, yearsList]);

  return isLoading ? (
    <Stack flex={1} justifyContent="center" alignItems="center" rowGap={2}>
      <Loader />
      <Typography fontSize={22} fontWeight={700} textAlign="center">
        Stiamo inviando la tua richiesta
      </Typography>
    </Stack>
  ) : (
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
          buttonLabel="Seleziona tutti"
          onChange={onSelectYear}
          options={mappedYearsList}
          disableSelectAll={selectedItems.length >= mappedYearsList.length - 1}
        />
      </Stack>
      <Button
        onClick={onConfirm}
        disabled={selectedItems.length <= alredaySelected.length}
        size="small"
        variant="contained"
      >
        Continua
      </Button>
    </Stack>
  );
};

export default SelectYear;
