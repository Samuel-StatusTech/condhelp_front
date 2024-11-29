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
  if (!String(Number(data.units)).trim())
    state = getInvalidCheck(state, "units")
  if (!data.cnpj.trim()) state = getInvalidCheck(state, "cnpj")
  if (Object.values(data.address).some((v) => !v.trim()))
    state = getInvalidCheck(state, "address")
  if (
    !String(data.manager.id).trim() ||
    Number.isNaN(data.manager.id) ||
    (!Number.isNaN(data.manager.id) && Number(data.manager.id) < 1)
  )
    state = getInvalidCheck(state, "manager")
  if (!data.manager.managerSince) state = getInvalidCheck(state, "managerSince")

  // photo
  // file

  return state
}
