import { getInvalidCheck } from ".."
import { TNewUserDefault, TUAdmin } from "../../../@types/data/user"
import { TErrorsCheck } from "../../../@types/helpers/checkErrors"

type Params = (TNewUserDefault & TUAdmin) | null

export const adminCheck = (
  data: Params,
  changeState: (newState: TErrorsCheck) => void
) => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (data) {
    if (!data.name?.trim()) state = getInvalidCheck(state, "name")
    if (!data.surname?.trim()) state = getInvalidCheck(state, "surname")
    if (!data.email?.trim()) state = getInvalidCheck(state, "email")
    if (!data.document.register?.trim())
      state = getInvalidCheck(state, "document.register")
    if (!data.document.date)
      state = getInvalidCheck(state, "document.date")
  }

  changeState(state)
}
