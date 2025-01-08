import { TUBranch } from "./_user/branch"
import { TDocument } from "./_user/document"
import { TUFranchise } from "./_user/franchise"
import { TUProvider } from "./_user/provider"
import { TAccess } from "./access"
import { TCondominium } from "./condominium"
import { TExperience } from "./managerExperience"

export type TUDefault = {
  id: number
  userAccountId: number
  userId: number
  status: "ATIVO" | "INATIVO" | "AGUARDANDO"
  photo: null | string
  branchId: number | null
  franchiseId: number | null
}

export type TNewUserDefault = {
  id: number
  userId: number
  status: "ATIVO" | "INATIVO" | "AGUARDANDO"
  email: string
  photo: null | string
  branchId: number | null
  franchiseId: number | null
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

export type TResponsableTypes = {
  id?: number
  responsibleType: "CNPJ" | "CPF"
  companyName: string
  fantasyName: string
  cnpj: string
  stateRegistration: string
  municipalRegistration: string
  personName: string
  cpf: string
  responsibleStatus?: string
}

export type TPendency = "none" | "free" | "has"

export type TUManager = {
  franqId: number
  managerId: number
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

  managerSince: TExperience

  condominiums: TCondominium[]
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
