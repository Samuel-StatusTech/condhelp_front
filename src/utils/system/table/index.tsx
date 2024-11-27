import { userTableConfig } from "./userTableConfig"
import { condoTableConfig } from "./condoTableConfig"
import { categoryTableConfig } from "./categoryTableConfig"
import { subcategoryTableConfig } from "./subcategoryTableConfig"
import { regionTableConfig } from "./regionTableConfig"
import { errandTableConfig } from "./errandTableConfig"
import { faqTableConfig } from "./faqTableConfig"
import { finishedBudgetsTableConfig } from "./finishedBudgetsTableConfig"
import { callsTableConfig } from "./callsHistoryTableConfig"

type TTableConfigs =
  | "users"
  | "condos"
  | "categories"
  | "subcategories"
  | "regions"
  | "errands"
  | "faqs"
  | "finishedBudgets"
  | "calls"

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
  finishedBudgets: finishedBudgetsTableConfig,
  calls: callsTableConfig,
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
          [key: string]: any
        }
        callbacks?: {
          [key: string]: (...props: any) => void
        }
      }
    ) => any
  }
  isExpandable?: boolean
}
