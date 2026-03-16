import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Dashboard from '../../pages/Dashboard'
import MainLayout from '../../layout/MainLayout'
import { getIsGithub } from '../../utils/getIsGithub';


function AppRoutes() {
  const isGithub = getIsGithub();
  const repoName = isGithub ? "/prueba-tecnica-zbanco" : "";

  return (
    <Router basename={repoName}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes