import { StyledComponent } from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";
import { keyframes, styled } from "@mui/system";

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner: StyledComponent<BoxProps> = styled(Box)(() => ({
  animation: `${rotate} 1.2s linear infinite`,
  height: "60px",
  position: "relative",
  width: "60px",
})).withComponent((props: React.ComponentProps<typeof Box>) => (
  <Box {...props} data-testid="spinner" />
));
