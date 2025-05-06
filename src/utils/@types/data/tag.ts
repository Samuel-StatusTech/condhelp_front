import { TAccess } from "./access"

export type TTag = {
  id: number
  name: string
  type: TAccess
}

export type TNewTag = {
  name: string
  type: TAccess
}
