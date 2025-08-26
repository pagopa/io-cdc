export const featureFlags = {
  request: import.meta.env.VITE_ENABLE_REQUEST === 'true',
  dashboard: import.meta.env.VITE_ENABLE_DASHBOARD === 'true',
};
