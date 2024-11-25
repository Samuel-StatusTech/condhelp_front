import { TCondominium } from "./condominium"
import { TDefaultStatus } from "./status"
import { TUserTypes } from "./user"

export type TNewBudget = {
  franchise?: string
  condominium: string
  urgent: boolean
  category: string
  subcategory: string
  title: string
  description: string
  start: string
  end: string
  attached: TUserTypes["provider"][]
  file?: File
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
  attached: TUserTypes["provider"][]
  file?: {
    url: string
    name: string
  }

  contacts: TContact[]
}

export type TContact = {
  id: number
  date: string
  category: {
    id: number
    name: string
  }
  provider: {
    id: string
    name: string
  }
}

export type TFranchiseBudget = TBudget & {
  franchise: string
}
