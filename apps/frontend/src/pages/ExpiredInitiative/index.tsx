import { Logo } from "@io-cdc/ui";
import { Button, Stack, Typography } from "@mui/material";
import { EXPIRED_INITIATIVE_CONFIG_MAP } from "./constants";
import { useLocation } from "react-router-dom";

const STATUSES = {
  500: 'expired',
  501: 'alreadyRequested'
}

const ExpiredInitiative = () => {
  const { state } = useLocation()
  const status = STATUSES[state.status as keyof typeof STATUSES ?? 500]
  const { image, description, title } = EXPIRED_INITIATIVE_CONFIG_MAP[status];
  return (
    <Stack justifyContent="center" alignItems="center" height="100%" gap={4}>
      <Logo name={image} size={60} />
      <Stack gap={4} justifyContent="center" alignItems="center">
        <Typography variant="h4" textAlign="center">
          {title}
        </Typography>
        {description && <Typography textAlign="center">{description}</Typography>}
      </Stack>
      <Button onClick={() => window.location.replace("/")} size="small" variant="contained">
        Chiudi
      </Button>
    </Stack>
  );
};

export default ExpiredInitiative;
