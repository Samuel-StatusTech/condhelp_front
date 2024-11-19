import * as S from "./styled"

import { TOption } from "../../../utils/@types/data/option"
import { FormField } from "../../../utils/@types/components/FormFields"
import { TForm } from "../../../utils/@types/components/Form"

export type TInputRadio = {
  field: string
  label: string
  value: string
  options: TOption[]
}

type Props = TInputRadio & {
  onChange: TForm["handleField"]
  gridSizes?: FormField["gridSizes"]
}

const InputRadio = (props: Props) => {
  const { gridSizes, field, label, value, options, onChange } = props

  const toggle = (d: TOption) => {
    onChange(field, d.key)
  }

  return (
    <S.Wrapper $gridSizes={gridSizes}>
      <S.Area>
        <S.Label>{label}</S.Label>
        <S.Main>
          {options.map((o, k) => (
            <S.Option
              key={k}
              onClick={() => toggle(o)}
              $checked={value === o.key}
            >
              <S.Radio $checked={value === o.key} />
              <span>{o.value}</span>
            </S.Option>
          ))}
        </S.Main>
      </S.Area>
    </S.Wrapper>
  )
}

export default InputRadio
