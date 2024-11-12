import { TConfig } from "."
import ColorTextIndicator from "../../../components/ColorTextIndicator"

import TableActions from "../../../components/TableActions"
import { TSubCategory } from "../../@types/data/category/subcategories"

export const subcategoryTableConfig: TConfig = {
  columns: [
    { title: "Categoria pai", field: "parent" },
    { title: "Subcategoria", field: "name" },
    { title: "Criada por", field: "creator" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    parent: (item: TSubCategory) => item.parent.name,
    name: (item: TSubCategory) => item.name,
    creator: (item: TSubCategory) => (
      <ColorTextIndicator
        role="profile"
        data={item.creator.role}
        text={item.creator.name}
      />
    ),
    actions: (item: TSubCategory, { callbacks }) => (
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
