import { TAccess } from "../access"

export type TNewSubCategory = {
  name: string
  serviceCategory: number

  isNew?: boolean

  franqId: number | null
  branchId: number | null
}

export type TSubCategory = {
  id: number
  name: string
  serviceCategory: {
    id: number
    name: string
    description: string
    userAccountId: number
    active: boolean
  }
  user: {
    userId: number
    name: string
    profile: TAccess
  }
  isNew?: boolean

  franqId: number | null
  branchId: number | null
}
