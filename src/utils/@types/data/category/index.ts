import { TCreator } from "../creator"
import { TSubCategory } from "./subcategories"

export type TNewCategory = {
  name: string
  description: string
  subcategories: Partial<TSubCategory>[]
}

export type TCategory = {
  id: number
  name: string
  description: string
  creator: TCreator
  subcategories: Partial<TSubCategory>[]
}
