import { getInvalidCheck } from "."
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = {
  email: string
  pass: string
}

export const loginCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.email.trim()) state = getInvalidCheck(state, "email")
  if (!data.pass.trim()) state = getInvalidCheck(state, "pass")

  return state
}
