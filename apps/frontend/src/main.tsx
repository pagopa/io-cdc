import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline } from "@mui/material";
import { theme } from "@io-cdc/ui";

import {
  BrowserRouter
} from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './features/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
    </Provider>
  </StrictMode>,
)
