import { TAccess } from "../access"
import { TSubCategory } from "./subcategories"

export type TNewCategory = {
  active: boolean
  name: string
  description: string
  serviceSubcategories: TSubCategory[]
  franqId: number | null
  branchId: number | null
}

export type TCategory = {
  id: number
  active: boolean
  name: string
  description: string
  userAccountId: number
  user: {
    id: number
    userId: number
    profile: TAccess
    name: string
  }
  serviceSubcategories: TSubCategory[]
  franqId: number | null
  branchId: number | null
}
