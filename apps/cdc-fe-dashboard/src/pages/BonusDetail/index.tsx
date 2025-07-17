import { Chip, ChipProps, Divider, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Icon } from '@io-cdc/ui';
import { useGetBonusByIdQuery } from '../../store/services/api';
import { useCallback } from 'react';
import { CodesSection } from './components/CodesSection';
import { BonusDescription } from './components/BonusDescription';
import { MerchantDescription } from './components/MerchantDescription';
import { Footer } from './components/Footer';

const BonusDetail = () => {
  const { id = '' } = useParams();
  const { data: bonusDetail, isLoading, error } = useGetBonusByIdQuery(id);

  const spent = !!bonusDetail?.spentDate;

  const copyBonusCode = useCallback((text: string) => {
    return navigator.clipboard.writeText(text);
  }, []);

  const chipConfig = {
    label: spent ? 'SPESO' : 'DA SPENDERE',
    color: (spent ? 'info' : 'primary') as ChipProps['color'],
  };

  if (isLoading) return <>Loading...</>;
  if (error) return <>Errore</>;

  return bonusDetail ? (
    <Stack p={4} gap={3}>
      <Header />
      <Stack gap={8}>
        <Stack gap={2}>
          <Typography variant="h2">Il tuo buono</Typography>
          <BonusDescription spent={spent} />
        </Stack>
      </Stack>
      <Stack direction="row" gap={1}>
        <Icon name="ticket" />
        <Typography fontWeight={700}>DETTAGLI DEL BUONO</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography color="#5C6F82">Importo</Typography>
          <Typography fontWeight={600} fontSize={18}>
            {bonusDetail.amount.toFixed(2)} €
          </Typography>
        </Stack>
        <Chip {...chipConfig} size="small" sx={{ fontSize: 14 }} />
      </Stack>

      <Divider />
      <Stack>
        <Typography color="#5C6F82">{spent ? 'Speso' : 'Scade'} il</Typography>
        <Typography fontWeight={600} fontSize={18}>
          {bonusDetail.expireDate}
        </Typography>
      </Stack>
      <Divider />
      <Stack>
        <Typography color="#5C6F82">Carta della cultura usata:</Typography>
        <Typography fontWeight={600} fontSize={18}>
          {bonusDetail.cardYear}
        </Typography>
      </Stack>
      <Stack rowGap={4}>
        <Stack direction="row" gap={1}>
          <Icon name="key" />
          <Typography fontWeight={700}>CODICI</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack>
            <Typography color="#5C6F82">Codice univoco</Typography>
            <Typography fontWeight={600} fontSize={18} color="#0073E6">
              {bonusDetail.code}
            </Typography>
          </Stack>
          <IconButton onClick={() => copyBonusCode(bonusDetail.code)}>
            <Icon name="copy" />
          </IconButton>
        </Stack>
      </Stack>
      <Divider />
      {spent ? <MerchantDescription /> : <CodesSection code={bonusDetail.code} />}
      {!spent && <Footer />}
    </Stack>
  ) : (
    <>not found</>
  );
};

export default BonusDetail;
