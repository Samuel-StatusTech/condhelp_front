import { memo } from "react"
import BreadcrumbPageHeader from "./types/breadcrumb"
import TablePageHeader from "./types/table"

type TFrom = "people" | "goals" | "companies" | "departments" | "newsboard"

type Props =
  | {
      type: "table"
      from: TFrom
      action: (p?: any) => void
    }
  | {
      type: "breadcrumb"
      from: TFrom | "banner"
    }

const PageHeader = (p: Props) => {
  const Element = () => {
    switch (p.type) {
      case "table":
        return <TablePageHeader from={p.from} action={p.action} />
      case "breadcrumb":
        return <BreadcrumbPageHeader from={p.from} />
      default:
        return null
    }
  }

  return <Element />
}

export default memo(PageHeader)
