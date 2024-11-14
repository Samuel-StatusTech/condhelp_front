import { memo } from "react"
import BreadcrumbPageHeader from "./types/breadcrumb"
import TablePageHeader from "./types/table"

export type THeaderFrom =
  | "users"
  | "condos"
  | "categories"
  | "subcategories"
  | "regions"
  | "errands"
  | "faqs"

export type TBreadCrumFrom = THeaderFrom

type Props =
  | {
      type: "table"
      from: THeaderFrom
      action: (p?: any) => void
    }
  | {
      type: "breadcrumb"
      from: TBreadCrumFrom
      forForm?: boolean
      action?: (p?: any) => void
    }

const PageHeader = (p: Props) => {
  const Element = () => {
    switch (p.type) {
      case "table":
        return <TablePageHeader from={p.from} action={p.action} />
      case "breadcrumb":
        return (
          <BreadcrumbPageHeader
            from={p.from}
            forForm={p.forForm}
            handleAction={p.action}
          />
        )
      default:
        return null
    }
  }

  return <Element />
}

export default memo(PageHeader)
