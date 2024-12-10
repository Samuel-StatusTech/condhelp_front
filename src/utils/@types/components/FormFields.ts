import { TInputDate } from "../../../components/Input/date"
import { TInputDefault } from "../../../components/Input/default"
import { TInputFile } from "../../../components/Input/file"
import { TInputImage } from "../../../components/Input/image"
import { TInputLogo } from "../../../components/Input/logo"
import { TInputMultiple } from "../../../components/Input/multiple"
import { TInputPoint } from "../../../components/Input/points"
import { TInputRadio } from "../../../components/Input/radio"
import { TReadonlyField } from "../../../components/Input/readonly"
import { TInputSelect as TSelect } from "../../../components/Input/select"
import { TCityInput } from "../../../components/Input/cityInput"
import { TInputTextArea } from "../../../components/Input/textarea"
import { TInputToggler } from "../../../components/Input/toggler"

type IDate = { type: "date" } & TInputDate
type IFile = { type: "file" } & TInputFile
type IDefault = { type: "input" } & TInputDefault
type IImage = { type: "image" } & TInputImage
type IMultiple = { type: "multiple" } & TInputMultiple
type ILogo = { type: "logo" } & TInputLogo
type IPoints = { type: "points" } & TInputPoint
type IProfile = { type: "profile" } & TInputImage
type IRadio = { type: "radio" } & TInputRadio
type IReadonly = { type: "readonly" } & TReadonlyField
type ICityInput = { type: "cityInput" } & TCityInput
type ISelect = { type: "select"; multiple?: boolean } & TSelect
type ITextArea = { type: "textarea" } & TInputTextArea
type IToggler = { type: "toggler" } & TInputToggler

export type FormField = (
  | IFile
  | IDate
  | IDefault
  | IImage
  | ILogo
  | IMultiple
  | IProfile
  | IPoints
  | IRadio
  | IReadonly
  | ICityInput
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
