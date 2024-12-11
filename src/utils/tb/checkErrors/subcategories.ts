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

  if ((data as TNewSubCategory).serviceCategory) {
    if (
      !String((data as TNewSubCategory).serviceCategory).trim() &&
      !String((data as TNewSubCategory).serviceCategory).trim()
    )
      state = getInvalidCheck(state, "serviceCategory")
  }

  if (!data.name.trim()) state = getInvalidCheck(state, "name")

  return state
}
