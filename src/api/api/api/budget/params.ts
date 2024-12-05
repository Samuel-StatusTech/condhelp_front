import { TBudget, TNewBudget } from "../../../../utils/@types/data/budget"

export type TApi_Params_Budgets = {
  budgets: {
    listAll: {
      managerId?: number
      condominiumId?: number
      branchId?: number
      providerId?: number
    }
    create: {
      newBudget: TNewBudget
    }
    update: {
      budget: TBudget
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
  }
}
