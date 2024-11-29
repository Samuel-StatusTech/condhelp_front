import { TUserTypes } from "../user"

export type TNewCondominium = {
  name: string
  unities: number
  cnpj: string
  image: null | string

  
  address: string
  addressNumber: string
  zipCode: string
  neighborhood: string
  city: string
  federateUnit: string
  subsidiaryId?: number
  manager: TUserTypes["SINDICO"]
  managerId?: number

  electionFile: null | any
}

export type TCondominium = {
  id: number
  name: string
  unities: number
  cnpj: string
  image: null | string

  
  address: string
  addressNumber: string
  zipCode: string
  neighborhood: string
  city: string
  federateUnit: string
  subsidiaryId?: number
  manager: TUserTypes["SINDICO"]

  electionFile: null | any
}
