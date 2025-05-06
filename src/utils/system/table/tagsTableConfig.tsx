import { TConfig } from "."

import TableActions from "../../../components/TableActions"
import { TTag } from "../../@types/data/tag"
import { relations } from "../relations"

export const tagsTableConfig: TConfig = {
  columns: [
    { title: "Id", field: "id" },
    { title: "Nome", field: "name" },
    { title: "Perfil", field: "profile" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    profile: (item: TTag) => relations.roles[item.type],
    actions: (item: TTag, { callbacks }) => (
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
