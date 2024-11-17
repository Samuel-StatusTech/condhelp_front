import { FormField } from "../../../utils/@types/components/FormFields"
import * as C from "../styled"
import * as S from "./styled"

export type TInputTextArea = {
  label: string
  field: string
  value: string
  placeholder?: string
  limit?: number
}

type Props = TInputTextArea & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputTextArea = (props: Props) => {
  const { limit, gridSizes, label, field, value, placeholder, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = `auto`
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`

    const v = limit ? e.target.value.slice(0, limit) : e.target.value
    onChange(field, v)
  }

  return (
    <C.Wrapper $gridSizes={gridSizes}>
      <S.Area>
        {label && <S.Label>{label}</S.Label>}
        <S.Textarea
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
    </C.Wrapper>
  )
}

export default InputTextArea
