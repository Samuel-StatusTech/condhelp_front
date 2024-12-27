import { TProviderOnBudget } from "./_user/provider"
import { TCondominium } from "./condominium"
import { TBudgetStatus } from "./status"

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
  status: TBudgetStatus
  providerIds: number[]
  franqId: number
}

export type TBudget = {
  titulo: string
  nomeCondominio: string
  isUrgente: boolean
  nomeCategoria: string
  nomeSubcategoria: string
  descricao: string
  dataInicio: string
  dataFim: string
  urlAnexo: string
  prestadores: TProviderOnBudget[]
  franqId: number

  id: number
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
