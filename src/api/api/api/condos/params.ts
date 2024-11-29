import { TCondominium, TNewCondominium } from "../../../../utils/@types/data/condominium"

export type TApi_Params_Condos = {
  condos: {
    listAll: {}
    create: {
      newCondo: TNewCondominium
    }
    update: {
      condo: TCondominium
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
  }
}
