import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { APP_ROUTES, APP_ROUTES_CONFIG } from './utils/appRoutes';
import { HomeIndex } from './pages/Authorize/routes';
import { Authorize } from './pages/Authorize';
import { useMixPanelSession } from './hooks';
import { featureFlags } from './utils/featureFlags';
import Home from './pages/Home';
import { getDefaultPathFromEvironment } from './utils/getDefaultPathFromEnv';

function App() {
  useMixPanelSession();
  console.log(featureFlags);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            featureFlags.dashboard ? <Home /> : <Navigate to={getDefaultPathFromEvironment()} />
          }
        />
        <Route path={APP_ROUTES.AUTHOIRIZE} element={<HomeIndex />}>
          <Route index element={<Authorize />} />
        </Route>
        {APP_ROUTES_CONFIG.filter(({ flag }) => flag === undefined || featureFlags[flag]).map(
          ({ path, Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ),
        )}
        <Route path="*" element={<Navigate to={getDefaultPathFromEvironment()} />} />
      </Route>
    </Routes>
  );
}

export default App;
