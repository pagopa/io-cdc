import { isAfter } from 'date-fns';

export const checkExpirationDate: () => Boolean = () => {
  // Limit timestamp in UTC
  const limitUTC = new Date('2025-10-31T10:59:59.999Z');

  // Current time in the target timezone
  const now = new Date();

  // Compare
  return isAfter(limitUTC, now);
};
