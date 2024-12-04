import { TCreator } from "../creator"
import { TSubCategory } from "./subcategories"

export type TNewCategory = {
  active: boolean
  name: string
  description: string
  serviceSubcategories: TSubCategory[]
}

export type TCategory = {
  id: number
  active: boolean
  name: string
  description: string
  userAccountId: number
  creator: TCreator
  serviceSubcategories: TSubCategory[]
}
