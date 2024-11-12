import { userTableConfig } from "./userTableConfig"
import { condoTableConfig } from "./condoTableConfig"
import { categoryTableConfig } from "./categoryTableConfig"
import { subcategoryTableConfig } from "./subcategoryTableConfig"
import { regionTableConfig } from "./regionTableConfig"
import { errandTableConfig } from "./errandTableConfig"
import { faqTableConfig } from "./faqTableConfig"

type TTableConfigs =
  | "users"
  | "condos"
  | "categories"
  | "subcategories"
  | "regions"
  | "errands"
  | "faqs"

export const tableConfig: {
  [key in TTableConfigs]: TConfig
} = {
  users: userTableConfig,
  condos: condoTableConfig,
  categories: categoryTableConfig,
  subcategories: subcategoryTableConfig,
  regions: regionTableConfig,
  errands: errandTableConfig,
  faqs: faqTableConfig,
}

type TColumn = {
  title: string
  field: string
  size?: string | number
  align?: "left" | "center" | "right"
  width?: string
}

export type TConfig = {
  columns: TColumn[]
  specialFields: {
    [key: string]: (
      item: any,
      props: {
        // eslint-disable-next-line no-empty-pattern
        data?: {
          [key: string]: string | number
        }
        callbacks?: {
          [key: string]: (...props: any) => void
        }
      }
    ) => any
  }
  isExpandable?: boolean
}
