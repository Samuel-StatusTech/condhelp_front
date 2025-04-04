import { TConfig } from "."
import { Icons } from "../../../assets/icons/icons"
import Button from "../../../components/Button"

import { theme } from "../../../theme"
import { TCondominium } from "../../@types/data/condominium"

export const condoUnaprovedTableConfig: TConfig = {
  columns: [
    { title: "Nome", field: "name" },
    { title: "Síndico", field: "manager" },
    { title: "Cidade", field: "city" },
    { title: "Estado", field: "federateUnit" },
    { title: "Baixar Ata", field: "downloadFile", align: "center" },
    { title: "Status", field: "status", align: "center" },
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
    status: (item: TCondominium, { callbacks }) =>
      item.status === "UNDER_REVIEW" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <Button
            type="quaternary"
            text="Recusar"
            red={true}
            action={() => (callbacks as any).rejectCondo(item)}
            fit={true}
          />
          <Button
            type="quaternary"
            text="Aprovar"
            greenText={true}
            action={() => (callbacks as any).approveCondo(item)}
            fit={true}
          />
        </div>
      ) : (
        <span
          style={{
            color: theme.colors.red.main,
            fontSize: 14,
          }}
        >
          Recusado
        </span>
      ),
  },
}
