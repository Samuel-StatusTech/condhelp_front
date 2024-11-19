import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"

import Button from "../../Button"
import { TUManager } from "../../../utils/@types/data/user"

type Props = {
  title: string
  list: TUManager["condos"]

  handleAdd: () => void
  handleDelete: (id: string) => void
}

const CondosList = ({ title, list, handleAdd, handleDelete }: Props) => {
  return (
    <S.Wrapper>
      <S.ListTitle>{title}</S.ListTitle>
      {list.map((item, sk) => (
        <S.Item $k={sk} key={sk}>
          <S.ItemName>{item.name}</S.ItemName>
          <S.BtnArea onClick={() => handleDelete(item.id)}>
            <Icons.Trash />
          </S.BtnArea>
        </S.Item>
      ))}

      <S.Buttons>
        <Button
          type="quaternary"
          action={handleAdd}
          text="Criar condomínio"
          icon={<Icons.PlusCircle />}
          iconLeft={true}
          fit={true}
        />
      </S.Buttons>
    </S.Wrapper>
  )
}

export default CondosList
