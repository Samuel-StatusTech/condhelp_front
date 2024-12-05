import { TBudget } from "../../@types/data/budget"

import { FDcards } from "./cards"
import { FDmanagerBudgets } from "./managerBudgets"

// data

export const fdata: _TFalseData = {
  cards: FDcards,
  managerBudgets: FDmanagerBudgets,
}

type _TFalseData = {
  managerBudgets: TBudget[]

  // Cards
  cards: {
    approval: any[]
    goalsViews: any[]
    leaders: any[]
    goalsLights: any[]
    myTeam: any[]
    okr: any[]
    employeesRanking: any[]
    notifications: any[]
  }
}
