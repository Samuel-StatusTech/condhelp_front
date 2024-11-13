import { TUser } from "../../@types/data/user"
import { TCondominium } from "../../@types/data/condominium"
import { TCategory } from "../../@types/data/category"
import { TSubCategory } from "../../@types/data/category/subcategories"
import { TRegion } from "../../@types/data/region"
import { TErrand } from "../../@types/data/errand"
import { TFaq } from "../../@types/data/faq"
import { TBudget } from "../../@types/data/budget"

import { FDcards } from "./cards"
import { FDpeople } from "./people"
import { FDcondos } from "./condos"
import { FDcategories } from "./categories"
import { FDsubcategories } from "./subcategories"
import { FDregions } from "./regions"
import { FDerrands } from "./errands"
import { FDfaqs } from "./faqs"
import { FDmanagerBudgets } from "./managerBudgets"

// data

export const fdata: _TFalseData = {
  cards: FDcards,
  people: FDpeople,
  condos: FDcondos,
  categories: FDcategories,
  subcategories: FDsubcategories,
  regions: FDregions,
  errands: FDerrands,
  faqs: FDfaqs,
  managerBudgets: FDmanagerBudgets,
}

type _TFalseData = {
  people: TUser[]
  condos: TCondominium[]
  categories: TCategory[]
  subcategories: TSubCategory[]
  regions: TRegion[]
  errands: TErrand[]
  faqs: TFaq[]
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
