import { FormField } from "./FormFields"

export type TForm = {
  handleField: (field: string, value: any) => void
  handleCancel: (params?: any) => void
  handleSave: (form: any) => Promise<void>
  handleDelete?: () => Promise<void>
  blocks: TBlock[]
}

type TContent = FormField | FormField[]

type TBlock = {
  title: string
  groups: TGroup[]
}

type TGroup =
  | {
      type: "custom"
      element: JSX.Element
      title?: string
    }
  | {
      type: "fields"
      title?: string
      fields: TContent[]
      hasFieldControl?: boolean
    }
