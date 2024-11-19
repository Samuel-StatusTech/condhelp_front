import { TConfig } from "."
import { TUser } from "../../@types/data/user"
import { relations } from "../relations"

import TableActions from "../../../components/TableActions"
import UserImageItem from "../../../components/UserImageItem"

export const userTableConfig: TConfig = {
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
      <UserImageItem userImage={item.image} size={props.data?.size as number} />
    ),
    name: (item: TUser) =>
      item.profile === "admin" ? item.name + " " + item.surname : item.name,
    profile: (item: TUser) => relations.roles[item.profile],
    status: (item: TUser) =>
      relations.status[item.active ? "active" : "disabled"],
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
}
