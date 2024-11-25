import { TErrorsCheck } from "../../@types/helpers/checkErrors"
import { loginCheck } from "./login"
import { categoriesCheck } from "./categories"
import { subcategoriesCheck } from "./subcategories"

export const checkErrors = {
  login: loginCheck,
  categories: categoriesCheck,
  subcategories: subcategoriesCheck,
}

export const getInvalidCheck = (actualState: TErrorsCheck, field: string) => {
  return {
    ...actualState,
    has: true,
    fields: [...actualState.fields, field],
  }
}
