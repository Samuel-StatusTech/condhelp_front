import * as S from "./styled"

export type TInputTextArea = {
  label: string
  field: string
  value: string
  placeholder?: string
}

type Props = TInputTextArea & {
  onChange: (field: any, v: any) => void
}

const InputTextArea = (props: Props) => {
  const { label, field, value, placeholder, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = `auto`
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
    onChange(field, e.target.value)
  }

  return (
    <S.Wrapper>
      <S.Area>
        <S.Label>{label}</S.Label>
        <S.Textarea
          placeholder={placeholder ?? label}
          value={value}
          onChange={handleChange}
        />
      </S.Area>
    </S.Wrapper>
  )
}

export default InputTextArea
