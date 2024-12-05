import { TCondominium } from "./condominium"

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
}

export type TBudget = {
  id: string
  title: string
  condominiumName: string
  condominium?: TCondominium
  isUrgent: boolean
  categoryName: string
  subcategoryName: string
  description: string
  startDate: string
  endDate: string
  attachmentUrl: string
  awaiting: number
  rejected: number
  accepted: number
  status?: string

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
