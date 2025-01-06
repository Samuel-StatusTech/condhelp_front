import { TConfig } from "."
import ColorTextIndicator from "../../../components/ColorTextIndicator"

import TableActions from "../../../components/TableActions"
import { TSubCategory } from "../../@types/data/category/subcategories"

export const subcategoryTableConfig: TConfig = {
  columns: [
    { title: "Categoria pai", field: "serviceCategory" },
    { title: "Subcategoria", field: "name" },
    { title: "Criada por", field: "creator" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    serviceCategory: (item: TSubCategory) => item.serviceCategory.name,
    name: (item: TSubCategory) => item.name,
    creator: (item: TSubCategory) => (
      <ColorTextIndicator
        role="profile"
        data={item.user.profile}
        text={item.user.name}
      />
    ),
    actions: (item: TSubCategory, { callbacks }) => (
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
