export const goalForm = {
  active: false,
  name: "",
  target: "all",
  mustApprove: true,
  points: 5,
  questions: [] as TGoalQuestion[],
  obligate: false,
}

type TGoalQuestion =
  | ({ title: string } & TQText)
  | ({ title: string } & TQDate)
  | ({ title: string } & TQCheckbox)
  | ({ title: string } & TQMultiple)

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
  answerType: "checkbox"
  options: TQOption[]
}

type TQOption = {
  title: string
}
