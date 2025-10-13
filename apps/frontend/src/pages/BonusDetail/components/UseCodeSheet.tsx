import { SectionTitle } from '@io-cdc/ui';
import { Stack, Button } from '@mui/material';
import { CodesTabs } from '../../../components/CodesTabs';
import { useCallback, useMemo, useState } from 'react';
import { QrCode } from '../../../components/QrCode';
import { BarCode } from '../../../components/BarCode';
import { trackWebviewEvent } from '../../../utils/trackEvent';
import { useToast } from '../../../contexts';
import copy from 'copy-to-clipboard';
import { BottomSheet } from '../../../components/BottomSheet';

type UseCodeSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  code: string;
};

export const UseCodeSheet = ({ isOpen, onClose, code }: UseCodeSheetProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { showToast } = useToast();

  const copyBonusCode = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_COPY_CODE', { code_type: 'barcode' });
    copy(code);
    showToast({
      message: 'Il codice è stato copiato',
      messageType: 'success',
      onOpen: () => trackWebviewEvent('CDC_BONUS_COPY_CODE_SUCCESS'),
    });
  }, [code, showToast]);

  const SheetContentChild = useMemo(
    () =>
      tabIndex ? (
        <QrCode code={code} />
      ) : (
        <Stack direction="column" flexGrow={1} justifyContent="space-between" width="100%">
          <BarCode code={code} />
          <Button variant="contained" onClick={copyBonusCode}>
            Copia codice
          </Button>
        </Stack>
      ),
    [code, copyBonusCode, tabIndex],
  );

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
          {SheetContentChild}
        </Stack>
      </>
    </BottomSheet>
  );
};
