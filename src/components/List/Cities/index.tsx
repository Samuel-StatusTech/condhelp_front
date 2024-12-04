import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { TRegion } from "../../../utils/@types/data/region"

import Button from "../../Button"
import Input from "../../Input"

import { getStore } from "../../../store"

type Props = {
  list: TRegion["cities"][number][]
  unlinkCity: (cityId: number) => boolean
  setList: (list: TRegion["cities"]) => void
}

const CitiesList = ({ list, setList, unlinkCity }: Props) => {
  const { controllers } = getStore()

  const handleDelete = (id: number) => {
    const removal = unlinkCity(id)

    if (removal) {
      controllers.feedback.setData({
        message: "Cidade desrelacionada com sucesso.",
        state: "success",
        visible: true,
      })
    } else {
      controllers.feedback.setData({
        message:
          "Não foi possível desrelacionar a cidade. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }
  }

  const handleCityName = async (id: number, value: string) => {
    setList(
      list.map((i, k) =>
        i.id !== id ? i : { ...i, name: value, isEdit: !i.isNew }
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
          key={sk}
          id={city.id}
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
