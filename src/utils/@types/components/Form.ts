import { FormField } from "./FormFields"

export type TForm = {
  handleField: (field: string, value: any) => void
  handleCancel: (params?: any) => void
  handleSave: (form: any) => Promise<void>
  handleDelete?: () => Promise<void>
  columns: TColumn[]
}

type TColumn = {
  blocks: TBlock[]
}

type TContent = FormField | FormField[]

export type TBlock = {
  title: string
  isWhite?: boolean
  groups: TGroup[]
}

export type TGroup =
  | {
      type: "custom"
      element: JSX.Element
      title?: string
      smallTitle?: boolean
      centeredLines?: number[]
    }
  | {
      type: "fields"
      title?: string
      smallTitle?: boolean
      fields: TContent[]
      hasFieldControl?: boolean
      centeredLines?: number[]
    }
