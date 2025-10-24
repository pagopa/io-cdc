import { isEnvConfigEnabled } from './isEnvConfigEnabled';

export const featureFlags = {
  request: isEnvConfigEnabled(import.meta.env.VITE_ENABLE_REQUEST),
  dashboard: isEnvConfigEnabled(import.meta.env.VITE_ENABLE_DASHBOARD),
};
