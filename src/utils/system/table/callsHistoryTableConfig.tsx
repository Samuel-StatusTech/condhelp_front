import { TConfig } from "."

import TableActions from "../../../components/TableActions"
import { getDateStr } from "../../tb/format/date"
import { TCall } from "../../@types/data/call"
import { TCategory } from "../../@types/data/category"

export const callsTableConfig: TConfig = {
  columns: [
    { title: "Nº", field: "id" },
    { title: "Abertura", field: "openedAt" },
    { title: "Categoria", field: "category" },
    { title: "Título", field: "title" },
    { title: "Condomínio", field: "condo" },
    { title: "Fechado", field: "closedAt" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    openedAt: (item: TCall) => getDateStr(item.openedAt, "dmy"),
    category: (item: TCall, { data }) =>
      (data?.categories as TCategory[]).find((c) => c.id === item.categoryId)
        ?.name ?? "Não relacionado",
    condo: (item: TCall) => item.condo.name,
    closedAt: (item: TCall) => getDateStr(item.closedAt, "dmy"),

    actions: (item: TCall, { callbacks }) => (
      <TableActions
        id={item.id}
        content={[
          {
            role: "edit",
            type: "icon",
            action: callbacks?.edit as (id: string | number) => void | any,
          },
        ]}
      />
    ),
  },
}
