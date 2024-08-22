import { TGoalQuestion } from "../initials/forms/goal"

export const generateQuestion = (): TGoalQuestion => {
  const obj: TGoalQuestion = {
    answerType: "text",
    title: "",
    obligate: false,
  }

  return obj
}
