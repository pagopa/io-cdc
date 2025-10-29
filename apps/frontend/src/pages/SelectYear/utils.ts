export const checkExpirationDate: () => Boolean = () => {
  // Target timezone
  const timezone = 'Europe/Rome';

  // Limit timestamp in UTC
  // const limitUTC = new Date('2025-10-31T10:59:59.999Z');
  const limitUTC = new Date('2025-10-29T10:59:59.999Z');

  // Current time in the target timezone
  const nowInZone = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));

  // Convert limit UTC to the target timezone
  const limitInZone = new Date(limitUTC.toLocaleString('en-US', { timeZone: timezone }));

  // Compare
  return nowInZone <= limitInZone;
};
