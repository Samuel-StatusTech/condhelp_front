import { TDefaultFilters } from "../../../types/params"

export type TApi_Params_Monitoring = {
  monitoring: {
    getList: {}
    getSingle: {
      id: number
    }
    attendSingle: {
      id: number
    }
    closeRequest: {
      id: number
    }
    registerRequest: {
      budgetId: number
      providerId: number
      providerName: string
      description: string
    }
    callsHistory: TDefaultFilters
  }
}
