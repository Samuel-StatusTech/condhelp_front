export type TMonitorItemDetails = {
  budgetId: number
  condominiumName: string
  condominiumUnities: number
  budgetTitle: string
  budgetDescription: string
  categoryName: string
  subCategoryName: string
  openingDate: string
  isUrgent: boolean
  performedContacts: TMonitorContactResume[]

  providerId: number

  providers: [
    {
      id: number
      name: string
      contact: string
      email: string
      site: string
      logoUrl: string
      phone1: string
      phone2: string
      phone3: string
      companyName: string
      cnpj: string
      cardCnpjUrl: string | null
      openingDate: string
      stateRegistration: string
      municipalRegistration: string
      responsibleName: string
      status: string
      userAccountId: number
      franqId: number
      subsidiaries: null
      address: null
      serviceCategories: null
      federalCnd: string
      federalCndStart: string | null
      federalCndEnd: string | null
      federalCndFree: true
      federalCndDocAttachment: string | null
      stateCnd: string
      stateCndStart: string | null
      stateCndEnd: string | null
      stateCndFree: true
      stateCndDocAttachment: string | null
      cityCnd: string
      cityCndStart: string | null
      cityCndEnd: string | null
      cityCndFree: true
      cityCndDocAttachment: string | null
      fgtsCnd: string
      fgtsCndStart: string | null
      fgtsCndEnd: string | null
      fgtsCndFree: true
      fgtsCndDocAttachment: string | null
      createdAt: string
      updatedAt: string
    }
  ]
  attachmentUrl?: string | null
}

export type TMonitorContactResume = {
  idRegister: number
  openingDate: string
  providerName: string
  categoryName: string
  description: string
}

export type TMonitorContact = {
  id: number
  description: string
  franqId: number
  branchId: number
  providerId: number
  budgetId: number
  providerName: string
  createdAt: string
  updatedAt: string
}

export type TMonitorCardStatus =
  | "RED_BUTTON_ENABLED"
  | "RED_BUTTON_DISABLED"
  | "PURPLE_BUTTON_ENABLED"
  | "PURPLE_BUTTON_DISABLED"
  | "GREEN_BUTTON_ENABLED"
  | "GREEN_BUTTON_DISABLED"
  | "BLUE_BUTTON_ENABLED"
  | "BLUE_BUTTON_DISABLED"

export type TMonitorItem = {
  budgetId: number
  condominiumName: string
  budgetTitle: string
  budgetDescription: string
  categoryName: string
  openingDate: string
  statusCard: TMonitorCardStatus
  isUrgent?: boolean
  subcategoryName?: string
}

export type TMonitor = {
  openRequests: TMonitorItem[]
  inService: TMonitorItem[]
}
