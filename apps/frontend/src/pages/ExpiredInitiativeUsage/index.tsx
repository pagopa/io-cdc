import { Button, Stack, Typography } from '@mui/material';

const ExpiredInitiativeUsage = () => {
  // useEffect(() => {
  // trackWebviewEvent(trackName, trackProperties);
  // }, []);

  return (
    <Stack justifyContent="center" alignItems="center" height="100%" gap={4} padding={2}>
      {/* <Icon name={image} sx={{ width: 60, height: 60 }} /> */}
      <Stack gap={1} justifyContent="center" alignItems="center">
        <Typography variant="h4" textAlign="center">
          Iniziativa chiusa
        </Typography>
        {/* {description && <Typography textAlign="center">{description}</Typography>} */}
      </Stack>
      <Button
        onClick={() => window.location.replace(import.meta.env.VITE_CLOSE_DEEPLINK)}
        size="small"
        variant="contained"
      >
        Chiudi
      </Button>
    </Stack>
  );
};

export default ExpiredInitiativeUsage;
