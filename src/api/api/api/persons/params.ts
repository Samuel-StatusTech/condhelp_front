import { TAccess } from "../../../../utils/@types/data/access"
import { TNewUser, TUser } from "../../../../utils/@types/data/user"
import { TDefaultFilters } from "../../../types/params"

export type TApi_Params_Persons = {
  persons: {
    listAll: TDefaultFilters
    create: {
      newPerson: TNewUser
    }
    update: {
      person: TUser
    }
    delete: {
      person: TUser
    }
    getSingle: {
      id: number
      profile?: TAccess
    }
    getSelfData: {
      id: number
    }
    getByRole: {
      role: TAccess
    }
    getAllBranches: {}
  }
}
