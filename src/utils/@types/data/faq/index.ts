import { TAccess } from "../access"

export type TNewFaq = {
  title: string
  accessProfiles: TAccess[]
  items: TQuestion[]
}

export type TFaq = {
  id: number
  title: string
  accessProfiles: TAccess[]
  items: TQuestion[]
}

type TQuestion = {
  id: number
  question: string
  answer: string
}
