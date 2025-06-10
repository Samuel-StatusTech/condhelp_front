export type TBudgetStatistics = {
  total: number
  awaiting?: number
  completed: number
  inProgress: number
  canceled: number
  recused: number
  awaitingPercentage?: number
  completedPercentage: number
  inProgressPercentage: number
  canceledPercentage: number
  recusedPercentage: number
}
