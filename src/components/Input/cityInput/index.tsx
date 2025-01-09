import * as C from "../styled"
import * as S from "./styled"
import { FormField } from "../../../utils/@types/components/FormFields"
import { Icons } from "../../../assets/icons/icons"
import { TOption } from "../../../utils/@types/data/option"
import { useCallback, useEffect, useRef, useState } from "react"
import { Api } from "../../../api"

import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import { TCity } from "../../../utils/@types/data/region"

export type TCityInput = {
  stateId?: string | number | null
  field: string
  label?: string
  placeholder?: string
  value: string
  onSelectCity?: (id: any) => any
  fixedWidth?: number
}

type Props = TCityInput & {
  onChange: (field: string, v: string) => void
  gridSizes?: FormField["gridSizes"]
}

const CityInput = (props: Props) => {
  const { field, label, value, placeholder, onChange, stateId, onSelectCity } =
    props

  const inputRef = useRef<HTMLInputElement>(null)

  const [canSelect, setCanSelect] = useState(false)

  const [cities, setCities] = useState<TCity[]>([])
  const [citiesOptions, setCitiesOptions] = useState<TOption[]>([])

  const clearSearch = () => {
    setCitiesOptions([])
  }

  const handleCity = useCallback(
    async (cityStr: string) => {
      if (!!cityStr) {
        const req = await Api.cities.searchByName({
          search: cityStr,
          stateId: stateId,
        })

        if (req.ok) {
          const results = req.data.content

          setCities(results)
          setCitiesOptions(parseOptionList(results, "id", "name"))
        }
      } else setCitiesOptions([])
    },
    [stateId]
  )

  useEffect(() => {
    if (!!value && canSelect) handleCity(value)
  }, [handleCity, value, canSelect, stateId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canSelect) setCanSelect(true)

    const v = e.target.value
    onChange(field, v)
  }

  const handleCityPick = (city: TOption) => {
    const cityData = cities.find((c) => c.id === +city.key)
    if (onSelectCity) onSelectCity(cityData)

    if (canSelect) setCanSelect(false)

    onChange(field, city.value)

    clearSearch()
  }

  const handleDelete = () => {
    onChange(field, "")
    clearSearch()
    if (canSelect) setCanSelect(false)
  }

  return (
    <C.Wrapper $gridSizes={props.gridSizes} $fixedWidth={props.fixedWidth}>
      <C.Area>
        {label && <S.Label>{label}</S.Label>}
        <S.Item $k={0}>
          <S.Input
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            disabled={!stateId}
          />
          <S.BtnArea onClick={() => handleDelete()}>
            <Icons.Trash />
          </S.BtnArea>
          {canSelect && citiesOptions && citiesOptions.length > 0 && (
            <S.OptionsArea
              className={citiesOptions.length > 0 ? "visible" : ""}
            >
              {citiesOptions.map((o, k) => (
                <S.Option key={k} onClick={(e) => handleCityPick(o)}>
                  <span>{o.value}</span>
                </S.Option>
              ))}
            </S.OptionsArea>
          )}
        </S.Item>
      </C.Area>
    </C.Wrapper>
  )
}

export default CityInput
