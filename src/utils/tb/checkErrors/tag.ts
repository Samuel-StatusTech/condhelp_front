import { getInvalidCheck } from "."
import { TNewTag } from "../../@types/data/tag"
import { TErrorsCheck } from "../../@types/helpers/checkErrors"

type Params = TNewTag

export const tagCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (!data.name.trim()) state = getInvalidCheck(state, "name")
  if (!data.type.trim()) state = getInvalidCheck(state, "type")

  return state
}
