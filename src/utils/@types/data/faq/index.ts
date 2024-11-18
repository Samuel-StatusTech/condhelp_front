import { TAccess } from "../access"

export type TNewFaq = {
  title: string
  profile: TAccess[]
  questions: TQuestion[]
}

export type TFaq = {
  id: string
  title: string
  profile: TAccess[]
  questions: TQuestion[]
}

type TQuestion = {
  id: number
  asking: string
  answer: string
}
