import { PGraph } from "../../../components/Card/variations/LeaderDetails"
import { PEmployee } from "./Employee"
import { PGoalViewItem } from "./GoalViewItem"
import { PGoogleItem } from "./GoogleItem"
import { PLeaderItem } from "./LeaderItem"
import { PLighterItem } from "./LighterItem"
import { POkr } from "./Okr"
import { PTeamMember } from "./Team"

export type PCard = {
  k: number
  title: string
  actions?: any
} & CardsProps

type CardsProps =
  | CApproval
  | CGoals
  | CEmployees
  | CNotifications
  | CLeaders
  | CLeaderDetails
  | CLeaderOverview
  | CLights
  | CMemberDetails
  | COKR
  | CGoalsViews
  | CGoogle
  | CTeam
  | CStatus

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

type CEmployees = {
  type: "employees"
  data: PEmployee[]
}
type CNotifications = {
  type: "notifications"
  data: any
}
type CLeaders = {
  type: "leaders"
  data: PLeaderItem[]
}
type CLeaderDetails = {
  type: "leaderDetails"
  data: {
    leader: PLeaderItem
    graphs: PGraph[]
  }
}
type CLeaderOverview = {
  type: "leaderOverview"
  data: any
}
type CLights = {
  type: "lights"
  data: PLighterItem[]
}
type CMemberDetails = {
  type: "memberDetails"
  data: {
    leader: PLeaderItem
    graphs: PGraph[]
  }
}
type COKR = {
  type: "okr"
  data: POkr[]
}
type CGoalsViews = {
  type: "goalsViews"
  data: any
}
type CGoogle = {
  type: "google"
  data: PGoogleItem["data"][]
}
type CTeam = {
  type: "team"
  data: PTeamMember["data"][]
}
type CStatus = {
  type: "status"
  data: any
}
