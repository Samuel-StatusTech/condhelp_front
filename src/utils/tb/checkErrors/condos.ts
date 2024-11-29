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
  if (
    !String(data.unities).trim() ||
    Number.isNaN(data.unities) ||
    (!Number.isNaN(data.unities) && Number(data.unities) < 1)
  )
    state = getInvalidCheck(state, "unities")
  if (!data.cnpj.trim()) state = getInvalidCheck(state, "cnpj")
  if (!data.address.trim()) state = getInvalidCheck(state, "address")

  if (
    !String(data.addressNumber).trim() ||
    Number.isNaN(data.addressNumber) ||
    (!Number.isNaN(data.addressNumber) && Number(data.addressNumber) < 1)
  )
    state = getInvalidCheck(state, "unities")
  if (!data.zipCode.trim() || data.zipCode.trim().replace(/\D/g, "").length < 8)
    state = getInvalidCheck(state, "zipCode")
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
