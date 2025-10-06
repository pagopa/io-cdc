import { Box, Paper, styled } from '@mui/material';

export const NotchContainer = styled(Box)({
  position: 'relative',
  display: 'inline-block',
});

export const NotchedPaper = styled(Paper)({
  padding: '8px 32px',
  borderRadius: 0,
  backgroundColor: '#F1ECE6',
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
});

export const Notch = styled(Box)(({ side }: { side: 'left' | 'right' }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: 'white',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  [side]: -16,
  zIndex: 1,
}));
