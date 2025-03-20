import { FormField } from "../../../utils/@types/components/FormFields"
import * as S from "./styled"
import * as C from "../styled"
import { TFieldError } from "../../../utils/@types/helpers/checkErrors"

export type TInputDefault = {
  label?: string
  placeholder?: string
  field: string | number
  value: string
  limit?: number
  fixedWidth?: number

  error?: TFieldError
}

type Props = TInputDefault & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputDefault = (props: Props) => {
  const {
    label,
    field,
    value,
    placeholder,
    limit,
    onChange,
    fixedWidth,
    error,
  } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = limit ? e.target.value.slice(0, limit) : e.target.value
    onChange(field, v)
  }

  return (
    <S.Wrapper $gridSizes={props.gridSizes} $fixedWidth={fixedWidth}>
      <S.Area>
        {label && <S.Label $error={error?.has}>{label}</S.Label>}
        <S.Input
          $error={error?.has}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
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
              $error={error?.has}
              $filled={value.length === limit}
            >{`${value.length}/${limit}`}</C.Limit>
          )}
        </div>
      </S.Area>
    </S.Wrapper>
  )
}

export default InputDefault
