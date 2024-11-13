import { TCondominium } from "./condominium"
import { TDefaultStatus } from "./status"

export type TNewBudget = {
  condominium: string
  urgent: boolean
  category: string
  subcategory: string
  title: string
  description: string
  start: string
  end: string
  attached: Attached[]
}

export type TBudget = {
  id: string
  condominium: Partial<TCondominium>
  urgent: boolean
  category: string
  subcategory: string
  title: string
  description: string
  start: string
  end: string
  date: string
  status: TDefaultStatus
  attached: Attached[]
}

export type TFranchiseBudget = TBudget & {
  franchise: string
}

type Attached = any
