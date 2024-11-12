import { TCreator } from "../creator"
import { TSubCategory } from "./subcategories"

export type TCategory = {
  id: string
  name: string
  creator: TCreator
  subcategories: Partial<TSubCategory>[]
}
