import { getInvalidCheck } from "."
import { TNewFaq } from "../../@types/data/faq"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = TNewFaq

export const faqCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (data.accessProfiles.length === 0)
    state = getInvalidCheck(state, "accessProfiles")
  if (!data.title.trim()) state = getInvalidCheck(state, "title")
  if (data.items.length === 0) state = getInvalidCheck(state, "items")

  return state
}
