import { TAddress } from "../address"
import { TRegion } from "../region"
import { TResponsableTypes } from "../user"

export type TUFranchise = {
  contato: string

  profile: "FRANQUEADO"
  name: string
  address: TAddress & {
    cityId?: number
  }

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
  address: TAddress & {
    city: {
      id: number
      name: string
    }
    cityId?: number
  }
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
