/* eslint-disable no-console */
import { StyledComponent } from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";
import { keyframes, styled } from "@mui/system";

const fade = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

export const Dot: StyledComponent<{ index: number } & BoxProps> = styled(Box, {
  shouldForwardProp: (prop) => prop !== "index",
})<{ index: number }>(({ index }) => {
  const angle = (index * 360) / 8;
  const radius = 24;

  const x = radius * Math.cos((angle * Math.PI) / 180);
  const y = radius * Math.sin((angle * Math.PI) / 180);

  return {
    animation: `${fade} 1.2s linear infinite`,
    animationDelay: `${(index * 0.15).toFixed(2)}s`,
    backgroundColor: "#42c5cd",
    borderRadius: "50%",
    height: 12,
    left: "50%",
    marginLeft: -6 + x,
    marginTop: -6 + y,
    position: "absolute",
    top: "50%",
    width: 12,
  };
}).withComponent((props: React.ComponentProps<typeof Box>) => (
  <Box {...props} data-testid="dot" />
));
