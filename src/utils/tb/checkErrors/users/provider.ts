import { getInvalidCheck } from ".."
import { TUProvider } from "../../../@types/data/_user/provider"
import { TNewUserDefault } from "../../../@types/data/user"
import { TErrorsCheck } from "../../../@types/helpers/checkErrors"
import { validEmail } from "../email"

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
    if (!data.email || !data.email?.trim() || !validEmail(data.email))
      state = getInvalidCheck(state, "email")
    if (data.phone1?.replace(/\D/g, "").length < 10)
      state = getInvalidCheck(state, "phone1")
    if (data.phone2 && data.phone2.replace(/\D/g, "").length < 10)
      state = getInvalidCheck(state, "phone2")
    if (data.phone3 && data.phone3.replace(/\D/g, "").length < 10)
      state = getInvalidCheck(state, "phone3")
    if (!data.franqId) state = getInvalidCheck(state, "franchise")
    if (!data.responsable?.trim()) state = getInvalidCheck(state, "responsable")
    if (!data.website?.trim()) state = getInvalidCheck(state, "website")
    if (data.document.register?.replace(/\D/g, "").length < 14)
      state = getInvalidCheck(state, "document.register")
    if (!data.document.date) state = getInvalidCheck(state, "document.date")
    if (
      !data.categories ||
      !Array.isArray(data.categories) ||
      (Array.isArray(data.categories) && data.categories.length === 0)
    )
      state = getInvalidCheck(state, "categories")

    if (data.address) {
      if (data.address.zipCode.replace(/\D/g, "").length < 8)
        state = getInvalidCheck(state, "address.zipCode")
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

    if (!data.federalCndFree) {
      if (!data.federalCnd?.trim()) state = getInvalidCheck(state, "federalCnd")
      if (!data.federalCndStart)
        state = getInvalidCheck(state, "federalCndStart")
      if (!data.federalCndEnd) state = getInvalidCheck(state, "federalCndEnd")
    }

    if (!data.stateCndFree) {
      if (!data.stateCnd?.trim()) state = getInvalidCheck(state, "stateCnd")
      if (!data.stateCndStart) state = getInvalidCheck(state, "stateCndStart")
      if (!data.stateCndEnd) state = getInvalidCheck(state, "stateCndEnd")
    }

    if (!data.cityCndFree) {
      if (!data.cityCnd?.trim()) state = getInvalidCheck(state, "cityCnd")
      if (!data.cityCndStart) state = getInvalidCheck(state, "cityCndStart")
      if (!data.cityCndEnd) state = getInvalidCheck(state, "cityCndEnd")
    }

    if (!data.fgtsCndFree) {
      if (!data.fgtsCnd?.trim()) state = getInvalidCheck(state, "fgtsCnd")
      if (!data.fgtsCndStart) state = getInvalidCheck(state, "fgtsCndStart")
      if (!data.fgtsCndEnd) state = getInvalidCheck(state, "fgtsCndEnd")
    }
  }

  changeState(state)
}
