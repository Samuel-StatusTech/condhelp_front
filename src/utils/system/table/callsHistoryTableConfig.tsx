import { TConfig } from "."

import TableActions from "../../../components/TableActions"
import { getDateStr } from "../../tb/format/date"
import { TCall } from "../../@types/data/call"

export const callsTableConfig: TConfig = {
  columns: [
    { title: "Nº", field: "budgetId" },
    { title: "Abertura", field: "openedAt" },
    { title: "Categoria", field: "category" },
    { title: "Título", field: "title" },
    { title: "Condomínio", field: "condo" },
    { title: "Fechado", field: "closedAt" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    openedAt: (item: TCall) => getDateStr(item.opendAt, "dmy"),
    category: (item: TCall) => item.categoryName ?? "",
    title: (item: TCall) => item.budgetTitle ?? "",
    condo: (item: TCall) => item.condominiumName,
    closedAt: (item: TCall) => getDateStr(item.closedAt, "dmy"),

    actions: (item: TCall, { callbacks }) => (
      <TableActions
        id={item as any}
        content={[
          {
            role: "seeMore",
            type: "textonly",
            action: callbacks?.seeMore as (id: string | number) => void | any,
          },
        ]}
      />
    ),
  },
}
