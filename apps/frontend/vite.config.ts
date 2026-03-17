import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import typescript from 'vite-plugin-typescript';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react({ jsxImportSource: '@emotion/react' }),
    typescript(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/healthcheck.txt',
          dest: 'assets',
          rename: 'healthcheck.txt',
        },
      ],
    }),
  ],
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
