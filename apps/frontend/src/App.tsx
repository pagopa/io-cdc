import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { APP_ROUTES, getAppRoutes } from './utils/appRoutes';
import { HomeIndex } from './pages/Authorize/routes';
import { Authorize } from './pages/Authorize';
import { useMixPanelSession } from './hooks';
import { featureFlags } from './utils/featureFlags';
import { NotFound } from './pages/NotFound';
import Home from './pages/Home';

function App() {
  useMixPanelSession();
  const APP_ROUTES_LIST = getAppRoutes();

  return (
    <Routes>
      <Route element={<Layout />}>
        {/** Authorize route is reachable only via io app redirect */}
        <Route path={APP_ROUTES.AUTHORIZE} element={<HomeIndex />}>
          <Route index element={<Authorize />} />
        </Route>

        <Route
          index
          element={featureFlags.dashboard ? <Home /> : <Navigate to={APP_ROUTES.NOT_FOUND} />}
        />
        {APP_ROUTES_LIST.map(({ path, Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
        <Route path={APP_ROUTES.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
