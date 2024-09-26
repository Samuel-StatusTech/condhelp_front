import { TCondominiumAddress } from "../address"

export type TCondominium = {
  id: string
  base: {
    name: string
    units: number
    cnpj: string
    image: null | string
  }
  additional: {
    address: TCondominiumAddress
    manager: {
      id: string
      since: string
    }
  }
  electionFile: null | any
}
