import { TUser } from "../../@types/data/_user"
import { TGoal } from "../../@types/data/goal"
import { TCompany } from "../../@types/data/company"
import { TDepartment } from "../../@types/data/department"
import { TNewsData } from "../../@types/data/newsData"

import { FDcards } from "./cards"
import { FDggagenda } from "./googleAgenda"
import { FDgoals } from "./goals"
import { FDpeople } from "./people"
import { FDcompanies } from "./company"
import { FDdepartments } from "./departments"
import { FDnewsboard } from "./newsboard"
import { FDbanner } from "./banner"
import { TBanner } from "../../@types/data/banner"

// data

export const fdata: _TFalseData = {
  goals: FDgoals,
  people: FDpeople,
  cards: FDcards,
  googleAgenda: FDggagenda,
  companies: FDcompanies,
  departments: FDdepartments,
  newsboard: FDnewsboard,
  banner: FDbanner,
} as any

type _TFalseData = {
  people: TUser[]
  goals: TGoal[]
  companies: TCompany[]
  departments: TDepartment[]
  newsboard: TNewsData[]
  banner: TBanner
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
