import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { TCity, TRegion } from "../../../utils/@types/data/region"

import Button from "../../Button"
import Input from "../../Input"

import { getStore } from "../../../store"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"

type Props = {
  list: TRegion["cities"][number][]
  unlinkCity: (cityId: number) => boolean
  setList: (list: TRegion["cities"]) => void
  handleCity: (cityName: string) => Promise<void>
  citiesOptions: TCity[]
  clearSearch: () => void
}

const CitiesList = ({
  list,
  setList,
  unlinkCity,
  handleCity,
  citiesOptions,
  clearSearch,
}: Props) => {
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
        i.id !== id ? i : { ...i, name: value, notPicked: true }
      )
    )

    handleCity(value)
  }

  const handleCitySelect = (id: any, cityId: number) => {
    const city = citiesOptions.find((c) => c.id === cityId) as TCity

    const newList = list.map((i) => (i.id !== id ? i : city))

    setList(newList)

    clearSearch()

    return city
  }

  const focusCity = (id: number) => {
    setTimeout(() => {
      const el = document.getElementById(String(id))

      if (el) {
        el.focus()
      }
    }, 150)
  }

  const handleAddCity = () => {
    clearSearch()

    const newId = new Date().getTime()
    const newCity: TRegion["cities"][number] = {
      id: newId,
      name: "",
      notPicked: true,
    }

    setList([...list, newCity])

    focusCity(newId)
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
          autoSugest={true}
          options={parseOptionList(citiesOptions, "id", "name")}
          onSelectOption={handleCitySelect}
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
