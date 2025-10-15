import { useGetSession } from '../../hooks';
import { RequestLoader } from '../../components/RequestLoader';

export const Authorize = () => {
  useGetSession();

  return <RequestLoader />;
};
