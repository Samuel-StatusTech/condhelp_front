import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

// Pages
import Login from "../pages/Login"
import AuthRoute from "./AuthRoute"
import Dashboard from "../pages/Dashboard"
import DashTemplate from "../pages/_DashTemplate"

import UsersPage from "../pages/Users"
import PersonPage from "../pages/Forms/Users"
import CondosPage from "../pages/Condos"
import CategoriesPage from "../pages/Categories"
import SubcategoriesPage from "../pages/Subcategories"
import RegionsPage from "../pages/Regions"
import ErrandsPage from "../pages/Errands"
import FaqsPage from "../pages/Faqs"

/*
 *  Forms pages
 */

import FPcategory from "../pages/Forms/Category"
import FPsubcategory from "../pages/Forms/SubCategory"

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
            <Route path="condos">
              <Route path="" element={<CondosPage />} />
              {/* <Route path="single" element={<PersonPage />} /> */}
            </Route>
            <Route path="categories">
              <Route path="" element={<CategoriesPage />} />
              <Route path="single" element={<FPcategory />} />
              <Route path="single/:id" element={<FPcategory />} />
            </Route>
            <Route path="subcategories">
              <Route path="" element={<SubcategoriesPage />} />
              <Route path="single" element={<FPsubcategory />} />
              <Route path="single/:id" element={<FPsubcategory />} />
            </Route>
            <Route path="regions">
              <Route path="" element={<RegionsPage />} />
              {/* <Route path="single" element={<PersonPage />} /> */}
            </Route>
            <Route path="errands">
              <Route path="" element={<ErrandsPage />} />
              {/* <Route path="single" element={<PersonPage />} /> */}
            </Route>
            <Route path="managefaq">
              <Route path="" element={<FaqsPage />} />
              {/* <Route path="single" element={<PersonPage />} /> */}
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={"/dashboard"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
