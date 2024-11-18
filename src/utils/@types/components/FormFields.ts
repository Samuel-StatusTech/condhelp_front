import { TInputDate } from "../../../components/Input/date"
import { TInputDefault } from "../../../components/Input/default"
import { TInputImage } from "../../../components/Input/image"
import { TInputMultiple } from "../../../components/Input/multiple"
import { TInputPoint } from "../../../components/Input/points"
import { TInputSelect } from "../../../components/Input/select"
import { TInputTextArea } from "../../../components/Input/textarea"
import { TInputToggler } from "../../../components/Input/toggler"

type IDate = { type: "date" } & TInputDate
type IDefault = { type: "input" } & TInputDefault
type IImage = { type: "image" } & TInputImage
type IPoints = { type: "points" } & TInputPoint
type IProfile = { type: "profile" } & TInputImage
type IMultiple = { type: "multiple" } & TInputMultiple
type ISelect = { type: "select"; multiple?: boolean } & TInputSelect
type ITextArea = { type: "textarea" } & TInputTextArea
type IToggler = { type: "toggler" } & TInputToggler

export type FormField = (
  | IDate
  | IDefault
  | IImage
  | IMultiple
  | IProfile
  | IPoints
  | ISelect
  | ITextArea
  | IToggler
) & {
  gridSizes?: {
    big: number
    small?: number
  }
  alignBottom?: boolean
}
