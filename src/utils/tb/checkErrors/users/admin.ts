import { getInvalidCheck } from ".."
import { TNewUserDefault, TUAdmin } from "../../../@types/data/user"
import { TErrorsCheck } from "../../../@types/helpers/checkErrors"
import { cpfValidator } from "../../helpers/validatorCpf"
import { validEmail } from "../email"

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
    if (!data.email || !data.email?.trim() || !validEmail(data.email))
      state = getInvalidCheck(state, "email")
    if (
      data.document.register?.replace(/\D/g, "").length < 11 ||
      !cpfValidator(data.document.register)
    )
      state = getInvalidCheck(state, "documentRegister")
    if (!data.document.date) state = getInvalidCheck(state, "documentDate")
  }

  changeState(state)
}
