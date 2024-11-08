import { TExpertiseTime } from "../expertiseTime"
import { TInscription } from "../inscriptions"
import { TResponsable } from "./branchResponsable"
import { TDocument } from "./document"

export type TProfile = {
  admin: TProfileAdmin
  branch: TProfileBranch
  franchise: TProfileFranchise
  manager: TProfileManager
  provider: TProfileProvider
}

type TProfileAdmin = {
  document: TDocument["cpf"] | TDocument["cnpj"]
}

type TProfileBranch = {
  responsable: TResponsable
  document: TDocument["cpf"] | TDocument["cnpj"]
}

type TProfileFranchise = {
  responsable: TResponsable
}

type TProfileManager = {
  telephone: string
  phone: string
  document: TDocument["cpf"] | TDocument["cnpj"]
  expertiseTime: TExpertiseTime
  condominiums: string[]
}

type TProfileProvider = {
  social: string
  document: TDocument["cnpj"]
  cnpjFile: null | any
  inscriptions: TInscription
  categories: string[]
}
