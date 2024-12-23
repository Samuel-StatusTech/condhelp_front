import { getInvalidCheck } from ".."
import { TUBranch } from "../../../@types/data/_user/branch"
import { TNewUserDefault } from "../../../@types/data/user"
import { TErrorsCheck } from "../../../@types/helpers/checkErrors"
import { validEmail } from "../email"

type Params = (TNewUserDefault & TUBranch) | null

export const branchCheck = (
  data: Params,
  changeState: (newState: TErrorsCheck) => void
) => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (data) {
    if (!data.name?.trim()) state = getInvalidCheck(state, "name")
    if (!data.email || !data.email?.trim() || !validEmail(data.email))
      state = getInvalidCheck(state, "email")
    if (data.phone1.replace(/\D/g, "").length < 10)
      state = getInvalidCheck(state, "phone1")

    if (data.address.cep.replace(/\D/g, "").length < 8)
      state = getInvalidCheck(state, "address.cep")
    if (!String(data.address.city).trim())
      state = getInvalidCheck(state, "address.city")
    if (!data.address.country) state = getInvalidCheck(state, "address.country")
    if (!data.address.state) state = getInvalidCheck(state, "address.state")
    if (!String(data.address.street).trim())
      state = getInvalidCheck(state, "address.street")
    if (!String(data.address.number).trim())
      state = getInvalidCheck(state, "address.number")

    if (data.responsible.responsibleType === "CPF") {
      if (data.responsible.cpf.replace(/\D/g, "").length < 11)
        state = getInvalidCheck(state, "responsible.cpf")
      if (!data.responsible.personName?.trim())
        state = getInvalidCheck(state, "responsible.personName")
    } else if (data.responsible.responsibleType === "CNPJ") {
      if (data.responsible.cnpj.replace(/\D/g, "").length < 14)
        state = getInvalidCheck(state, "responsible.cnpj")
      if (!data.responsible.fantasyName?.trim())
        state = getInvalidCheck(state, "responsible.fantasyName")
      if (!data.responsible.companyName?.trim())
        state = getInvalidCheck(state, "responsible.companyName")
    }
  }

  changeState(state)
}
