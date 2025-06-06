import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";

interface AssistanceProps {
  label: string;
  onClick: () => void;
}

export interface TopBarProps {
  assistance?: AssistanceProps;
}

export const TopBar = ({ assistance }: TopBarProps) => (
  <AppBar position="static" sx={{ bgcolor: "background.paper" }}>
    <Toolbar>
      {assistance && (
        <Stack alignItems="center" direction="row" spacing={2}>
          <ButtonNaked
            component="button"
            onClick={assistance.onClick}
            size="small"
            startIcon={<HelpOutlineRoundedIcon />}
            sx={{ display: ["none", "flex"] }}
            weight="default"
          >
            {assistance.label}
          </ButtonNaked>
          <IconButton
            aria-label={assistance.label}
            onClick={assistance.onClick}
            size="small"
            sx={{ display: ["flex", "none"] }}
          >
            <HelpOutlineRoundedIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      )}
    </Toolbar>
  </AppBar>
);
