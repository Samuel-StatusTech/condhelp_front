import * as S from "./styled"

import { useState, useEffect } from "react"
import BreadcrumbPageHeader from "../../../../../components/PageHeader/types/breadcrumb"
import { getStore } from "../../../../../store"
import Divider from "../../../../../components/_minimals/Divider"
import { TCity, TRegion } from "../../../../../utils/@types/data/region"
import { Icons } from "../../../../../assets/icons/icons"
import FormDefaultButtons from "../../../../../components/FormDefaultButtons"

type Props = {
  cities: number[]
  region: TRegion
  handleBack: () => void
  handleList: (cities: number[]) => void
}

const FranchiseCities = ({ cities, region, handleBack, handleList }: Props) => {
  const { controllers } = getStore()

  const [loading] = useState(false)

  const [initialCities, setInitialCities] = useState<TCity[]>([])

  const [regionCities, setRegionCities] = useState<TCity[]>([])
  const [excludes, setExcludes] = useState<TCity[]>([])
  const [selecteds, setSelecteds] = useState<TCity[]>([])

  const handleSelect = (cityId: number) => {
    const newList = [...cities, cityId]
    handleList(newList)
  }

  const handleUnselect = (cityId: number) => {
    const newList = cities.filter((c) => c !== cityId)
    handleList(newList)
  }

  const handleDelete = () => {
    handleList([])
    handleBack()
  }

  const handleCancel = () => {
    // ...
    handleList(initialCities.map((c) => c.id))
    handleBack()
  }

  const handleSave = () => {
    handleBack()
  }

  useEffect(() => {
    setInitialCities(region.cities.filter((c) => cities.includes(c.id)))

    setRegionCities(region.cities)
    setExcludes(region.cities.filter((c) => !cities.includes(c.id)))
    setSelecteds(region.cities.filter((c) => cities.includes(c.id)))
  }, [region, cities])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  return (
    <S.Content>
      <S.BlockArea className="falseSubContentWrapper">
        <BreadcrumbPageHeader
          from="franchiseCities"
          handleAction={handleBack}
        />
      </S.BlockArea>

      <S.SubContent>
        <S.Column>
          <S.Block>
            <S.BlockHeader>
              <S.BlockTitle>Cidades da região</S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            <S.ListName>
              {region.name} ({excludes.length}/{regionCities.length})
            </S.ListName>

            <S.CitiesList>
              {excludes.map((city, cityKey) => (
                <S.CityItem key={cityKey} onClick={() => handleSelect(city.id)}>
                  <span>{city.name}</span>
                  <Icons.ArrowGreen />
                </S.CityItem>
              ))}
            </S.CitiesList>
          </S.Block>
        </S.Column>
        <S.Column>
          <S.Block>
            <S.BlockHeader>
              <S.BlockTitle>Cidades desta rede</S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            <S.ListName>Cidades que a rede irá atender:</S.ListName>

            <S.CitiesList>
              {selecteds.map((city, cityKey) => (
                <S.CityItem
                  key={cityKey}
                  onClick={() => handleUnselect(city.id)}
                >
                  <Icons.ArrowRed />
                  <span>{city.name}</span>
                </S.CityItem>
              ))}
            </S.CitiesList>

            <FormDefaultButtons
              handleDelete={handleDelete}
              handleCancel={handleCancel}
              handleSave={handleSave}
              deleteModalTitle={"Excluir Configurações"}
            />
          </S.Block>
        </S.Column>
      </S.SubContent>
    </S.Content>
  )
}

export default FranchiseCities
