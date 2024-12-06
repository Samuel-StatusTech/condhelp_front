import { getInvalidCheck } from ".."
import { TNewUserDefault, TUProvider } from "../../../@types/data/user"
import { TErrorsCheck } from "../../../@types/helpers/checkErrors"

type Params = (TNewUserDefault & TUProvider) | null

export const providerCheck = (
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
    if (!data.franchise?.trim()) state = getInvalidCheck(state, "franchise")
    if (!data.responsable?.trim()) state = getInvalidCheck(state, "responsable")
    if (!data.website?.trim()) state = getInvalidCheck(state, "website")
    if (!data.document.register?.trim())
      state = getInvalidCheck(state, "document.register")
    if (!data.document.date) state = getInvalidCheck(state, "document.date")
    if (
      !data.category ||
      (!Number.isNaN(data.category) && +data.category === 0)
    )
      state = getInvalidCheck(state, "category")

    if (data.address) {
      if (data.address.cep.replace(/\D/g, "").length < 8)
        state = getInvalidCheck(state, "address.cep")
      if (!String(data.address.city).trim())
        state = getInvalidCheck(state, "address.city")
      if (!data.address.country)
        state = getInvalidCheck(state, "address.country")
      if (!data.address.state) state = getInvalidCheck(state, "address.state")
      if (!String(data.address.street).trim())
        state = getInvalidCheck(state, "address.street")
      if (!String(data.address.number).trim())
        state = getInvalidCheck(state, "address.number")
    }

    if (data.federalCndFree) {
      if (!data.federalCnd?.trim()) state = getInvalidCheck(state, "federalCnd")
      if (!data.federalCndStart)
        state = getInvalidCheck(state, "federalCndStart")
      if (!data.federalCndEnd) state = getInvalidCheck(state, "federalCndEnd")
    }

    if (data.stateCndFree) {
      if (!data.stateCnd?.trim()) state = getInvalidCheck(state, "stateCnd")
      if (!data.stateCndStart) state = getInvalidCheck(state, "stateCndStart")
      if (!data.stateCndEnd) state = getInvalidCheck(state, "stateCndEnd")
    }

    if (data.cityCndFree) {
      if (!data.cityCnd?.trim()) state = getInvalidCheck(state, "cityCnd")
      if (!data.cityCndStart) state = getInvalidCheck(state, "cityCndStart")
      if (!data.cityCndEnd) state = getInvalidCheck(state, "cityCndEnd")
    }

    if (data.fgtsCndFree) {
      if (!data.fgtsCnd?.trim()) state = getInvalidCheck(state, "fgtsCnd")
      if (!data.fgtsCndStart) state = getInvalidCheck(state, "fgtsCndStart")
      if (!data.fgtsCndEnd) state = getInvalidCheck(state, "fgtsCndEnd")
    }
  }

  changeState(state)
}
