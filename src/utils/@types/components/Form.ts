import { FormField } from "./FormFields"

export type TForm = {
  handleField: (field: string, value: any) => void
  handleCancel: (params?: any) => void
  handleSave: (form: any) => Promise<void>
  handleDelete?: () => Promise<void>
  insertQuestion?: (newField: any) => void
  removeQuestion?: (key: number) => void
  duplicateQuestion?: (key: number) => void
  handleQuestion?: (questionKey: number, field: string, value: any) => void
  blocks: TBlock[]
}

type TContent = FormField | FormField[]

type TBlock = {
  title: string
  groups: TGroup[]
}

type TGroup = {
  fields: TContent[]
  list?: TList
  hasFieldControl?: boolean
}

type TList = {
  title: string
  items: any[]
}
