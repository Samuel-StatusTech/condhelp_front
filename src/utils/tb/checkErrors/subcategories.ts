import { getInvalidCheck } from "."
import {
  TNewSubCategory,
  TSubCategory,
} from "../../@types/data/category/subcategories"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = TNewSubCategory | TSubCategory

export const subcategoriesCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (
    !String(data.serviceCategory).trim() &&
    !String((data as TSubCategory).serviceCategory.id).trim()
  )
    state = getInvalidCheck(state, "serviceCategory")
  if (!data.name.trim()) state = getInvalidCheck(state, "name")

  return state
}
