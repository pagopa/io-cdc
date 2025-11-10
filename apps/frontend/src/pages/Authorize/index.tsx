import { useGetSession } from '../../hooks';
import { RequestLoader } from '../../components';

const Authorize = () => {
  useGetSession();

  return <RequestLoader />;
};

export default Authorize;
