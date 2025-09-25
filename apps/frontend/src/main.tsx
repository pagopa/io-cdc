import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { theme } from '@io-cdc/ui';

import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './features/store.ts';
import { ToastProvider } from './contexts/index.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  </Provider>,
);
