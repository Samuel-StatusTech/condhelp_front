import { getInvalidCheck } from ".."
import { TNewUserDefault, TUManager } from "../../../@types/data/user"
import { TErrorsCheck } from "../../../@types/helpers/checkErrors"
import { cnpjValidator } from "../../helpers/validatorCnpj"
import { cpfValidator } from "../../helpers/validatorCpf"
import { validEmail } from "../email"

type Params = (TNewUserDefault & TUManager) | null

export const managerCheck = (
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
    if (!data.franqId || Number(data.franqId) === 0)
      state = getInvalidCheck(state, "franqId")
    if (!data.email || !data.email?.trim() || !validEmail(data.email))
      state = getInvalidCheck(state, "email")
    if (data.phone1?.replace(/\D/g, "").length < 10)
      state = getInvalidCheck(state, "phone1")
    if (data.phone2 && data.phone2.replace(/\D/g, "").length < 10)
      state = getInvalidCheck(state, "phone2")
    if (!data.documentType?.trim())
      state = getInvalidCheck(state, "documentType")
    if (data.documentType === "cpf") {
      if (
        data.documentNumber?.replace(/\D/g, "").length < 11 ||
        !cpfValidator(data.documentNumber)
      )
        state = getInvalidCheck(state, "documentNumber")
    } else {
      if (
        data.documentNumber?.replace(/\D/g, "").length < 14 ||
        !cnpjValidator(data.documentNumber)
      )
        state = getInvalidCheck(state, "documentNumber")
    }
    if (!data.managerSince) state = getInvalidCheck(state, "managerSince")
    if (data.isUserTag && !data.tagId) state = getInvalidCheck(state, "tagId")
    if (!data.birthDate) state = getInvalidCheck(state, "birthDate")
  }

  changeState(state)
}
