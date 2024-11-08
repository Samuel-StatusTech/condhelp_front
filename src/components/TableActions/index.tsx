import * as S from "./styled"

import Button from "../Button"

import { Icons } from "../../assets/icons/icons"

type TActionButton = {
  role: "edit" | "delete"
  type: "icon" | "outlined"
  action: (id: string | number) => void | any
}

type Props = {
  id: string | number
  content: TActionButton[]
}

const TableActions = ({ id, content }: Props) => {
  return (
    <S.Wrapper>
      {content.map((c, ck) => (
        <Button
          key={ck}
          type="tertiary"
          icon={<Icons.Edit />}
          action={() => c.action(id)}
        />
      ))}
    </S.Wrapper>
  )
}

export default TableActions
