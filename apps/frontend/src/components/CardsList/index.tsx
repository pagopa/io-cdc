import { Stack } from '@mui/system';
import { CardItem } from './CardItem';
import { useSelector } from 'react-redux';
import { selectCardsList } from '../../features/app/selectors';

export const CardsList = () => {
  const { data } = useSelector(selectCardsList);

  if (!data) return <></>;
  return (
    <Stack>
      {data.map(({ balance, year }) => (
        <CardItem key={year} balance={balance} year={year} />
      ))}
    </Stack>
  );
};
