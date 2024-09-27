import { PGoalViewItem } from "./GoalViewItem"

export type PCard = {
  k: number
  title: string
  actions?: any
} & CardsProps

type CardsProps = CApproval | CGoals

// Cards

type CApproval = {
  type: "approvalResume"
  data: {
    approved: number
    awaiting: number
    rejected: number
  }
}

type CGoals = {
  type: "goalsViews"
  data: PGoalViewItem[]
}
