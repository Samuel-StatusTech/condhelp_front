import { TNewUser, TUser } from "../../../@types/data/user"
import { TErrorsCheck } from "../../../@types/helpers/checkErrors"
import { adminCheck } from "./admin"
import { branchCheck } from "./branch"
import { franchiseCheck } from "./franchise"
import { managerCheck } from "./manager"
import { providerCheck } from "./provider"

export type Params = TNewUser | TUser

export const usersCheck = (data: Params): TErrorsCheck => {
  let state: TErrorsCheck = {
    has: false,
    fields: [],
  }

  if (data) {
    switch (data.profile) {
      case "ADMIN":
        adminCheck(data as any, (newState: TErrorsCheck) => {
          state = newState
        })
        break
      case "REDE":
        branchCheck(data as any, (newState: TErrorsCheck) => {
          state = newState
        })
        break
      case "FRANQUEADO":
        franchiseCheck(data as any, (newState: TErrorsCheck) => {
          state = newState
        })
        break
      case "SINDICO":
        managerCheck(data as any, (newState: TErrorsCheck) => {
          state = newState
        })
        break
      case "PRESTADOR":
        providerCheck(data as any, (newState: TErrorsCheck) => {
          state = newState
        })
        break
    }
  }

  return state
}
