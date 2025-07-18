import { useMemo, useState } from 'react';
import { BonusTabs } from '../BonusTabs';
import { BonusItem } from '../../store/services/model';
import { Divider, Stack } from '@mui/material';
import { BonusCard } from '../../pages/BonusList/components/BonusItem';
import { EmptyState } from '@io-cdc/ui';

type BonusListProps = {
  bonusList: BonusItem[];
  limit?: number;
};
export const BonusList = ({ bonusList, limit }: BonusListProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const bonusByType = useMemo(() => {
    const filteredBonus = limit ? bonusList.slice(0, limit + 1) : bonusList;
    return filteredBonus?.reduce<{
      spent: BonusItem[];
      toSpend: BonusItem[];
    }>(
      (acc, bonus) => {
        acc[bonus.amount > 0 ? 'toSpend' : 'spent'].push(bonus);
        return acc;
      },
      {
        spent: [],
        toSpend: [],
      },
    );
  }, [bonusList, limit]);

  const filteredBonus = bonusByType[tabIndex ? 'spent' : 'toSpend'];

  return (
    <Stack gap={0}>
      <BonusTabs tabIndex={tabIndex} onChangeTab={setTabIndex} />
      {filteredBonus.length ? (
        filteredBonus.map((bonus, index, array) => {
          return (
            <Stack gap={3} key={bonus.id} paddingTop={3}>
              <BonusCard bonus={bonus} spent={!!tabIndex} />
              {index !== array.length - 1 && <Divider />}
            </Stack>
          );
        })
      ) : (
        <Stack minHeight={100} justifyContent="center">
          <EmptyState icon="info" title="Non sono stati trovati buoni" />
        </Stack>
      )}
    </Stack>
  );
};
