import * as S from "./styled"
import { TOption } from "../../../utils/@types/data/option"
import { TForm } from "../../../utils/@types/components/Form"
import { FormField } from "../../../utils/@types/components/FormFields"
import { Icons } from "../../../assets/icons/icons"

export type TInputMultiple = {
  field: string
  label?: string
  value: string[]
  options: TOption[]
  fixedWidth?: number
}

type Props = TInputMultiple & {
  onChange: TForm["handleField"]
  gridSizes?: FormField["gridSizes"]
}

const InputMultiple = (props: Props) => {
  const { field, label, value, options, onChange } = props

  const toggle = (d: TOption) => {
    onChange(field, d.key)
  }

  return (
    <S.Wrapper $gridSizes={props.gridSizes} $fixedWidth={props.fixedWidth}>
      <S.Area>
        {label && <S.Label>{label}</S.Label>}
        <S.Main>
          {options.map((o, k) => (
            <S.Option
              key={k}
              onClick={() => toggle(o)}
              $checked={value.includes(o.key)}
            >
              <S.Checkbox $checked={value.includes(o.key)}>
                {value.includes(o.key) && <Icons.Check />}
              </S.Checkbox>
              <span>{o.value}</span>
            </S.Option>
          ))}
        </S.Main>
      </S.Area>
    </S.Wrapper>
  )
}

export default InputMultiple
