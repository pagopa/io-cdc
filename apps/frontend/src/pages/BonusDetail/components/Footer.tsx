import { Icon } from '@io-cdc/ui';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { PopConfirm } from '../../../components/PopConfirm';
import { useCallback, useMemo, useState } from 'react';

import { APP_ROUTES } from '../../../utils/appRoutes';
import { useDeleteBonusMutation } from '../../../features/app/services';
import { Sheet } from 'react-modal-sheet';
import { CodesTabs } from '../../../components/CodesTabs';
import { BarCode } from '../../../components/BarCode';
import { QrCode } from '../../../components/QrCode';
import { trackWebviewEvent } from '../../../utils/trackEvent';

type FooterProps = {
  bonusId: string;
  code: string;
};

export const Footer = ({ bonusId, code }: FooterProps) => {
  const [deleteBonus, { isSuccess: isBonusDeleteSuccess }] = useDeleteBonusMutation();
  const [isOpen, setIsOpen] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const copyBonusCode = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_COPY_CODE', {
      code_type: 'barcode',
    });
    return navigator.clipboard.writeText(code);
  }, [code]);

  const SheetContentChild = useMemo(
    () =>
      tabIndex ? (
        <QrCode code={code} />
      ) : (
        <Stack direction="column">
          <BarCode code={code} />
          <Button variant="contained" onClick={copyBonusCode}>
            Copia codice
          </Button>
        </Stack>
      ),
    [code, copyBonusCode, tabIndex],
  );

  const onClickUseBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_SHOW_CODE');
    setIsOpen(true);
  }, []);

  const onClickDeleteBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_CANCEL');
    setIsDialogOpen(true);
  }, []);

  const onDeleteBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_CANCELLATION_CONFIRM');
  }, []);
  const onStopDeleteBonus = useCallback(() => {
    trackWebviewEvent('CDC_BONUS_CANCELLATION_BACK');
  }, []);

  if (isBonusDeleteSuccess) {
    return <Navigate to={APP_ROUTES.BONUS_LIST} />;
  }
  return (
    <>
      <Button
        variant="text"
        onClick={onClickDeleteBonus}
        startIcon={<Icon name="close" sx={{ width: 11, height: 11 }} />}
        color="error"
        sx={{
          padding: 0,
          justifyContent: 'start',
        }}
      >
        Annulla il buono
      </Button>
      <PopConfirm
        isOpen={isDialogOpen}
        onOpen={() => trackWebviewEvent('CDC_BONUS_CANCELLATION')}
        description="Se prosegui, l’importo del buono tornerà disponibile"
        title="Vuoi davvero annullare il buono?"
        buttonConfirm={{
          title: 'ANNULLA BUONO',
          onClick: onDeleteBonus,
        }}
        buttonClose={{
          title: 'TORNA INDIETRO',
          onClick: onStopDeleteBonus,
        }}
      />
      <Button variant="contained" onClick={onClickUseBonus}>
        Usa il buono
      </Button>

      <Button variant="text" onClick={() => navigate(-1)}>
        Chiudi
      </Button>

      <Sheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
                sx={{
                  color: 'unset',
                  fontSize: '14px',
                }}
              >
                <Icon name="close" />
              </IconButton>
            </Stack>
          </Sheet.Header>
          <Sheet.Content
            style={{
              display: 'flex',
            }}
          >
            {/** //TODO adjust style  */}
            <Stack display="flex" flexDirection="column" justifyContent="space-between">
              <CodesTabs tabIndex={tabIndex} onChangeTab={setTabIndex} />
              <Stack padding={2} alignItems="center" marginTop={4}>
                {SheetContentChild}
              </Stack>
            </Stack>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};
