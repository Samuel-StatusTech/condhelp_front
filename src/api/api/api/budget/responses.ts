import {
  TBudget,
  TBudgetResume,
  TProviderBudgetResume,
} from "../../../../utils/@types/data/budget"
import { TDefaultList, TDefaultRes } from "../../../types/responses"

export type TApi_Responses_Budgets = {
  budgets: {
    listAll: Promise<TDefaultRes<TDefaultList<TBudgetResume>>>
    listProviderBudgets: Promise<
      TDefaultRes<TDefaultList<TProviderBudgetResume>>
    >
    create: Promise<TDefaultRes<TBudget>>
    getSingle: Promise<TDefaultRes<TBudget>>
    update: Promise<TDefaultRes<TBudget>>
    delete: Promise<TDefaultRes<{}>>
    interact: Promise<TDefaultRes<{}>>
  }
}
