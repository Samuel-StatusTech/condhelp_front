import { TAccess } from "../../../../utils/@types/data/access"
import { TNewUser, TUser } from "../../../../utils/@types/data/user"

export type TApi_Params_Persons = {
  persons: {
    listAll: {}
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
