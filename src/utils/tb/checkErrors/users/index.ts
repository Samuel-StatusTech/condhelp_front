import { TNewUser, TUser } from "../../../@types/data/user"
import { TErrorsCheck } from "../../../@types/helpers/checkErrors"
import { adminCheck } from "./admin"
import { branchCheck } from "./branch"
import { managerCheck } from "./manager"

export type Params = TNewUser | TUser

export const usersCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  switch (data.profile) {
    case "ADMIN":
      adminCheck(data, (newState: TErrorsCheck) => {
        state = newState
      })
      break
    case "FILIAL":
      branchCheck(data, (newState: TErrorsCheck) => {
        state = newState
      })
      break
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
