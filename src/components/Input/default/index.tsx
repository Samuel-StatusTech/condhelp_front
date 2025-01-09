import { FormField } from "../../../utils/@types/components/FormFields"
import * as S from "./styled"
import * as C from "../styled"

export type TInputDefault = {
  label?: string
  placeholder?: string
  field: string | number
  value: string
  limit?: number
  fixedWidth?: number
}

type Props = TInputDefault & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputDefault = (props: Props) => {
  const { label, field, value, placeholder, limit, onChange, fixedWidth } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = limit ? e.target.value.slice(0, limit) : e.target.value
    onChange(field, v)
  }

  return (
    <S.Wrapper $gridSizes={props.gridSizes} $fixedWidth={fixedWidth}>
      <S.Area>
        {label && <S.Label>{label}</S.Label>}
        <S.Input
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />

        {limit && (
          <C.Limit
            $filled={value.length === limit}
          >{`${value.length}/${limit}`}</C.Limit>
        )}
      </S.Area>
    </S.Wrapper>
  )
}

export default InputDefault
