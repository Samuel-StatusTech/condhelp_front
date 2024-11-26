import { TConfig } from "."

import TableActions from "../../../components/TableActions"
import { TCondominium } from "../../@types/data/condominium"

export const condoTableConfig: TConfig = {
  columns: [
    { title: "Nome", field: "name" },
    { title: "Sìndico", field: "manager" },
    { title: "City", field: "city" },
    { title: "Estado", field: "state" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    name: (item: TCondominium) => item.name,
    manager: (item: TCondominium) =>
      `${item.manager.name} ${item.manager.surname ?? ""}`,
    city: (item: TCondominium) => item.address.city,
    state: (item: TCondominium) => item.address.state,
    actions: (item: TCondominium, { callbacks }) => (
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
