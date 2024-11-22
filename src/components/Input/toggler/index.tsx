import { FormField } from "../../../utils/@types/components/FormFields"
import * as S from "./styled"

export type TInputToggler = {
  label: string
  field: string
  value: boolean
  hasTopSpace?: boolean
}

type Props = TInputToggler & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputToggler = (props: Props) => {
  const { gridSizes, hasTopSpace, label, field, value, onChange } = props

  const toggle = () => {
    onChange(field, !value)
  }

  return (
    <S.Wrapper $gridSizes={gridSizes} $hasTopSpace={hasTopSpace}>
      <S.Area onClick={toggle}>
        <S.Box $state={value}>
          <S.Dot $state={value} />
        </S.Box>
        <S.Label>{label}</S.Label>
      </S.Area>
    </S.Wrapper>
  )
}

export default InputToggler
