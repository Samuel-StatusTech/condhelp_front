import { TCategory } from "."
import { TCreator } from "../creator"

export type TNewSubCategory = {
  name: string
  serviceCategory: number

  isNew?: boolean
}

export type TSubCategory = {
  id: number
  name: string
  serviceCategory: TCategory
  creator: TCreator

  isNew?: boolean
}
