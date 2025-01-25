import { TAccess } from "../../../../utils/@types/data/access"
import { TNewUser, TUser } from "../../../../utils/@types/data/user"
import { TDefaultFilters } from "../../../types/params"

export type TApi_Params_Persons = {
  persons: {
    listAll: TDefaultFilters & {
      actives?: string
    }
    create: {
      newPerson: TNewUser
    }
    update: {
      person: TUser
    }
    inactivate: {
      id: number
    }
    delete: {
      person: {
        profile: TAccess
        id: number
      }
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
      actives?: string
    }
    getAllBranches: {}

    getBranchUsers: TDefaultFilters & {
      profile?: string
      actives?: string
    }
    getFranchiseUsers: TDefaultFilters & {
      actives?: string
    }
  }
}
