import { TAccess } from "../access"

export type TNewSubCategory = {
  name: string
  serviceCategory: number

  isNew?: boolean
}

export type TSubCategory = {
  id: number
  name: string
  category: {
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
}
