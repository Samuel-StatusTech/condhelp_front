import { TConfig } from "."

import TableActions from "../../../components/TableActions"
import { TCondominium } from "../../@types/data/condominium"

export const condoTableConfig: TConfig = {
  columns: [
    { title: "Nome", field: "name" },
    { title: "Síndico", field: "manager" },
    { title: "Cidade", field: "city" },
    { title: "Estado", field: "federateUnit" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    name: (item: TCondominium) => item.name,
    manager: (item: TCondominium) =>
      item.manager ? `${item.manager.name} ${item.manager.surname ?? ""}` : "",
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
