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
import { useEffect, useState } from "react"

type Props = {
  list: TSubCategory[]
  setList: (list: (TNewSubCategory | TSubCategory)[]) => void
}

const SubcategoriesList = ({ list, setList }: Props) => {
  const { controllers } = getStore()

  const [loading, setLoading] = useState(false)

  const onConfirmDelete = async (id: number) => {
    setLoading(true)
    try {
      await Api.subcategories
        .delete({ id })
        .then((res) => {
          if (res.ok) {
            controllers.feedback.setData({
              message: "Subcategoria excluída com sucesso.",
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
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Não foi possível excluir a subcategoria. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }

    setLoading(false)
  }

  const handleDelete = (id: number) => {
    if (!list.find((i) => i.id === id)?.isNew) {
      controllers.modal.open({
        role: "confirmDelete",
        visible: true,
        data: {
          title: "Excluir subcategoria",
          deleteTextDescriptor: "excluir esta subcategoria",
        },
        handleOp: () => onConfirmDelete(id),
      })
    } else {
      setList(list.filter((i) => i.id !== id))
    }
  }

  const handleSubcategoryName = async (id: number, value: string) => {
    setList(list.map((i) => (i.id !== id ? i : { ...i, name: value })))
  }

  const focusCity = (id: number) => {
    setTimeout(() => {
      const el = document.getElementById(String(id))

      if (el) {
        el.focus()
      }
    }, 150)
  }

  const handleAddSubcategory = () => {
    const newId = new Date().getTime()

    const newCategory: TNewSubCategory = {
      // @ts-ignore
      id: newId,
      name: "",
      serviceCategory: 0,
      // @ts-ignore
      isNew: true,
    }

    setList([...list, newCategory])

    focusCity(newId)
  }

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  return (
    <S.Wrapper>
      {list.map((subcategory, sk) => (
        <Input.ListInput
          key={sk}
          id={subcategory.id}
          handleDelete={handleDelete}
          onChange={handleSubcategoryName}
          onEnter={handleAddSubcategory}
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
