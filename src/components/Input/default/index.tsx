import { FormField } from "../../../utils/@types/components/FormFields"
import * as S from "./styled"

export type TInputDefault = {
  label?: string
  placeholder?: string
  field: string | number
  value: string
}

type Props = TInputDefault & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputDefault = (props: Props) => {
  const { label, field, value, placeholder, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value)
  }

  return (
    <S.Wrapper $gridSizes={props.gridSizes}>
      <S.Area>
        {label && <S.Label>{label}</S.Label>}
        <S.Input
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </S.Area>
    </S.Wrapper>
  )
}

export default InputDefault
