import { TCert } from "./certificate"
import { TDocument } from "./document"

// export type TUser = { id: string } & TUInfo

export type TUser = {
  id: string
  name: string
  email: string
  image?: string
} & TUData

type TUData = UAdmin | UBranch | UFranchise | UManager | UProvider

type UAdmin = {
  role: "admin"
  data: UDAdmin
}

type UDAdmin = {
  // base: TBase["admin"]
  document: TDocument["cpf"] | TDocument["cnpj"]
}

type UBranch = {
  role: "branch"
  // base: TBase["branch"]
  // profile: TProfile["branch"]
}

type UFranchise = {
  role: "franchise"
  // base: TBase["franchise"]
  // profile: TProfile["franchise"]
  cities: {
    regions: {
      id: string
      name: string
      cities: {
        id: string
        name: string
      }[]
    }
  }
}

type UManager = {
  role: "manager"
  // base: TBase["manager"]
  // profile: TProfile["manager"]
}

type UProvider = {
  role: "provider"
  // base: TBase["provider"]
  // profile: TProfile["provider"]
  certs: TCert[]
}
