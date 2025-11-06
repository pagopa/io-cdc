import { useGetSession } from '../../hooks';
import { RequestLoader } from '../../components/RequestLoader';

const Authorize = () => {
  useGetSession();

  return <RequestLoader />;
};

export default Authorize;
