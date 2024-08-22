import { memo } from "react"
import * as S from "./styled"

export type TInputToggler = {
  label: string
  field: string
  value: boolean
}

type Props = TInputToggler & {
  onChange: (field: any, v: any) => void
}

const InputToggler = (props: Props) => {
  const { label, field, value, onChange } = props

  const toggle = () => {
    onChange(field, !value)
  }

  return (
    <S.Wrapper>
      <S.Area onClick={toggle}>
        <S.Box $state={value}>
          <S.Dot $state={value} />
        </S.Box>
        <S.Label>{label}</S.Label>
      </S.Area>
    </S.Wrapper>
  )
}

export default memo(InputToggler)
