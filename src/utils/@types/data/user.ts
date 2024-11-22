import { TDocument } from "./_user/document"
import { TAddress } from "./address"
import { TCondominium } from "./condominium"
import { TExperience } from "./managerExperience"

type TUDefault = {
  id: string
  active: boolean
  image: null | string
}

export type TNewUserDefault = {
  active: boolean
  image: null | string
}

export type TUserTypes = {
  admin: TUDefault & TUAdmin
  branch: TUDefault & TUBranch
  franchise: TUDefault & TUFranchise
  manager: TUDefault & TUManager
  provider: TUDefault & TUProvider
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
  profile: "admin"
  active: boolean
  name: string
  surname: string
  email: string

  // Profile info
  document: TDocument["cpf"] | TDocument["cnpj"]
}

export type TUBranch = {
  profile: "branch"
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
  profile: "franchise"
  name: string
  address: TAddress

  phone1: string
  phone2: string
  email: string

  responsable: TResponsableTypes["cpf"] | TResponsableTypes["cnpj"]
}

export type TUProvider = {
  profile: "provider"
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
  profile: "manager"
  active: boolean
  name: string
  surname: string
  email: string

  // Profile info
  phone1: string
  phone2: string
  document: TDocument["cpf"] | TDocument["cnpj"]
  since: string
  experience: TExperience

  condos: TCondominium[]
}

export type TUserStatus = "active" | "disabled" | "awaiting"

export type TUserProfile =
  | "admin"
  | "franchise"
  | "branch"
  | "provider"
  | "manager"

export const profileRelation: { [key in TUserProfile]: string } = {
  admin: "Admin",
  franchise: "Franqueado",
  branch: "Filial",
  provider: "Provedor",
  manager: "Síndico",
}
