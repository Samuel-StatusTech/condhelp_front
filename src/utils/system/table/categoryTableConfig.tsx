import { TConfig } from "."

import TableActions from "../../../components/TableActions"
import { TCategory } from "../../@types/data/category"

export const categoryTableConfig: TConfig = {
  columns: [
    { title: "Nome", field: "name" },
    { title: "Subcategorias", field: "serviceSubcategories" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    name: (item: TCategory) => item.name,
    serviceSubcategories: (item: TCategory) =>
      (item.serviceSubcategories ?? []).length,
    actions: (item: TCategory, { callbacks }) => (
      <TableActions
        id={item.id}
        content={[
          {
            userId: item.user.userId,
            role: "edit",
            type: "icon",
            action: callbacks?.edit as (id: string | number) => void | any,
          },
        ]}
      />
    ),
  },
}
