import * as S from "./styled"

export type TInputDefault = {
  label: string
  field: string | number
  value: string
  placeholder?: string
}

type Props = TInputDefault & {
  onChange: (field: any, v: any) => void
}

const InputDefault = (props: Props) => {
  const { label, field, value, placeholder, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value)
  }

  return (
    <S.Wrapper>
      <S.Area>
        <S.Label>{label}</S.Label>
        <S.Input
          placeholder={placeholder ?? label}
          value={value}
          onChange={handleChange}
        />
      </S.Area>
    </S.Wrapper>
  )
}

export default InputDefault
