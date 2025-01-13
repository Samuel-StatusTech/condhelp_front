import { TConfig } from "."

import TableActions from "../../../components/TableActions"
import { TBudget } from "../../@types/data/budget"
import ColorTextIndicator from "../../../components/ColorTextIndicator"
import { getDateStr } from "../../tb/format/date"

export const finishedBudgetsTableConfig: TConfig = {
  columns: [
    { title: "Título", field: "title" },
    { title: "Condomínio", field: "condo" },
    { title: "Data fim", field: "endDate" },
    { title: "Status", field: "status" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    condo: (item: TBudget) => item.condominiumName,
    endDate: (item: TBudget) => getDateStr(item.endDate, "dmy"),
    status: (item: TBudget) => (
      <ColorTextIndicator role="status" data={"active"} text="Finalizado" />
    ),

    actions: (item: TBudget, { callbacks }) => (
      <TableActions
        id={item.id}
        content={[
          {
            role: "reparticipate",
            action: callbacks?.reparticipate as (budgetId: any) => void,
            type: "textonly",
          },
        ]}
      />
    ),
  },
}
