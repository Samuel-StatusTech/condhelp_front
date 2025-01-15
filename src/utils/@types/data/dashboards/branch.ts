export type TDashboardBranch = {
  totalCondominiums: number
  totalProviders: number
  totalManagers: number
  totalBudgets: number
  totalFranchises: number
  totalBranches: number
  totalRegions: number
  totalFaqs: number
  totalCategories: number
  totalSubCategories: number
  totalBudgetsInProgress: number
  totalBudgetsCancelled: number
  totalBudgetsCompleted: number
  totalBudgetsInProgressPercentage: number
  totalBudgetsCancelledPercentage: number
  totalBudgetsCompletedPercentage: number

  providerPercentage?: {
    totalProvideActive: number
    totalProvideInative: number
    totalProvideCancelled: number
    totalProvideActivePercentage: number
    totalProvideInativePercentage: number
    totalProvideCancelledPercentage: number
  }
}
