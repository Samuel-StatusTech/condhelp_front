import { TNewUser, TUser } from "../../../../utils/@types/data/user"

export type TApi_Params_Persons = {
  persons: {
    listAll: {}
    create: {
      newPerson: TNewUser
    }
    update: {
      person: TUser
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
  }
}
