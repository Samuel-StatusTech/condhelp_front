import { TProviderOnBudget } from "./_user/provider"
import { TCondominium } from "./condominium"
import { TBudgetStatus } from "./status"

export type TNewBudget = {
  title: string
  description: string
  startDate: string
  finishDate: string
  attachedUrl: string | null
  urgent: boolean
  condominiumId: number
  serviceCategoryId: number
  serviceSubcategoryId: number
  userId: number
  status: TBudgetStatus
  providerIds: number[]
  franqId: number
  branchId: number
}

export type TBudget = {
  id: number
  title: string
  condominiumName: string
  condominium?: TCondominium

  categoryName: string
  subcategoryName: string
  description: string
  startDate: string
  endDate: string

  condominiumId: number
  condominiumUnities: number
  condominiumCity: string
  condominiumState: string
  condominiumZipcode: string
  condominiumAddress: string
  condominiumCnpj: string
  condominiumManager: string
  phone: string
  neighborhood: string
  email: string
  isUrgent: boolean

  categoryId: number
  subcategoryId: number
  attachmentUrl: string
  status: TBudgetStatus
  statusProvider?: TBudgetStatus
  providers: TProviderOnBudget[]

  userId?: number
  contacts?: any[]
}

export type TBudgetResume = {
  id: number
  title: string
  condominiumName: string
  isUrgent: boolean
  categoryName: string
  subcategoryName: string
  description: string
  startDate: string | null
  endDate: string | null
  attachmentUrl: string
  awaiting: number
  rejected: number
  accepted: number
  status?: TBudgetStatus
}

export type TProviderBudgetResume = {
  id: number
  title: string
  condominiumCity: number
  condominiumState: number
  condominiumUnities: number
  condominiumName: string
  isUrgent: boolean
  categoryName: string
  subcategoryName: string
  description: string
  startDate: string | null
  endDate: string | null
  attachmentUrl: string
  awaiting: number
  rejected: number
  accepted: number
  status: TBudgetStatus
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
