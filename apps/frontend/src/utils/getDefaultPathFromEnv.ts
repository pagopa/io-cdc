import { APP_ROUTES } from './appRoutes';

export const getDefaultPathFromEvironment = () => {
  const dashboard = import.meta.env.VITE_ENABLE_DASHBOARD;
  if (dashboard) return APP_ROUTES.HOME;
  return APP_ROUTES.AUTHORIZE;
};
