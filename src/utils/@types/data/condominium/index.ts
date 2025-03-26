import { TUserTypes } from "../user"

export type TNewCondominium = {
  name: string
  unities: number
  cnpj: string
  photo: null | string

  address: string
  addressNumber: string
  zipCode: string
  neighborhood: string
  city: string
  federateUnit: string
  subsidiaryId?: number
  manager: TUserTypes["SINDICO"]
  managerId?: number

  electionDate: string | number | Date

  electionFile: null | string
}

export type TCondominium = {
  id: number
  name: string
  unities: number
  cnpj: string
  photo: null | string

  address: string
  addressNumber: string
  zipCode: string
  neighborhood: string
  city: string
  federateUnit: string
  subsidiaryId?: number
  manager: TUserTypes["SINDICO"]

  electionDate: string | number | Date

  electionFile: null | string

  branchId: number
  franchiseId: number
}
