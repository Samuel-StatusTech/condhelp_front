import { TErrorsCheck } from "../../@types/helpers/checkErrors"
import { loginCheck } from "./login"
import { categoriesCheck } from "./categories"
import { subcategoriesCheck } from "./subcategories"
import { regionsCheck } from "./regions"
import { condosCheck } from "./condos"
import { usersCheck } from "./users"
import { budgetCheck } from "./budget"

export const checkErrors = {
  login: loginCheck,
  categories: categoriesCheck,
  subcategories: subcategoriesCheck,
  regions: regionsCheck,
  condos: condosCheck,
  users: usersCheck,
  budget: budgetCheck,
}

export const getInvalidCheck = (actualState: TErrorsCheck, field: string) => {
  return {
    ...actualState,
    has: true,
    fields: [...actualState.fields, field],
  }
}
