import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { theme } from '@io-cdc/ui';

import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { persistor, store } from './features/store.ts';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
