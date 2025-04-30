import { Logo } from "@io-cdc/ui";
import { Button, Stack, Typography } from "@mui/material";
import { FEEDBACK_CONFIG_MAP } from "./constants";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils/appRoutes";

// type FeedbackProps = { type: keyof typeof FEEDBACK_CONFIG_MAP };

const Feedback = () => {
  const navigate = useNavigate()
  const { state: { status } } = useLocation();
  const { image, description, subtitle, title } = FEEDBACK_CONFIG_MAP[status];

  return (
    <Stack justifyContent="center" alignItems="center" height="100%" gap={4}>
      <Logo name={image} size={60} />
      <Stack gap={4} justifyContent="center" alignItems="center">
        <Typography variant="h4" textAlign="center">
          {title}
        </Typography>
        {subtitle && <Typography textAlign="center">{subtitle}</Typography>}
        <Typography textAlign="center">{description}</Typography>
      </Stack>
      <Button onClick={() => navigate(APP_ROUTES.SELECT_YEAR)} size="small" variant="contained">
        Chiudi
      </Button>
    </Stack>
  );
};

export default Feedback;
