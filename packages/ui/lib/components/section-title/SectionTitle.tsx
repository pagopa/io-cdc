import { Stack, Typography } from "@mui/material";
import { memo } from "react";
export interface SectionTitleProps {
  description?: string;
  title: string;
}

export const SectionTitle = memo(
  ({ description, title }: SectionTitleProps) => (
    <Stack gap={2}>
      <Typography fontSize={28} fontWeight="bold">
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary" fontSize={16}>
          {description}
        </Typography>
      )}
    </Stack>
  ),
);
