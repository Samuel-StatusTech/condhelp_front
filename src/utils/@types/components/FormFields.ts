import { TInputDate } from "../../../components/Input/date"
import { TInputDefault } from "../../../components/Input/default"
import { TInputImageProfile } from "../../../components/Input/image"
import { TInputPoint } from "../../../components/Input/points"
import { TInputSelect } from "../../../components/Input/select"
import { TInputTextArea } from "../../../components/Input/textarea"
import { TInputToggler } from "../../../components/Input/toggler"
import { TGoalQuestion } from "../../initials/forms/goal"

type IDate = { type: "date" } & TInputDate
type IDefault = { type: "input" } & TInputDefault
type IImage = { type: "image" } & TInputImageProfile
type IPoints = { type: "points" } & TInputPoint
type IProfile = { type: "profile" } & TInputImageProfile
type IQuestion = { type: "question" } & TGoalQuestion
type ISelect = { type: "select"; multiple?: boolean } & TInputSelect
type ITextArea = { type: "textarea" } & TInputTextArea
type IToggler = { type: "toggler" } & TInputToggler

export type FormField =
  | IDate
  | IDefault
  | IImage
  | IProfile
  | IPoints
  | IQuestion
  | ISelect
  | ITextArea
  | IToggler
