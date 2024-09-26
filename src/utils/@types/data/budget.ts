export type TBudget = {
  id: string
  condominium: string
  urgent: boolean
  category: string
  subcategory: string
  title: string
  description: string
  start: string
  end: string
  attached: Attached[]
}

export type TFranchiseBudget = TBudget & {
  franchise: string
}

type Attached = any
