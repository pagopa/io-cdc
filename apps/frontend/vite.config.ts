import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import typescript from 'vite-plugin-typescript';

export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' }), typescript()],
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/system',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
});
