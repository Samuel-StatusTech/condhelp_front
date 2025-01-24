import { getInvalidCheck } from ".."
import { TUFranchise } from "../../../@types/data/_user/franchise"
import { TNewUserDefault } from "../../../@types/data/user"
import { TErrorsCheck } from "../../../@types/helpers/checkErrors"
import { cnpjValidator } from "../../helpers/validatorCnpj"
import { cpfValidator } from "../../helpers/validatorCpf"
import { validEmail } from "../email"

type Params = (TNewUserDefault & TUFranchise) | null

export const franchiseCheck = (
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
    if (data.phone1?.replace(/\D/g, "").length < 10)
      state = getInvalidCheck(state, "phone1")
    if (!!data.phone2 && data.phone2.replace(/\D/g, "").length < 10)
      state = getInvalidCheck(state, "phone2")
    if (!data.branchId) state = getInvalidCheck(state, "branchId")
    if (!data.region) state = getInvalidCheck(state, "region")

    if (data.address.zipCode.replace(/\D/g, "").length < 8)
      state = getInvalidCheck(state, "zipCode")
    if (!String(data.address.city).trim())
      state = getInvalidCheck(state, "city")
    if (!data.address.country) {
      state = getInvalidCheck(state, "country")
    }
    if (!data.address.state) state = getInvalidCheck(state, "state")
    if (!String(data.address.street).trim())
      state = getInvalidCheck(state, "street")
    if (!String(data.address.number).trim())
      state = getInvalidCheck(state, "number")

    if (data.responsible) {
      if (data.responsible.responsibleType === "CPF") {
        if (
          data.responsible.cpf.replace(/\D/g, "").length < 11 ||
          !cpfValidator(data.responsible.cpf)
        )
          state = getInvalidCheck(state, "responsableCpf")
        if (!data.responsible.personName?.trim())
          state = getInvalidCheck(state, "responsablePersonName")
      } else if (data.responsible.responsibleType === "CNPJ") {
        if (
          data.responsible.cnpj.replace(/\D/g, "").length < 14 ||
          !cnpjValidator(data.responsible.cnpj)
        )
          state = getInvalidCheck(state, "responsableCnpj")
        if (!data.responsible.fantasyName?.trim())
          state = getInvalidCheck(state, "responsableFantasyName")
        if (!data.responsible.companyName?.trim())
          state = getInvalidCheck(state, "responsableCompanyName")
      }
    }
  }

  changeState(state)
}
