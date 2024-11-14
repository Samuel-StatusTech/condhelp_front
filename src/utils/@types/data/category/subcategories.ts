import { TCategory } from "."
import { TCreator } from "../creator"

export type TNewSubCategory = {
  name: string
  parent: string
}

export type TSubCategory = {
  id: string
  name: string
  parent: Partial<TCategory>
  creator: TCreator
}
