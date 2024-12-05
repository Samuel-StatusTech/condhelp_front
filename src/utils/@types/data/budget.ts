import { TCondominium } from "./condominium"
import { TDefaultStatus } from "./status"

export type TNewBudget = {
  title: string
  description: string
  startDate: string
  finishDate: string
  attachedUrl: string
  urgent: boolean
  condominiumId: number
  serviceCategoryId: number
  serviceSubcategoryId: number
  userId: number
  status: string
  providerIds: number[]
  subsidiaryId: number
}

export type TBudget = {
  id: string
  title: string
  description: string
  startDate: string
  finishDate: string
  attachedUrl: string

  condominium: Partial<TCondominium>
  urgent: boolean
  category: string
  subcategory: string
  date: string
  status: TDefaultStatus
  file?: {
    url: string
    name: string
  }

  contacts: TContact[]
}

export type TContact = {
  id: number
  date: string
  monitor?: {
    id: string
    name: string
  }
  category: {
    id: number
    name: string
  }
  PRESTADOR: {
    id: string
    name: string
  }
}

export type TFranchiseBudget = TBudget & {
  FRANQUEADO: string
}
