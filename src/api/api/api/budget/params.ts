import { TBudget, TNewBudget } from "../../../../utils/@types/data/budget"
import { TBudgetStatus } from "../../../../utils/@types/data/status"
import { TDefaultFilters } from "../../../types/params"

export type TApi_Params_Budgets = {
  budgets: {
    listAll: TDefaultFilters & {
      managerId?: number
      condominiumId?: number
      branchId?: number
      franqId?: number
      providerId?: number
      actives?: any
      status?: any
    }
    listBranchBudgets: TDefaultFilters & { franchise?: number }
    listFranchiseBudgets: TDefaultFilters
    listManagerBudgets: TDefaultFilters & {
      managerId?: number
      condominiumId?: number
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
    finish: {
      id: number
    }
    delete: {
      id: number
    }
    getSingle: {
      id: number
    }
    getByStatus: TDefaultFilters & {
      status: "inprogress" | "finished" | "awaiting"
    }
    interact: {
      budgetId: number
      providerId: number
      status: TBudgetStatus
    }
    statistics: {
      providerId: number
    }
    cancelBudget: {
      budgetId: number
    }
    contract: {
      budgetId: number
      providerId: number
    }
    finished: {
      franchise: TDefaultFilters
      manager: TDefaultFilters & {
        id: number
      }
      provider: TDefaultFilters & {
        id: number
      }
    }
  }
}
