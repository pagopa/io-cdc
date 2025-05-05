import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { APP_ROUTES, APP_ROUTES_CONFIG } from "./utils/appRoutes"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {
          APP_ROUTES_CONFIG.map(({ path, Element }) => <Route key={path} path={path} element={<Element />} />)
        }
        <Route path="*" element={<Navigate to={APP_ROUTES.SELECT_YEAR} />} />
      </Route>
    </Routes>
  )
}

export default App
