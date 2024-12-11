import { TAddress } from "../address"
import { TDocument } from "./document"

export type TUProvider = {
  profile: "PRESTADOR"
  franqId: number
  name: string
  address: TAddress

  responsable: string
  website: string
  email: string
  phone1: string
  phone2: string
  phone3: string

  // Comercial info
  socialRole: string
  document: TDocument["cnpj"]
  cnpjCard: any
  category: string

  stateRegistration: string
  municipalRegistration: string

  // Documentation
  federalCnd: string
  federalCndStart: string
  federalCndEnd: string
  federalCndFree: boolean
  federalCndDocument: null | File

  stateCnd: string
  stateCndStart: string
  stateCndEnd: string
  stateCndFree: boolean
  stateCndDocument: null | File

  cityCnd: string
  cityCndStart: string
  cityCndEnd: string
  cityCndFree: boolean
  cityCndDocument: null | File

  fgtsCnd: string
  fgtsCndStart: string
  fgtsCndEnd: string
  fgtsCndFree: boolean
  fgtsCndDocument: null | File

  pendencies: {
    federalCnd: TPendency
    stateCnd: TPendency
    cityCnd: TPendency
    fgts: TPendency
  }

  openingDate?: any
}

export type T_Back_Provider = {
  id: number
  userId: number
  userAccountId: number
  photo: null
  profile: string
  birthDate: null
  name: string
  email: string

  contact: string
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
  budget: any
  franqId: number
  serviceCategories: {
    id: number
    name: string
    description: string
    userAccountId: number
    active: boolean
  }[]

  federalCnd: string
  federalCndStart: string | null
  federalCndEnd: string | null
  federalCndFree: boolean
  federalCndDocAttachment: any | null

  stateCnd: string
  stateCndStart: string | null
  stateCndEnd: string | null
  stateCndFree: boolean
  stateCndDocAttachment: any | null

  cityCnd: string
  cityCndStart: string | null
  cityCndEnd: string | null
  cityCndFree: boolean
  cityCndDocAttachment: any | null

  fgtsCnd: string
  fgtsCndStart: string | null
  fgtsCndEnd: string | null
  fgtsCndFree: boolean
  fgtsCndDocAttachment: any | null

  address: {
    id: number
    street: string
    number: number
    complement: string
    zipCode: string
    city: string
    state: string
    country: string
  }

  pendencies: {
    federalCnd: TPendency
    stateCnd: TPendency
    cityCnd: TPendency
    fgts: TPendency
  }
}

export type TPendency = "none" | "free" | "has"
