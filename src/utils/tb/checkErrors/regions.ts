import { getInvalidCheck } from "."
import { TNewRegion } from "../../@types/data/region"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = TNewRegion

export const regionsCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.name.trim()) state = getInvalidCheck(state, "name")
  if (!String(data.countryId).trim())
    state = getInvalidCheck(state, "countryId")
  if (!String(data.stateId).trim()) state = getInvalidCheck(state, "stateId")

  return state
}
