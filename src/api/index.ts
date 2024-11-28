import axios from "axios"
import { TApi } from "./types"
import { jwtDecode } from "jwt-decode"

// Api

import { apiAuth } from "./api/api/auth"
import { apiCategories } from "./api/api/categories"
import { apiSubcategories } from "./api/api/subcategories"
import { apiRegions } from "./api/api/regions"
import { apiCities } from "./api/api/cities"
import { apiStates } from "./api/api/states"
import { apiCountries } from "./api/api/countries"
import { apiPersons } from "./api/api/persons"
import { apiBudgets } from "./api/api/budget"
import { apiCondos } from "./api/api/condos"
import { apiFaqs } from "./api/api/faqs"

axios.defaults.baseURL = "https://api.oitickets.com.br/api/v1"

const backUrl = "http://localhost:8080"

axios.defaults.baseURL = backUrl

const checkTokenExpiration = (token: string) => {
  try {
    const decoded = jwtDecode(token)

    const now = +new Date().getTime().toFixed(0)

    const exp = (decoded.exp as number) * 1000

    return now > exp
  } catch (error) {
    return true
  }
}

axios.interceptors.request.use(function (config) {
  try {
    const localToken = localStorage.getItem("token")

    if (localToken) {
      if (localToken === "undefined") {
        localStorage.removeItem("token")

        window.location.reload()
      } else {
        const isTokenExpired = checkTokenExpiration(localToken)

        if (isTokenExpired) {
          localStorage.removeItem("token")

          window.location.reload()
        } else config.headers.Authorization = `Bearer ${localToken}`
      }
    }

    return config
  } catch (error) {
    return config
  }
})

export const service = axios

export const Api: TApi = {
  auth: apiAuth,
  budgets: apiBudgets,
  condos: apiCondos,
  categories: apiCategories,
  subcategories: apiSubcategories,
  regions: apiRegions,
  cities: apiCities,
  states: apiStates,
  countries: apiCountries,
  persons: apiPersons,
  faqs: apiFaqs,
}
