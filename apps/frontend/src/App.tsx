import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { APP_ROUTES, getAppRoutes } from './utils/appRoutes';
import { HomeIndex } from './pages/Authorize/routes';
import { Authorize } from './pages/Authorize';
import { useMixPanelSession } from './hooks';

function App() {
  useMixPanelSession();
  const APP_ROUTES_LIST = getAppRoutes();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={APP_ROUTES.AUTHORIZE} element={<HomeIndex />}>
          <Route index element={<Authorize />} />
        </Route>
        {APP_ROUTES_LIST.map(({ path, Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
