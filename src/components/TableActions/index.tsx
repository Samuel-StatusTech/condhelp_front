import * as S from "./styled"

import Button from "../Button"

import { Icons } from "../../assets/icons/icons"
import { getStore } from "../../store"

type TActionButton = {
  userId?: number
  role: "edit" | "delete" | "reparticipate" | "redirect" | "seeMore"
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
          ) : c.role === "redirect" ? (
            <Button
              key={ck}
              type="tertiary"
              icon={<Icons.Expand />}
              action={() => c.action(id)}
              fit={true}
            />
          ) : c.role === "seeMore" ? (
            <Button
              key={ck}
              type="quaternary"
              action={() => c.action(id)}
              fit={true}
              text="Ver mais"
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
