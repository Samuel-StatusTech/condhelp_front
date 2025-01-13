import * as S from "./styled"

import Button from "../Button"

import { Icons } from "../../assets/icons/icons"
import { getStore } from "../../store"

type TActionButton = {
  userId?: number
  role: "edit" | "delete" | "reparticipate"
  type: "icon" | "outlined" | "textonly"
  action: (id: string | number) => void | any
}

type Props = {
  id: string | number
  content: TActionButton[]
}

const TableActions = ({ id, content }: Props) => {
  const { user } = getStore()

  return (
    <S.Wrapper>
      {content
        .filter((c) => {
          let ok = true

          if (user?.profile !== "ADMIN" && c.userId) {
            ok = user?.userId === c.userId
          }

          return ok
        })
        .map((c, ck) =>
          c.role === "reparticipate" ? (
            <Button
              key={ck}
              type="quaternary"
              text="Participar"
              action={() => c.action(id)}
              fit={true}
              greenText={true}
            />
          ) : (
            <Button
              key={ck}
              type="tertiary"
              icon={<Icons.Edit />}
              action={() => c.action(id)}
              fit={true}
            />
          )
        )}
    </S.Wrapper>
  )
}

export default TableActions
