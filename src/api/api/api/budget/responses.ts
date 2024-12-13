import {
  TBudget,
  TBudgetResume,
  TProviderBudgetResume,
} from "../../../../utils/@types/data/budget"
import { TBudgetStatistics } from "../../../../utils/@types/data/budgetResume"
import { TDefaultList, TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Budgets = {
  budgets: {
    listAll: Promise<TDefaultRes<TDefaultList<TBudgetResume>>>
    listProviderBudgets: Promise<
      TDefaultRes<TDefaultList<TProviderBudgetResume>>
    >
    getByStatus: Promise<TDefaultRes<TDefaultList<TProviderBudgetResume>>>
    create: Promise<TDefaultRes<TBudget>>
    getSingle: Promise<TDefaultRes<TBudget>>
    update: Promise<TDefaultRes<TBudget>>
    delete: Promise<TDefaultRes<{}>>
    interact: Promise<TDefaultRes<{}>>
    statistics: Promise<TDefaultRes<TBudgetStatistics>>
  }
}
