import React, { useEffect, useState } from "react"
import * as C from "../styled"
import * as S from "./styles"
import { Icons } from "../../../assets/icons/icons"
import { FormField } from "../../../utils/@types/components/FormFields"

export type TInputSelect = {
  label?: string
  placeholder?: string
  field: string
  options: TOption[]
  value: string | null
  disabled?: boolean
  byKey?: boolean
  elevation?: number
}

export type TOption = {
  key: string
  value: string
}

type Props = TInputSelect & {
  onChange: (field: string, v: any) => void
  gridSizes?: FormField["gridSizes"]
  alignBottom?: boolean
}

const SelectDefault = ({
  elevation,
  label,
  placeholder,
  value,
  field,
  options,
  disabled,
  onChange,
  gridSizes,
  byKey,
  alignBottom,
}: Props) => {
  // use ref ...

  const [showing, setShowing] = useState(false)
  const [selected, setSelected] = useState<any>({ value: "" })

  const toggleDropdown = () => {
    setShowing(!showing)
  }

  const handlePick = (picked: any) => {
    setSelected(picked)
    onChange(field, picked.key)
    setShowing(false)
  }

  useEffect(() => {
    const v = options.find((o) => o.key === value)

    if (value) setSelected(v)
    else if (options.length === 0) setSelected(options[0])
  }, [options, value, selected, options.length])

  return (
    <C.Wrapper $gridSizes={gridSizes} $alignBottom={alignBottom}>
      <C.Area $elevation={elevation}>
        <S.SelectArea>
          {label && <S.Label>{label}</S.Label>}
          <S.DataArea
            onClick={!disabled ? toggleDropdown : undefined}
            className={showing ? "turnedIcon" : ""}
            $disabled={disabled}
          >
            <S.Left>
              {selected && selected.value ? (
                <S.SelectedInfo>
                  {byKey ? selected.key : selected?.value}
                </S.SelectedInfo>
              ) : (
                <S.Placeholder>{placeholder ?? label}</S.Placeholder>
              )}
            </S.Left>
            <Icons.Dropdown width={16} height={16} />
          </S.DataArea>
          <S.OptionsArea
            className={showing ? "visible" : ""}
            $reverse={false}
            $elevation={elevation}
          >
            {options.map((o, k) => (
              <S.Option key={k} onClick={() => handlePick(o)}>
                <span>{o.value}</span>
              </S.Option>
            ))}
          </S.OptionsArea>
        </S.SelectArea>
      </C.Area>
    </C.Wrapper>
  )
}

export default SelectDefault
