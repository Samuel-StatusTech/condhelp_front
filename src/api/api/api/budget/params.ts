import {
  TBudget,
  TNewBudget,
  TProviderBudgetResume,
} from "../../../../utils/@types/data/budget"
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
    getByStatus: TDefaultFilters & {
      providerId: number
      status: TProviderBudgetResume["status"]
    }
    interact: {
      budgetId: number
      providerId: number
      status: string
    }
    statistics: {
      providerId: number
    }
    finished: {
      manager: {
        id: number
      }
    }
  }
}
