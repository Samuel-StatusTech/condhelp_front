import { getInvalidCheck } from "."
import { TCondominium, TNewCondominium } from "../../@types/data/condominium"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = TNewCondominium | TCondominium

export const condosCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.name.trim()) state = getInvalidCheck(state, "name")
  if (!String(Number(data.unities)).trim())
    state = getInvalidCheck(state, "units")
  if (!data.cnpj.trim()) state = getInvalidCheck(state, "cnpj")
  if (!data.address.trim()) state = getInvalidCheck(state, "address")
  if (!data.addressNumber.trim()) state = getInvalidCheck(state, "addressNumber")
  if (!data.zipCode.trim()) state = getInvalidCheck(state, "zipCode")
  if (!data.neighborhood.trim()) state = getInvalidCheck(state, "neighborhood")
  if (!data.city.trim()) state = getInvalidCheck(state, "city")
  if (!data.federateUnit.trim()) state = getInvalidCheck(state, "federateUnit")
  if (
    !String(data.manager.userId).trim() ||
    Number.isNaN(data.manager.userId) ||
    (!Number.isNaN(data.manager.userId) && Number(data.manager.userId) < 1)
  )
    state = getInvalidCheck(state, "manager")
  if (!data.manager.managerSince) state = getInvalidCheck(state, "managerSince")

  // photo
  // file

  return state
}
