import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { TRegion } from "../../../utils/@types/data/region"

import Button from "../../Button"
import Input from "../../Input"
import { Api } from "../../../api"
import { getStore } from "../../../store"

type Props = {
  list: TRegion["cities"][number][]
  categoryId?: string
  handleDeleteCity?: (id: string) => void
  setList: (list: TRegion["cities"]) => void
}

const CitiesList = ({ list, categoryId, handleDeleteCity, setList }: Props) => {
  const { controllers } = getStore()

  const handleDelete = (id: number) => {
    if (!list[id].isNew) {
      Api.cities
        .delete({ id })
        .then((res) => {
          if (res.ok) {
            controllers.feedback.setData({
              message: "Cidade excluida com sucesso.",
              state: "success",
              visible: true,
            })
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
              "Não foi possível excluir a cidade. Tente novamente mais tarde.",
            state: "error",
            visible: true,
          })
        })
    }
    setList(list.filter((i) => i.id !== id))
  }

  const handleCityName = async (id: number, value: string) => {
    setList(
      list.map((i, k) =>
        k !== id ? i : { ...i, name: value, isEdit: !i.isNew }
      )
    )
  }

  const handleAddCity = () => {
    const newCity: TRegion["cities"][number] = {
      // @ts-ignore
      id: `new-${list.length}`,
      name: "",
      isNew: true,
    }

    setList([...list, newCity])
  }

  return (
    <S.Wrapper>
      {list.map((city, sk) => (
        <Input.ListInput
          id={sk}
          handleDelete={handleDelete}
          onChange={handleCityName}
          value={city.name}
          gridSizes={{ big: 12 }}
          placeholder="Nome da nova cidade"
        />
      ))}

      <S.Buttons>
        <Button
          type="quaternary"
          action={handleAddCity}
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
