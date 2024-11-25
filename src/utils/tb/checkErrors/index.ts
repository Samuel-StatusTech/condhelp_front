import { TErrorsCheck } from "../../@types/helpers/checkErrors"
import { loginCheck } from "./login"
import { categoriesCheck } from "./categories"
import { subcategoriesCheck } from "./subcategories"
import { regionsCheck } from "./regions"

export const checkErrors = {
  login: loginCheck,
  categories: categoriesCheck,
  subcategories: subcategoriesCheck,
  regions: regionsCheck,
}

export const getInvalidCheck = (actualState: TErrorsCheck, field: string) => {
  return {
    ...actualState,
    has: true,
    fields: [...actualState.fields, field],
  }
}
