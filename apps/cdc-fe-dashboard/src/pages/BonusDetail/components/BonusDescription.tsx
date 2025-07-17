import { Typography } from '@mui/material';

type BonusDescriptionProps = {
  spent: boolean;
};

//TODO -> move to theme
const TEXT_COLOR = '#5C6F82';

export const BonusDescription = ({ spent }: BonusDescriptionProps) => {
  return spent ? (
    <Typography color={TEXT_COLOR}>Questo buono è già stato utilizzato. </Typography>
  ) : (
    <>
      <Typography color={TEXT_COLOR}>
        Se acquisti online, inserisci il codice nel campo dedicato. Per acquisti in negozio,
        mostralo all&apos;esercente. Il buono è personale e può essere utilizzato solo da te.
      </Typography>
      <Typography color={TEXT_COLOR}>
        Il buono è personale e può essere utilizzato solo da te.
      </Typography>
    </>
  );
};
