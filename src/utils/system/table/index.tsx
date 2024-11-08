import TableActions from "../../../components/TableActions"
import UserImageItem from "../../../components/UserImageItem"
import { TUser } from "../../@types/data/user"
import { relations } from "../relations"

// import TableActions from "../../component/Table/TableActions"

// import { formatCep } from "../helpers/formatters/cep"
// import { formatCnpj } from "../helpers/formatters/cnpj"
// import { formatCpf } from "../helpers/formatters/cpf"
// import { parseDate } from "../helpers/formatters/date"
// import { formatMoney } from "../helpers/formatters/money"
// import { getStatus } from "../helpers/parsers/getStatus"

type TTableConfigs = "users"

export const tableConfig: {
  [key in TTableConfigs]: TConfig
} = {
  users: {
    columns: [
      { title: "Foto", field: "image", size: 24, width: "36px" },
      { title: "Nome", field: "name" },
      { title: "Email", field: "email" },
      { title: "Perfil", field: "profile" },
      { title: "Status", field: "status" },
      { title: "", field: "actions", align: "right" },
    ],
    specialFields: {
      image: (item: TUser, props) => (
        <UserImageItem
          userImage={item.image}
          size={props.data?.size as number}
        />
      ),
      name: (item: TUser) => item.name + " " + item.surname,
      profile: (item: TUser) => relations.roles[item.profile],
      status: (item: TUser) => relations.status[item.status],
      actions: (item: TUser, { callbacks }) => (
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
  },
}

type TColumn = {
  title: string
  field: string
  size?: string | number
  align?: "left" | "center" | "right"
  width?: string
}

export type TConfig = {
  columns: TColumn[]
  specialFields: {
    [key: string]: (
      item: any,
      props: {
        // eslint-disable-next-line no-empty-pattern
        data?: {
          [key: string]: string | number
        }
        callbacks?: {
          [key: string]: (...props: any) => void
        }
      }
    ) => any
  }
  isExpandable?: boolean
}
