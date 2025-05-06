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
  | "tags"
  | "faqView"
  | "panelBudget"
  | "panelProvider"
  | "franchiseCities"
  | "documents"
  | "myaccount"
  | "monitoring"

export type TBreadCrumFrom = THeaderFrom

type Props =
  | {
      type: "table"
      from: THeaderFrom
      action?: (p?: any) => void
      extra?: any
    }
  | {
      type: "breadcrumb"
      from: TBreadCrumFrom
      forForm?: boolean
      noBack?: boolean
      action?: (p?: any) => void
      extra?: any
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
            noBack={p.noBack}
            handleAction={p.action}
            extra={p.extra}
          />
        )
      default:
        return null
    }
  }

  return <Element />
}

export default memo(PageHeader)
