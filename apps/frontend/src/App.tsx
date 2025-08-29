import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { APP_ROUTES, APP_ROUTES_CONFIG } from './utils/appRoutes';
import { HomeIndex } from './pages/Authorize/routes';
import { Authorize } from './pages/Authorize';
import { useMixPanelSession } from './hooks';
import { featureFlags } from './utils/featureFlags';
import { NotFound } from './pages/NotFound';
import Home from './pages/Home';

function App() {
  useMixPanelSession();

  return (
    <Routes>
      <Route element={<Layout />}>
        {/** Authorize route is reachable only via io app redirect */}
        <Route path={APP_ROUTES.AUTHORIZE} element={<HomeIndex />}>
          <Route index element={<Authorize />} />
        </Route>

        <Route index element={featureFlags.dashboard ? <Home /> : <Navigate to="/not-found" />} />

        {APP_ROUTES_CONFIG.filter(({ flag }) => flag === undefined || featureFlags[flag]).map(
          ({ path, Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ),
        )}
        <Route path="/not-found" element={<NotFound />} />
        {/* <Route path="*" element={<Navigate to="/not-found" replace />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
