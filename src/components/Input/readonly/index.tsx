import { FormField } from "../../../utils/@types/components/FormFields"
import * as S from "./styled"

export type TReadonlyField = {
  label?: string
  field: string
  value: string
  fixedWidth?: number
  disabled?: boolean
}

type Props = TReadonlyField & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const ReadonlyField = (props: Props) => {
  const { label, value, disabled } = props

  return (
    <S.Wrapper
      $gridSizes={props.gridSizes}
      $fixedWidth={props.fixedWidth}
      $disabled={disabled}
    >
      <S.Area>
        {label && <S.Label>{label}</S.Label>}
        <S.DataArea>{value}</S.DataArea>
      </S.Area>
    </S.Wrapper>
  )
}

export default ReadonlyField
