import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { TRegion } from "../../../utils/@types/data/region"

import { useNavigate } from "react-router-dom"
import Button from "../../Button"

type Props = {
  list: TRegion["cities"][number][]
  categoryId?: string
  handleDelete: (id: string) => void
}

const CitiesList = ({ list, categoryId, handleDelete }: Props) => {
  const navigate = useNavigate()

  // const handleClick = (id: string) => {
  //   navigate(`/subcategories/single/${id}`)
  // }

  const handleAddSubcategory = () => {
    if (categoryId) {
      navigate(`/subcategories/single`, {
        state: {
          parent: categoryId,
        },
      })
    }
  }

  return (
    <S.Wrapper>
      {list.map((city, sk) => (
        <S.Item $k={sk} key={sk}>
          <S.ItemName>{city.name}</S.ItemName>
          <S.BtnArea onClick={() => handleDelete(city.id)}>
            <Icons.Trash />
          </S.BtnArea>
        </S.Item>
      ))}

      <S.Buttons>
        <Button
          type="quaternary"
          action={handleAddSubcategory}
          text="Adicionar cidade"
          icon={<Icons.PlusCircle />}
          iconLeft={true}
          fit={true}
        />
      </S.Buttons>
    </S.Wrapper>
  )
}

export default CitiesList
