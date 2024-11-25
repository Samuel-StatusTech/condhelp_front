import { TCategory } from "."
import { TCreator } from "../creator"

export type TNewSubCategory = {
  name: string
  serviceCategory: number
}

export type TSubCategory = {
  id: string
  name: string
  serviceCategory: TCategory
  creator: TCreator
}
