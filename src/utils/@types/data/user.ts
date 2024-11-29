import { TDocument } from "./_user/document"
import { TAccess } from "./access"
import { TAddress } from "./address"
import { TCondominium } from "./condominium"
import { TExperience } from "./managerExperience"

type TUDefault = {
  id: number
  userId: number
  status: "ATIVO" | "INATIVO" | "AGUARDANDO"
  photo: null | string
}

export type TNewUserDefault = {
  userId: number
  status: "ATIVO" | "INATIVO" | "AGUARDANDO"
  photo: null | string
}

export type TUserTypes = {
  ADMIN: TUDefault & TUAdmin
  FILIAL: TUDefault & TUBranch
  FRANQUEADO: TUDefault & TUFranchise
  SINDICO: TUDefault & TUManager
  PRESTADOR: TUDefault & TUProvider
}

/*
 *  Type definition
 */

export type TUser = TUDefault &
  (TUAdmin | TUBranch | TUFranchise | TUProvider | TUManager)

export type TNewUser =
  | (TNewUserDefault & TUAdmin)
  | (TNewUserDefault & TUBranch)
  | (TNewUserDefault & TUFranchise)
  | (TNewUserDefault & TUManager)
  | (TNewUserDefault & TUProvider)

export type TUAdmin = {
  profile: "ADMIN"
  name: string
  surname: string
  email: string

  // Profile info
  document: TDocument["cpf"] | TDocument["cnpj"]
}

export type TUBranch = {
  profile: "FILIAL"
  name: string
  address: TAddress
  phone1: string
  phone2: string
  email: string

  // Responsable
  responsable: TResponsableTypes["cpf"] | TResponsableTypes["cnpj"]
}

type TResponsableTypes = {
  cpf: {
    type: "cpf"
    name: string
    register: string
  }
  cnpj: {
    type: "cnpj"
    name: string
    fantasyName: string
    register: string
    inscriptionState: string
    inscriptionCity: string
  }
}

export type TUFranchise = {
  profile: "FRANQUEADO"
  name: string
  address: TAddress

  phone1: string
  phone2: string
  email: string

  responsable: TResponsableTypes["cpf"] | TResponsableTypes["cnpj"]
}

export type TUProvider = {
  profile: "PRESTADOR"
  name: string
  franchises: string[]
  fantasyName: string
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
}

export type TPendency = "none" | "free" | "has"

export type TUManager = {
  profile: "SINDICO"
  name: string
  surname: string
  email: string

  // Profile info
  phone1: string
  phone2: string
  documentType: "cpf" | "cnpj"
  documentNumber: string
  
  birthDate: string | number
  
  managerSince: number
  experience?: TExperience

  condos: TCondominium[]
}

export type TUserStatus = "active" | "disabled" | "awaiting"

export type TUserProfile = TAccess

export const profileRelation: { [key in TUserProfile]: string } = {
  ADMIN: "Admin",
  FILIAL: "Filial",
  FRANQUEADO: "Franqueado",
  SINDICO: "Síndico",
  PRESTADOR: "Prestador",
  CONDOMINIO: "Condomínio",
  MATRIZ: "Matriz",
  MONITOR: "Monitor",
  USUARIO: "Usuário",
}
