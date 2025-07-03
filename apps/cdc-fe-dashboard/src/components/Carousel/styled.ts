import { Box, styled } from '@mui/system';

export const StyledDots = styled(Box)`
  cursor: none;

  &.inactive {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid #5c6f82;
  }

  &.active {
    width: 16px;
    height: 4px;
    border-radius: 15px;
    background-color: #0073e6;
    border: none;
  }
`;
