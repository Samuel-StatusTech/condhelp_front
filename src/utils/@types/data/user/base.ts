import { TAccess } from "../access"
import { TAddress } from "../address"

// Base Infos
export type TBase = {
  admin: TBaseDefault
  branch: TBaseBranch
  franchise: TBaseFranchise
  manager: TBaseManager
  provider: TBaseProvider
}

export type TBaseDefault = {
  access: TAccess
  active: boolean
  email: string
}

type TBaseBranch = {
  access: TAccess
  active: boolean
  branchName: string
  address: TAddress
  telephone: string
  phone: string
  email: string
}

type TBaseFranchise = {
  access: TAccess
  active: boolean
  branch: string
  name: string
  address: TAddress
  telephone: string
  phone: string
  email: string
}

type TBaseManager = TBaseDefault & {
  name: string
  surname: string
  profileImage: null | string
}

type TBaseProvider = TBaseDefault & {
  identity: {
    logo: null | string
    name: string
  }
  address: TAddress
  responsable: string
  website: string
  telephone: string
  email: string
}
