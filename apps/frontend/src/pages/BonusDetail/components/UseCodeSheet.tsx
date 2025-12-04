import { SectionTitle } from '@io-cdc/ui';
import { Stack } from '@mui/material';
import { CodesTabs, QrCode, BarCode, BottomSheet } from '../../../components';
import { useMemo, useState } from 'react';

type UseCodeSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  code: string;
};

export const UseCodeSheet = ({ isOpen, onClose, code }: UseCodeSheetProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const SheetContentComponent = useMemo(() => (tabIndex === 0 ? QrCode : BarCode), [tabIndex]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} snapPoint={0.9}>
      <>
        <Stack paddingInline={4}>
          <SectionTitle
            title="Usa il buono"
            description="Puoi usare il buono in tre modi: codice a barre, codice numerico o codice QR. Segui le istruzioni del negozio fisico o online"
          />
        </Stack>

        <CodesTabs tabIndex={tabIndex} onChangeTab={setTabIndex} />

        <Stack padding={2} alignItems="center" marginTop={4} flexGrow={1}>
          <SheetContentComponent code={code} isOpen={isOpen} />
        </Stack>
      </>
    </BottomSheet>
  );
};
