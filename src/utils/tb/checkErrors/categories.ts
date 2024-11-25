import { getInvalidCheck } from "."
import { TNewCategory } from "../../@types/data/category"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = TNewCategory

export const categoriesCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.name.trim()) state = getInvalidCheck(state, "name")

  return state
}
