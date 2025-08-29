import { Icon, SectionTitle } from '@io-cdc/ui';
import { Stack, IconButton, Button } from '@mui/material';
import { Sheet } from 'react-modal-sheet';
import { CodesTabs } from '../../../components/CodesTabs';
import { Toast } from '../../../components/Toast';
import { useCallback, useMemo, useState } from 'react';
import { QrCode } from '../../../components/QrCode';
import { BarCode } from '../../../components/BarCode';
import { trackWebviewEvent } from '../../../utils/trackEvent';

type UseCodeSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  code: string;
};

export const UseCodeSheet = ({ isOpen, onClose, code }: UseCodeSheetProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [openToast, setOpenToast] = useState(false);

  const copyBonusCode = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_COPY_CODE', {
      code_type: 'barcode',
    });
    navigator.clipboard.writeText(code);
    setOpenToast(true);
  }, [code]);

  const SheetContentChild = useMemo(
    () =>
      tabIndex ? (
        <QrCode code={code} />
      ) : (
        <Stack direction="column" flexGrow={0.5} justifyContent="space-between" width="100%">
          <BarCode code={code} />
          <Button variant="contained" onClick={copyBonusCode}>
            Copia codice
          </Button>
        </Stack>
      ),
    [code, copyBonusCode, tabIndex],
  );

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      disableDrag
      snapPoints={[0.75, 0.5]}
      initialSnap={0}
      detent="full-height"
    >
      <Sheet.Container
        style={{
          height: '100dvh',
          borderRadius: 16,
          transitionDuration: isOpen ? '0ms' : '500ms',
        }}
      >
        <Sheet.Header>
          <Stack
            alignItems="end"
            paddingX={3}
            sx={{
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                color: 'unset',
                fontSize: '14px',
                minHeight: '56px',
              }}
            >
              <Icon name="close" color="disabled" />
            </IconButton>
          </Stack>
        </Sheet.Header>
        <Sheet.Content
          style={{
            display: 'flex',
            height: '75dvh',
            flexGrow: 0,
          }}
        >
          {/** //TODO adjust style  */}
          <Stack display="flex" flexDirection="column" flexGrow={1}>
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
          </Stack>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />

      <Toast
        open={openToast}
        onClose={() => setOpenToast(false)}
        iconName="alertCheckCircle"
        bodyText="Il codice è stato copiato"
      />
    </Sheet>
  );
};
