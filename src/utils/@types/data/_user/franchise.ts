import { TAddress } from "../address"
import { TBackCity, TRegion } from "../region"
import { TResponsableTypes } from "../user"

export type TUFranchise = {
  branchId: number
  contato: string

  profile: "FRANQUEADO"
  name: string
  address: TAddress

  phone1: string
  phone2: string
  email: string

  // Responsable
  responsible: TResponsableTypes

  region: number
  cities: TRegion["cities"][] | number[]
}

export type T_Back_Franchise = {
  id: number
  nome: string
  contato: string
  userAccountId: number
  filialId: number
  countryId: number
  state: {
    id: number
    name: string
    initials: string
    country: {
      id: number
      name: string
    }
  }
  city: TBackCity
  address: string
  number: number
  complement: string
  postalCode: string
  phone1: string
  phone2: string
  email: string
  typePerson: string
  corporateName: string
  tradeName: string
  cnpj: string
  stateRegistration: string
  municipalRegistration: string
  firstName: string
  lastName: string
  cpf: string
  dateOfBirth: string
  regionId: number
  cityIds: number[]
}

// export type T_Back_Franchise = {
//   userAccountId: number
//   subsidiaryId: number
//   name: string
//   email: string
//   phone1: string
//   phone2: string
//   active: true
//   address: {
//     id: number
//     street: string
//     number: number
//     complement: string
//     zipCode: string
//     city: string
//     state: string
//     country: string
//   }
//   responsible: {
//     id: number
//     responsibleType: string
//     companyName: string
//     fantasyName: string
//     cnpj: string
//     stateRegistration: string
//     municipalRegistration: string
//     personName: string
//     cpf: string
//     responsibleStatus: string
//   }
// }
