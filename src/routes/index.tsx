import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

// Pages
import Login from "../pages/Login"
import AuthRoute from "./AuthRoute"
import Dashboard from "../pages/Dashboard"
import DashTemplate from "../pages/_DashTemplate"
import PeoplePage from "../pages/People"
import GoalsPage from "../pages/Goals"
import CompaniesPage from "../pages/Companies"
import DepartmentsPage from "../pages/Departments"
import NewsboardPage from "../pages/Newsboard"
import NewsPage from "../pages/Forms/News"
import BannerPage from "../pages/Banner"
import PersonPage from "../pages/Forms/Person"
import CompanyPage from "../pages/Forms/Company"
import DepartmentPage from "../pages/Forms/Department"
import GoalPage from "../pages/Forms/Goal"
import OkrPage from "../pages/OKR"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<AuthRoute />}>
          <Route path="/dashboard" element={<DashTemplate />}>
            <Route path="" element={<Dashboard />} />
            <Route path="people">
              <Route path="" element={<PeoplePage />} />
              <Route path="single" element={<PersonPage />} />
            </Route>
            <Route path="okr">
              <Route path="" element={<OkrPage />} />
            </Route>
            <Route path="goals">
              <Route path="" element={<GoalsPage />} />
              <Route path="single" element={<GoalPage />} />
            </Route>
            <Route path="companies">
              <Route path="" element={<CompaniesPage />} />
              <Route path="single" element={<CompanyPage />} />
            </Route>
            <Route path="departments">
              <Route path="" element={<DepartmentsPage />} />
              <Route path="single" element={<DepartmentPage />} />
            </Route>
            <Route path="banner" element={<BannerPage />} />
            <Route path="newsboard" element={<NewsboardPage />} />
            <Route path="newsboard">
              <Route path="" element={<NewsboardPage />} />
              <Route path="single" element={<NewsPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={"/dashboard"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
