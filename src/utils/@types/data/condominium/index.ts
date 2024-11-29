import { TCondominiumAddress } from "../address"
import { TUserTypes } from "../user"

export type TNewCondominium = {
  name: string
  units: number
  cnpj: string
  image: null | string

  address: TCondominiumAddress
  manager: {
    id: string
    managerSince: string
  }

  electionFile: null | any
}

export type TCondominium = {
  id: string
  name: string
  units: number
  cnpj: string
  image: null | string

  address: TCondominiumAddress
  manager: TUserTypes["SINDICO"]

  electionFile: null | any
}
