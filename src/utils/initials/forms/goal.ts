export const goalForm = {
  active: false,
  name: "",
  target: "all",
  mustApprove: "true",
  points: "5",
  questions: [] as TGoalQuestion[],
}

export type TGoalQuestion =
  | ({ title: string; obligate: boolean } & TQText)
  | ({ title: string; obligate: boolean } & TQDate)
  | ({ title: string; obligate: boolean } & TQCheckbox)
  | ({ title: string; obligate: boolean } & TQMultiple)

type TQText = {
  title: string
  answerType: "text"
}

type TQDate = {
  title: string
  answerType: "date"
}

type TQCheckbox = {
  title: string
  answerType: "checkbox"
  options: TQOption[]
}

type TQMultiple = {
  title: string
  answerType: "multiple"
  options: TQOption[]
}

export type TQOption = {
  checked: boolean
  title: string
}
