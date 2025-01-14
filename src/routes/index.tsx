import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { getStore } from "../store"

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
 *  Head menu pages
 */

import Monitoring from "../pages/Head/Monitoring"
import CallsHistory from "../pages/Head/CallsHistory"

/*
 *  Forms pages
 */

import FPcategory from "../pages/Forms/Category"
import FPsubcategory from "../pages/Forms/SubCategory"
import FPcondo from "../pages/Forms/Condo"
import FPregion from "../pages/Forms/Region"
import FPerrand from "../pages/Forms/Errand"
import FPfaq from "../pages/Forms/Faq"
import FaqsView from "../pages/Head/Faq"
import Budgets from "../pages/Budgets"
import FPdocuments from "../pages/Forms/Documents"
import ProviderBudgets from "../pages/ProviderBudgets"
import DashboardManagerBudget from "../pages/DashboardManagerBudget"
import DashboardProviderBudget from "../pages/DashboardProviderBudget"

const Router = () => {
  const { user } = getStore()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<AuthRoute />}>
          <Route
            path="/monitoring"
            element={<DashTemplate withoutSidebar={true} />}
          >
            <Route path="" element={<Monitoring />} />
          </Route>
          <Route
            path="/callshistory"
            element={<DashTemplate withoutSidebar={true} />}
          >
            <Route path="" element={<CallsHistory />} />
          </Route>
          <Route path="/faqs" element={<DashTemplate />}>
            <Route path="" element={<FaqsView />} />
          </Route>
          <Route path="/dashboard" element={<DashTemplate />}>
            <Route path="" element={<Dashboard />} />
            <Route
              path="budget/:budgetId"
              element={
                user?.profile === "SINDICO" ? (
                  <DashboardManagerBudget />
                ) : (
                  <DashboardProviderBudget />
                )
              }
            />
            <Route path="documents" element={<FPdocuments />} />
            <Route path="users">
              <Route path="" element={<UsersPage />} />
              <Route path="single" element={<PersonPage />} />
              <Route path="single/:id" element={<PersonPage />} />
            </Route>
            <Route path="condos">
              <Route path="" element={<CondosPage />} />
              <Route path="single" element={<FPcondo />} />
              <Route path="single/:id" element={<FPcondo />} />
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
            <Route
              path="providerBudgets/available"
              element={<ProviderBudgets status="DISPONIVEL" />}
            />
            <Route
              path="providerBudgets/awaiting"
              element={<ProviderBudgets status="AGUARDANDO_SINDICO" />}
            />
            <Route
              path="providerBudgets/finished"
              element={<ProviderBudgets status="FINALIZADO" />}
            />
            <Route path="budgets">
              <Route path="" element={<Budgets />} />
            </Route>
            <Route path="regions">
              <Route path="" element={<RegionsPage />} />
              <Route path="single" element={<FPregion />} />
              <Route path="single/:id" element={<FPregion />} />
            </Route>
            <Route path="errands">
              <Route path="" element={<ErrandsPage />} />
              <Route path="single" element={<FPerrand />} />
              <Route path="single/:id" element={<FPerrand />} />
            </Route>
            <Route path="managefaq">
              <Route path="" element={<FaqsPage />} />
              <Route path="single" element={<FPfaq />} />
              <Route path="single/:id" element={<FPfaq />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={"/dashboard"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
