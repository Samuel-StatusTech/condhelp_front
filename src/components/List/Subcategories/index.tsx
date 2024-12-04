import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import {
  TNewSubCategory,
  TSubCategory,
} from "../../../utils/@types/data/category/subcategories"

import Button from "../../Button"
import Input from "../../Input"
import { Api } from "../../../api"
import { getStore } from "../../../store"

type Props = {
  list: TSubCategory[]
  setList: (list: (TNewSubCategory | TSubCategory)[]) => void
}

const SubcategoriesList = ({ list, setList }: Props) => {
  const { controllers } = getStore()

  const handleDelete = (id: number) => {
    if (!list.find((i) => i.id === id)?.isNew) {
      Api.subcategories
        .delete({ id })
        .then((res) => {
          if (res.ok) {
            controllers.feedback.setData({
              message: "Subcategoria excluida com sucesso.",
              state: "success",
              visible: true,
            })
            setList(list.filter((i) => i.id !== id))
          } else {
            controllers.feedback.setData({
              message: res.error,
              state: "error",
              visible: true,
            })
          }
        })
        .catch(() => {
          controllers.feedback.setData({
            message:
              "Não foi possível excluir a subcategoria. Tente novamente mais tarde.",
            state: "error",
            visible: true,
          })
        })
    } else {
      setList(list.filter((i) => i.id !== id))
      controllers.feedback.setData({
        message: "Subcategoria excluida com sucesso.",
        state: "success",
        visible: true,
      })
    }
  }

  const handleSubcategoryName = async (id: number, value: string) => {
    setList(list.map((i) => (i.id !== id ? i : { ...i, name: value })))
  }

  const handleAddSubcategory = () => {
    const newCategory: TNewSubCategory = {
      // @ts-ignore
      id: new Date().getTime(),
      name: "",
      serviceCategory: 0,
      // @ts-ignore
      isNew: true,
    }

    setList([...list, newCategory])
  }

  return (
    <S.Wrapper>
      {list.map((subcategory, sk) => (
        <Input.ListInput
          key={sk}
          id={subcategory.id}
          handleDelete={handleDelete}
          onChange={handleSubcategoryName}
          value={subcategory.name}
          gridSizes={{ big: 12 }}
          placeholder="Nome da nova subcategoria"
        />
      ))}
      <Button
        type="quaternary"
        action={handleAddSubcategory}
        text="Inserir subcategoria"
        icon={<Icons.PlusCircle />}
        iconLeft={true}
      />
    </S.Wrapper>
  )
}

export default SubcategoriesList
