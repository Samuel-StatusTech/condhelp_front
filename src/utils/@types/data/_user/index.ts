import { TDocument } from "./document"

export type TUser = {
  id: string
  name: string
  email: string
  image?: string
} & TUData

type TUData = UAdmin

type UAdmin = {
  role: "admin"
  data: UDAdmin
}

type UDAdmin = {
  // base: TBase["admin"]
  document: TDocument["cpf"] | TDocument["cnpj"]
}
