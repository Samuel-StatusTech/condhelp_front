import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"

import Button from "../../Button"
import { TUManager } from "../../../utils/@types/data/user"
import { TCondominium } from "../../../utils/@types/data/condominium"

type Props = {
  title: string
  list: TUManager["condominiums"]

  handleAdd: () => void
  handleDelete: (condominium: TCondominium) => void
}

const CondosList = ({ title, list, handleAdd, handleDelete }: Props) => {
  return (
    <S.Wrapper>
      <S.ListTitle>{title}</S.ListTitle>
      {list.map((item, sk) => (
        <S.Item $k={sk} key={sk}>
          <S.ItemName>{item.name}</S.ItemName>
          <S.BtnArea onClick={() => handleDelete(item)}>
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
