import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@io-cdc/ui";
import {
  BrowserRouter
} from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
