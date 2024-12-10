import { TAddress } from "../address"
import { TResponsableTypes } from "../user"

export type TUBranch = {
  subsidiaryId: number
  userAccountId: number
  profile: "FILIAL"
  name: string
  address: TAddress
  addressId: number
  phone1: string
  phone2: string
  email: string

  // Responsable
  responsible: TResponsableTypes
  responsibleId: number
}
export type T_Back_Branch = {
  userAccountId: number
  subsidiaryId: number
  name: string
  email: string
  phone1: string
  phone2: string
  active: true
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
}
