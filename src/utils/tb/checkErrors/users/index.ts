import { TNewUser, TUser } from "../../../@types/data/user"
import { TErrorsCheck } from "../../../@types/helpers/checkErrors"
import { managerCheck } from "./manager"

export type Params = TNewUser | TUser

export const usersCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  switch (data.profile) {
    case "SINDICO":
      managerCheck(data, (newState: TErrorsCheck) => {
        state = newState
      })
      break

    default:
      break
  }

  return state
}
