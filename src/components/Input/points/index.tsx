import React, { useEffect, useState } from "react"
import * as C from "../styled"
import * as S from "./styles"

export type TInputPoint = {
  label: string
  field: string
  options: TOption[]
  value: string | null
}

export type TOption = {
  key: string
  value: string
}

type Props = TInputPoint & {
  onChange: (field: string, v: any) => void
}

const Points = ({ label, value, field, options, onChange }: Props) => {
  const [selected, setSelected] = useState<any>({ value: "" })

  const handlePick = (picked: any) => {
    setSelected(picked)
    onChange(field, picked.key)
  }

  useEffect(() => {
    const v = options.find((o) => o.key === value)

    if (value) setSelected(v)
    else if (options.length === 0) setSelected(options[0])
  }, [options, value, selected, options.length])

  return (
    <C.Wrapper>
      <C.Area>
        <S.SelectArea>
          <S.Label>{label}</S.Label>
          <S.OptionsArea $reverse={false}>
            {options.map((o, k) => (
              <S.Option key={k} onClick={() => handlePick(o)}>
                <S.Radio $checked={value === o.key} />
                <span>{o.value}</span>
              </S.Option>
            ))}
          </S.OptionsArea>
        </S.SelectArea>
      </C.Area>
    </C.Wrapper>
  )
}

export default Points
