import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { TSubCategory } from "../../../utils/@types/data/category/subcategories"
import { useNavigate } from "react-router-dom"
import Button from "../../Button"

type Props = {
  list: TSubCategory[]
  categoryId?: string
  handleDelete: (id: string) => void
}

const SubcategoriesList = ({ list, categoryId, handleDelete }: Props) => {
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(`/subcategories/single/${id}`)
  }

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
      {list.map((subcategory, sk) => (
        <S.SubcategoryItem
          $k={sk}
          key={sk}
          onClick={() => handleClick(subcategory.id)}
        >
          <S.SCName>{subcategory.name}</S.SCName>
          <Icons.Expand />
        </S.SubcategoryItem>
      ))}
      {/* {categoryId && ( */}
      <Button
        type="quaternary"
        action={handleAddSubcategory}
        text="Inserir subcategoria"
        icon={<Icons.PlusCircle />}
        iconLeft={true}
      />
      {/* )} */}
      <S.Buttons className="buttonsArea">
        <Button
          type="quaternary"
          action={handleDelete}
          text="Excluir"
          icon={<Icons.Trash />}
          iconLeft={true}
          fit={true}
        />
        <S.BtnArea>
          <Button
            type="outlined"
            action={handleDelete}
            text="Cancelar"
            icon={<Icons.Edit />}
            iconLeft={true}
            fit={true}
          />
          <Button
            type="main"
            action={handleDelete}
            text="Salvar"
            icon={<Icons.CheckCircle />}
            iconLeft={true}
            fit={true}
          />
        </S.BtnArea>
      </S.Buttons>
    </S.Wrapper>
  )
}

export default SubcategoriesList
