import { TBudget, TNewBudget } from "../../../../utils/@types/data/budget"
import { TDefaultFilters } from "../../../types/params"

export type TApi_Params_Budgets = {
  budgets: {
    listAll: TDefaultFilters & {
      managerId?: number
      condominiumId?: number
      branchId?: number
      providerId?: number
    }
    listProviderBudgets: TDefaultFilters & {
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
    interact: {
      budgetId: number
      providerId: number
      status: "ACEITO" | "RECUSADO" | "CANCELADO"
    }
    statistics: {
      providerId: number
    }
  }
}
