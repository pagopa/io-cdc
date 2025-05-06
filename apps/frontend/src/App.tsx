import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { APP_ROUTES, APP_ROUTES_CONFIG } from "./utils/appRoutes"
import { HomeIndex } from "./pages/Home/routes"
import Home from "./pages/Home"


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={APP_ROUTES.HOME} element={<HomeIndex />} >
          <Route index element={<Home />} />
          {
            APP_ROUTES_CONFIG.map(({ path, Element }) => <Route key={path} path={path} element={<Element />} />)
          }
        </Route>
        <Route path="*" element={<Navigate to={APP_ROUTES.HOME} />} />
      </Route>
    </Routes>
  )
}

export default App
