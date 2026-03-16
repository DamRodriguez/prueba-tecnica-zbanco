import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Dashboard from '../../pages/Dashboard'
import MainLayout from '../../layout/MainLayout'
import { getIsGithub } from '../../utils/getIsGithub';
import { routes } from '../../constants/routes';


function AppRoutes() {
  const isGithub = getIsGithub();
  const repoName = isGithub ? routes.basePath : "";

  return (
    <Router basename={repoName}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={routes.pages.home} element={<Home />} />
          <Route path={routes.pages.dashboard} element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes