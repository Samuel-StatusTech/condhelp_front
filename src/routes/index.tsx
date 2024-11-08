import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

// Pages
import Login from "../pages/Login"
import AuthRoute from "./AuthRoute"
import Dashboard from "../pages/Dashboard"
import DashTemplate from "../pages/_DashTemplate"

import UsersPage from "../pages/Users"
import PersonPage from "../pages/Forms/Users"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<AuthRoute />}>
          <Route path="/dashboard" element={<DashTemplate />}>
            <Route path="" element={<Dashboard />} />
            <Route path="users">
              <Route path="" element={<UsersPage />} />
              <Route path="single" element={<PersonPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={"/dashboard"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
