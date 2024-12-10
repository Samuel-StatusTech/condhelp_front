import { TAddress } from "../address"
import { TDocument } from "./document"

export type TUProvider = {
  profile: "PRESTADOR"
  franchise: string
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
  subsidiaries: T_Back_ProviderSubsidiary[]
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

type T_Back_ProviderSubsidiary = {
  id: number
  name: string
  phone1: string
  phone2: string
  active: true
  providers: string[]
  condominiums: [
    {
      id: number
      name: string
      unities: number
      cnpj: string
      photoPath: string
      minutesElectionPath: string
      address: string
      addressNumber: number
      zipCode: string
      neighborhood: string
      city: string
      federateUnit: string
      manager: {
        id: number
        userId: number
        photo: string
        name: string
        email: string
        profile: string
        status: string
        birthDate: string
        surname: string
        phone1: string
        phone2: string
        documentType: string
        documentNumber: string
        managerSince: number
        condominiums: string[]
      }
      electionDate: string
    }
  ]
  budgets: string[]
  franqueados: {
    id: number
    nome: string
    contato: string
    userAccountId: number
    subsidiary: string
  }[]
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
  responsible: {
    id: number
    responsibleType: string
    companyName: string
    fantasyName: string
    cnpj: string
    stateRegistration: string
    municipalRegistration: string
    personName: string
    cpf: string
    responsibleStatus: string
  }
  userAccount: {
    id: number
    userId: number
    photo: string
    name: string
    email: string
    profile: string
    status: string
    birthDate: string
  }
}
