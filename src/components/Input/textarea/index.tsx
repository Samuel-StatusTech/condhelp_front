import { FormField } from "../../../utils/@types/components/FormFields"
import { TFieldError } from "../../../utils/@types/helpers/checkErrors"
import * as C from "../styled"
import * as S from "./styled"

export type TInputTextArea = {
  label?: string
  field: string
  value: string
  placeholder?: string
  limit?: number
  disabled?: boolean

  error?: TFieldError
  nonEditable?: boolean
}

type Props = TInputTextArea & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputTextArea = (props: Props) => {
  const {
    limit,
    gridSizes,
    label,
    field,
    value,
    placeholder,
    onChange,
    disabled,
    error,
    nonEditable,
  } = props

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = `auto`
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`

    const v = limit ? e.target.value.slice(0, limit) : e.target.value
    onChange(field, v)
  }

  return (
    <C.Wrapper $gridSizes={gridSizes}>
      <S.Area>
        {label && <S.Label $error={error?.has}>{label}</S.Label>}
        <S.Textarea
          $error={error?.has}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          rows={4}
          $disabled={disabled}
          $nonEditable={nonEditable}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <C.ErrorMessage $visible={error && error?.has}>
            {error?.message}
          </C.ErrorMessage>

          {limit && (
            <C.Limit
              $filled={value.length === limit}
            >{`${value.length}/${limit}`}</C.Limit>
          )}
        </div>
      </S.Area>
    </C.Wrapper>
  )
}

export default InputTextArea
