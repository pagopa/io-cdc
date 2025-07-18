import { Navigate, Route, Routes } from 'react-router-dom';
import { APP_ROUTES, APP_ROUTES_CONFIG } from './utils/appRoutes';
import Home from './pages/Home';
import { Layout } from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path={APP_ROUTES.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        {APP_ROUTES_CONFIG.map(({ path, Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
        <Route path="*" element={<Navigate to={APP_ROUTES.HOME} />} />
      </Route>
    </Routes>
  );
}

export default App;
