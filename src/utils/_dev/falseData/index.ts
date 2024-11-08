import { TUser } from "../../@types/data/user"
import { TGoal } from "../../@types/data/goal"
import { TCompany } from "../../@types/data/company"
import { TDepartment } from "../../@types/data/department"
import { TNewsData } from "../../@types/data/newsData"

import { FDcards } from "./cards"
import { FDpeople } from "./people"

// data

export const fdata: _TFalseData = {
  people: FDpeople,
  cards: FDcards,
} as any

type _TFalseData = {
  people: TUser[]
  goals: TGoal[]
  companies: TCompany[]
  departments: TDepartment[]
  newsboard: TNewsData[]
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
  googleAgenda: any[]
}
