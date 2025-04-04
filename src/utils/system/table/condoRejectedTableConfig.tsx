import { TConfig } from "."
import { Icons } from "../../../assets/icons/icons"

import { theme } from "../../../theme"
import { TCondominium } from "../../@types/data/condominium"

export const condoRejectedTableConfig: TConfig = {
  columns: [
    { title: "Nome", field: "name" },
    { title: "Síndico", field: "manager" },
    { title: "Cidade", field: "city" },
    { title: "Estado", field: "federateUnit" },
    { title: "Baixar Ata", field: "downloadFile", align: "center" },
    { title: "Motivo", field: "rejectionReason", align: "center" },
  ],
  specialFields: {
    name: (item: TCondominium) => item.name,
    manager: (item: TCondominium) =>
      item.manager ? `${item.manager.name} ${item.manager.surname ?? ""}` : "",
    downloadFile: (item: TCondominium) => (
      <a
        href={item.electionFile as string}
        download={true}
        style={{
          outline: "none",
          border: "none",
          background: "none",
          padding: 4,
          cursor: "pointer",
          textTransform: "none",
          color: theme.colors.green["light"],
        }}
      >
        <Icons.Download />
      </a>
    ),
    rejectionReason: (item: TCondominium) => (
      <span
        style={{
          fontSize: 14,
          maxWidth: 300,
          whiteSpace: "pre-line",
          textAlign: "left",
        }}
      >
        {item.rejectionReason}
      </span>
    ),
  },
}
