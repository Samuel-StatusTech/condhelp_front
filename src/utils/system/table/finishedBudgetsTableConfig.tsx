import { TConfig } from "."

import TableActions from "../../../components/TableActions"
import { TBudget } from "../../@types/data/budget"
import ColorTextIndicator from "../../../components/ColorTextIndicator"
import { getDateStr } from "../../tb/format/date"

export const finishedBudgetsTableConfig: TConfig = {
  columns: [
    { title: "Título", field: "title" },
    { title: "Condomínio", field: "condo" },
    { title: "Data fim", field: "end" },
    { title: "Status", field: "status" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    condo: (item: TBudget) => item.condominium.name,
    end: (item: TBudget) => getDateStr(item.end, "dmy"),
    status: (item: TBudget) => (
      <ColorTextIndicator role="status" data={"active"} text="Finalizado" />
    ),

    actions: (item: TBudget, { callbacks }) => (
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
