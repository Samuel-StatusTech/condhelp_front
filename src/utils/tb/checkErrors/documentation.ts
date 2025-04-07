import { getInvalidCheck } from "."
import { TUserTypes } from "../../@types/data/user"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = Partial<TUserTypes["PRESTADOR"]>

export const documentationCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (data) {
    if (!data.federalCndFree) {
      if (!data.federalCnd?.trim()) state = getInvalidCheck(state, "federalCnd")
      if (!data.federalCndStart)
        state = getInvalidCheck(state, "federalCndStart")
      if (!data.federalCndEnd) state = getInvalidCheck(state, "federalCndEnd")
      if (!data.federalCndDocument)
        state = getInvalidCheck(state, "federalCndDocument")
    }

    if (!data.stateCndFree) {
      if (!data.stateCnd?.trim()) state = getInvalidCheck(state, "stateCnd")
      if (!data.stateCndStart) state = getInvalidCheck(state, "stateCndStart")
      if (!data.stateCndEnd) state = getInvalidCheck(state, "stateCndEnd")
      if (!data.stateCndDocument)
        state = getInvalidCheck(state, "stateCndDocument")
    }

    if (!data.cityCndFree) {
      if (!data.cityCnd?.trim()) state = getInvalidCheck(state, "cityCnd")
      if (!data.cityCndStart) state = getInvalidCheck(state, "cityCndStart")
      if (!data.cityCndEnd) state = getInvalidCheck(state, "cityCndEnd")
      if (!data.cityCndDocument)
        state = getInvalidCheck(state, "cityCndDocument")
    }

    if (!data.fgtsCndFree) {
      if (!data.fgtsCnd?.trim()) state = getInvalidCheck(state, "fgtsCnd")
      if (!data.fgtsCndStart) state = getInvalidCheck(state, "fgtsCndStart")
      if (!data.fgtsCndEnd) state = getInvalidCheck(state, "fgtsCndEnd")
      if (!data.fgtsCndDocument)
        state = getInvalidCheck(state, "fgtsCndDocument")
    }
  }

  return state
}
