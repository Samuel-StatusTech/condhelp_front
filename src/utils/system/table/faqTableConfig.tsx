import { TConfig } from "."
import { TFaq } from "../../@types/data/faq"
import { relations } from "../relations"

import TableActions from "../../../components/TableActions"

export const faqTableConfig: TConfig = {
  columns: [
    { title: "Título do FAQ", field: "title" },
    { title: "Perfil de acesso", field: "accessProfiles" },
    { title: "Qt de perguntas", field: "size" },
    { title: "", field: "actions", align: "right" },
  ],
  specialFields: {
    accessProfiles: (item: TFaq) =>
      `${item.accessProfiles.map((i) => relations.roles[i]).join(", ")}`,
    size: (item: TFaq) => item.items.length,
    actions: (item: TFaq, { callbacks }) => (
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
