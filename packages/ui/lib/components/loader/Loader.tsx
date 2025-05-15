import { CircularProgress, Stack, Typography } from "@mui/material";

interface LoaderProps {
  label?: string;
}

export const Loader = ({ label }: LoaderProps) => (
  <Stack alignItems="center" rowGap={2}>
    <CircularProgress />
    <Typography fontSize={22} fontWeight={700}>
      {label}
    </Typography>
  </Stack>
);
