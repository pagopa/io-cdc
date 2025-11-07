import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { theme } from '@io-cdc/ui';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { persistor, store } from './features/store.ts';
import { ToastProvider } from './contexts/index.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from 'react';
import { RequestLoader, ScrollToTop } from './components';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Suspense fallback={<RequestLoader />}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <CssBaseline />
            <BrowserRouter>
              <ScrollToTop />
              <App />
            </BrowserRouter>
          </ToastProvider>
        </ThemeProvider>
      </PersistGate>
    </Suspense>
  </Provider>,
);
