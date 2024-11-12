import { TConfig } from "."
import { TErrand } from "../../@types/data/errand"
import { getDateStr } from "../../tb/format/date"

import ColorTextIndicator from "../../../components/ColorTextIndicator"
import TableActions from "../../../components/TableActions"

export const errandTableConfig: TConfig = {
  columns: [
    { title: "Título", field: "title" },
    { title: "Data", field: "date" },
    { title: "Status", field: "status" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    date: (item: TErrand) => getDateStr(item.date as string, "dmy"),
    status: (item: TErrand) => (
      <ColorTextIndicator role="status" data={item.status} />
    ),
    actions: (item: TErrand, { callbacks }) => (
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
