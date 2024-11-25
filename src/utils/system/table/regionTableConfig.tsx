import { TConfig } from "."

import TableActions from "../../../components/TableActions"
import { TRegion } from "../../@types/data/region"

export const regionTableConfig: TConfig = {
  columns: [
    { title: "Nome", field: "name" },
    { title: "País", field: "country" },
    { title: "Estado", field: "state" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    country: (item: TRegion) => item.country.name,
    state: (item: TRegion) => item.state.name,
    actions: (item: TRegion, { callbacks }) => (
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
