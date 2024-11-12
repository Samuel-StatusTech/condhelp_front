import { TOption } from "../../../components/Input/points"

export type TFilter = {
  label: string
  name: string
  options: TOption[]
  value: string
  byKey?: boolean
}
