import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return <Outlet />;
};
