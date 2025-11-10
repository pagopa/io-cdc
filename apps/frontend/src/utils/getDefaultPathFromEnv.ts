import { APP_ROUTES } from '../routes/appRoutes';
import { featureFlags } from './featureFlags';

export const getPathFromEvironment = () => {
  if (featureFlags.dashboard) return APP_ROUTES.HOME;
  return APP_ROUTES.SELECT_YEAR;
};
