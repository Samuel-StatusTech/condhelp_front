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
      originalPersonType: TAccess
    }
    delete: {
      person: TUser
    }
    getSingle: {
      id: number
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
