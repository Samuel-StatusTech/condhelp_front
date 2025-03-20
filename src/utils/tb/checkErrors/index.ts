import { TErrorsCheck } from "../../@types/helpers/checkErrors"
import { loginCheck } from "./login"
import { categoriesCheck } from "./categories"
import { subcategoriesCheck } from "./subcategories"
import { regionsCheck } from "./regions"
import { condosCheck } from "./condos"
import { usersCheck } from "./users"
import { budgetCheck, budgetEditCheck } from "./budget"
import { documentationCheck } from "./documentation"
import { faqCheck } from "./faq"

export const checkErrors = {
  login: loginCheck,
  categories: categoriesCheck,
  subcategories: subcategoriesCheck,
  regions: regionsCheck,
  condos: condosCheck,
  users: usersCheck,
  budget: budgetCheck,
  budgetEdit: budgetEditCheck,
  documentation: documentationCheck,
  faq: faqCheck,
}

export const getInvalidCheck = (actualState: TErrorsCheck, field: string) => {
  return {
    ...actualState,
    has: true,
    fields: [...actualState.fields, field],
  }
}
