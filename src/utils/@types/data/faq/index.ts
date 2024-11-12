import { TAccess } from "../access"

export type TFaq = {
  id: string
  title: string
  profile: TAccess
  questions: TQuestion[]
}

type TQuestion = {
  id: number
  asking: string
  answer: string
}
