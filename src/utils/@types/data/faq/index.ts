export type TFaq = {
  id: string
  title: string
  profiles: string[]
  questions: TQuestion[]
}

type TQuestion = {
  asking: string
  answer: string
}
