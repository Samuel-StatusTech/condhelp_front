import { getInvalidCheck } from ".."
import { TNewUserDefault, TUBranch } from "../../../@types/data/user"
import { TErrorsCheck } from "../../../@types/helpers/checkErrors"

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
    if (!data.email?.trim()) state = getInvalidCheck(state, "email")
    if (!data.phone1?.trim()) state = getInvalidCheck(state, "phone1")
    if (!data.phone2?.trim()) state = getInvalidCheck(state, "phone2")
    if (!data.address.cep?.trim()) state = getInvalidCheck(state, "address.cep")
    if (!data.address.city?.trim())
      state = getInvalidCheck(state, "address.city")
    if (!data.address.country?.trim())
      state = getInvalidCheck(state, "address.country")
    if (!data.address.state?.trim())
      state = getInvalidCheck(state, "address.state")
    if (!data.address.street?.trim())
      state = getInvalidCheck(state, "address.street")

    if (data.responsible.responsibleType === "CPF") {
      if (!data.responsible.cpf?.trim())
        state = getInvalidCheck(state, "responsible.cpf")
      if (!data.responsible.personName?.trim())
        state = getInvalidCheck(state, "responsible.personName")
    } else if (data.responsible.responsibleType === "CNPJ") {
      if (!data.responsible.cnpj?.trim())
        state = getInvalidCheck(state, "responsible.cnpj")
      if (!data.responsible.fantasyName?.trim())
        state = getInvalidCheck(state, "responsible.fantasyName")
      if (!data.responsible.companyName?.trim())
        state = getInvalidCheck(state, "responsible.companyName")
      if (!data.responsible.municipalRegistration?.trim())
        state = getInvalidCheck(state, "responsible.municipalRegistration")
      if (!data.responsible.stateRegistration?.trim())
        state = getInvalidCheck(state, "responsible.stateRegistration")
    }
  }

  changeState(state)
}
