import { getInvalidCheck } from ".."
import { TNewUserDefault, TUManager } from "../../../@types/data/user"
import { TErrorsCheck } from "../../../@types/helpers/checkErrors"

type Params = TNewUserDefault & TUManager

export const managerCheck = (
  data: Params,
  changeState: (newState: TErrorsCheck) => void
) => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.name.trim()) state = getInvalidCheck(state, "name")
  if (!data.surname.trim()) state = getInvalidCheck(state, "surname")
  if (!data.email.trim()) state = getInvalidCheck(state, "email")
  if (!data.phone1.trim()) state = getInvalidCheck(state, "phone1")
  if (!data.phone2.trim()) state = getInvalidCheck(state, "phone2")
  if (!data.document.register.trim())
    state = getInvalidCheck(state, "document.register")
  if (!data.document.date)
    state = getInvalidCheck(state, "document.date")

  changeState(state)
}
