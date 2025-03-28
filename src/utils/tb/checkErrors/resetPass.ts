import { getInvalidCheck } from "."
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = {
  newPass1: string
  newPass2: string
}

export const resetPassCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.newPass1.trim()) state = getInvalidCheck(state, "newPass1")
  if (!data.newPass2.trim()) state = getInvalidCheck(state, "newPass2")

  if (data.newPass1 !== data.newPass2) {
    state = getInvalidCheck(state, "newPass1")
    state = getInvalidCheck(state, "newPass2")
  }

  return state
}
