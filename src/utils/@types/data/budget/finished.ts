import { TBudgetStatus } from "../status"

export type TFinishedBudgets = {
  id: number
  title: string
  condominiumName: string
  endDate: string
  status: TBudgetStatus
}
