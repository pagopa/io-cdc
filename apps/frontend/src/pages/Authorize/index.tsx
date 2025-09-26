import { RequestLoader } from '../../components/RequestLoader';
import { useGetSession } from '../../hooks';

export const Authorize = () => {
  useGetSession();

  return <RequestLoader />;
};
