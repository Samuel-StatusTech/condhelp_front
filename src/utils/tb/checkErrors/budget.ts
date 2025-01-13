import { getInvalidCheck } from "."
import { TNewBudget } from "../../@types/data/budget"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = TNewBudget

export const budgetCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.condominiumId) state = getInvalidCheck(state, "condominium")
  if (!data.serviceCategoryId)
    state = getInvalidCheck(state, "serviceCategoryId")
  if (!data.serviceSubcategoryId)
    state = getInvalidCheck(state, "serviceSubcategoryId")
  if (!(data.title ?? (data as any).titulo).trim())
    state = getInvalidCheck(state, "title")
  if (!data.description.trim()) state = getInvalidCheck(state, "description")
  if (!data.startDate) state = getInvalidCheck(state, "startDate")
  if (!data.finishDate) state = getInvalidCheck(state, "finishDate")

  if (!data.startDate) state = getInvalidCheck(state, "startDate")
  if (!data.finishDate) state = getInvalidCheck(state, "finishDate")

  // photo
  // file

  return state
}

export const budgetEditCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!(data.title ?? (data as any).titulo).trim())
    state = getInvalidCheck(state, "title")
  if (!data.description.trim()) state = getInvalidCheck(state, "description")
  if (!data.finishDate) state = getInvalidCheck(state, "finishDate")

  // photo
  // file

  return state
}
