import { TConfig } from "."
import ColorTextIndicator from "../../../components/ColorTextIndicator"

import TableActions from "../../../components/TableActions"
import { TCategory } from "../../@types/data/category"

export const categoryTableConfig: TConfig = {
  columns: [
    { title: "Nome", field: "name" },
    { title: "Subcategorias", field: "serviceSubcategories" },
    { title: "Criada por", field: "creator" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    name: (item: TCategory) => item.name,
    serviceSubcategories: (item: TCategory) => item.serviceSubcategories.length,
    creator: (item: TCategory) => (
      <ColorTextIndicator
        role="profile"
        data={item.creator.role}
        text={item.creator.name}
      />
    ),
    actions: (item: TCategory, { callbacks }) => (
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
