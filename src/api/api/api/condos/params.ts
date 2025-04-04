import {
  TCondominium,
  TNewCondominium,
} from "../../../../utils/@types/data/condominium"
import { TDefaultFilters } from "../../../types/params"

export type TApi_Params_Condos = {
  condos: {
    listAll: TDefaultFilters
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
    getWaitingList: {}
    reject: {
      id: number
      rejectionReason: string
    }
    approve: {
      id: number
    }
  }
}
