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

  if (data.serviceCategory === 0)
    state = getInvalidCheck(state, "serviceCategory")

  if (!data.name.trim()) state = getInvalidCheck(state, "name")

  return state
}
