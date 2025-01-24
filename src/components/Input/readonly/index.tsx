import { FormField } from "../../../utils/@types/components/FormFields"
import { TFieldError } from "../../../utils/@types/helpers/checkErrors"
import * as S from "./styled"
import * as C from "../styled"

export type TReadonlyField = {
  label?: string
  field: string
  value: string
  fixedWidth?: number
  disabled?: boolean

  error?: TFieldError
}

type Props = TReadonlyField & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const ReadonlyField = (props: Props) => {
  const { label, value, disabled, error } = props

  return (
    <S.Wrapper
      $gridSizes={props.gridSizes}
      $fixedWidth={props.fixedWidth}
      $disabled={disabled}
    >
      <S.Area>
        {label && <S.Label $error={error?.has}>{label}</S.Label>}
        <S.DataArea $error={error?.has}>{value}</S.DataArea>

        {error?.message && (
          <C.ErrorMessage $visible={error && error?.has}>
            {error?.message}
          </C.ErrorMessage>
        )}
      </S.Area>
    </S.Wrapper>
  )
}

export default ReadonlyField
