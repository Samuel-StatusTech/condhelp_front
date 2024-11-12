import { TCondominiumAddress } from "../address"
import { TUser } from "../user"

export type TCondominium = {
  id: string
  name: string
  units: number
  cnpj: string
  image: null | string

  address: TCondominiumAddress
  manager: TUser & {
    since: string
  }

  electionFile: null | any
}
