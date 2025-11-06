import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { APP_ROUTES_CONFIG_TYPE, getAppRoutes } from './routes/appRoutes';
import { useMixPanelSession } from './hooks';
import { ProtectedRoute } from './routes/ProtectedRoute';

const RenderRoutes = ({ path, Element }: APP_ROUTES_CONFIG_TYPE) => (
  <Route key={path} path={path} element={<Element />} />
);

function App() {
  useMixPanelSession();
  const { global, protectedRoutes } = getAppRoutes();

  return (
    <Routes>
      <Route element={<Layout />}>
        {global.map(RenderRoutes)}
        <Route element={<ProtectedRoute />}>{protectedRoutes.map(RenderRoutes)}</Route>
      </Route>
    </Routes>
  );
}

export default App;
