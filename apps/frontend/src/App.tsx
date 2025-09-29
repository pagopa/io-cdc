import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { APP_ROUTES, APP_ROUTES_CONFIG } from './utils/appRoutes';
import { HomeIndex } from './pages/Authorize/routes';
import { useMixPanelSession } from './hooks';
import { Authorize } from './pages/Authorize';

function App() {
  useMixPanelSession();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={APP_ROUTES.AUTHORIZE} element={<HomeIndex />}>
          <Route index element={<Authorize />} />
        </Route>
        {APP_ROUTES_CONFIG.map(({ path, Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
        <Route path="*" element={<Navigate to={APP_ROUTES.AUTHORIZE} />} />
      </Route>
    </Routes>
  );
}

export default App;
