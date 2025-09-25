import { Box, Snackbar, SnackbarProps, Typography } from "@mui/material";

import { Icon, IconType } from "../icon";

interface ConfigToast {
  color: string;
  icon: IconType;
}

export const ICON_COLOR_CONFIG: {
  default: ConfigToast;
  error: ConfigToast;
  success: ConfigToast;
} = {
  default: {
    color: "#808080",
    icon: "info",
  },
  error: {
    color: "#FE6666",
    icon: "info",
  },
  success: {
    color: "#6CC66A",
    icon: "alertCheckCircle",
  },
};

export type ToastProps = {
  message?: string;
  messageType?: "default" | "error" | "success";
} & SnackbarProps;

export const Toast = ({
  TransitionProps,
  message,
  messageType = "default",
  onClose,
  open,
}: ToastProps) => {
  const { color, icon } = ICON_COLOR_CONFIG[messageType];
  return (
    <Snackbar
      TransitionProps={TransitionProps}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      autoHideDuration={2000}
      onClose={onClose}
      open={open}
      sx={{ mt: 4, zIndex: 9999 }}
    >
      <Box
        sx={{
          alignItems: "center",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: "4px 4px 12px rgba(0, 43, 85, 0.1)",
          display: "flex",
          minWidth: "70%",
          overflow: "hidden",
        }}
      >
        <Box sx={{ bgcolor: color, height: "3.5rem", width: 6 }} />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            gap: "1rem",
            p: 2,
          }}
        >
          <Icon name={icon} sx={{ color, height: 22, width: 22 }} />
          <Typography>{message}</Typography>
        </Box>
      </Box>
    </Snackbar>
  );
};
