import { useState } from "react"
import * as C from "../styled"
import * as S from "./styles"
import { Icons } from "../../../assets/icons/icons"
import { FormField } from "../../../utils/@types/components/FormFields"
import { TFieldError } from "../../../utils/@types/helpers/checkErrors"

export type TMultipleSelect = {
  label: string
  placeholder?: string
  field: string
  options: TOption[]
  value: any[]
  disabled?: boolean
  elevation?: number
  reverse?: boolean
  selecteds: string[]

  error?: TFieldError
}

export type TOption = {
  key: string
  value: string
}

type Props = TMultipleSelect & {
  onChange: (field: string, v: any) => void
  gridSizes?: FormField["gridSizes"]
  alignBottom?: boolean
}

const MultipleSelect = ({
  elevation,
  label,
  placeholder,
  value,
  field,
  options = [],
  disabled,
  onChange,
  gridSizes,
  alignBottom,
  reverse,
  selecteds,
  error,
}: Props) => {
  // use ref ...

  const [showing, setShowing] = useState(false)

  const toggleDropdown = () => {
    setShowing(!showing)
  }

  const handlePick = (picked: any) => {
    onChange(field, picked.key)
    setShowing(false)
  }

  return (
    <C.Wrapper $gridSizes={gridSizes} $alignBottom={alignBottom}>
      <C.Area $elevation={elevation}>
        <S.SelectArea>
          {label && <S.Label $error={error?.has}>{label}</S.Label>}
          <S.DataArea
            onClick={!disabled ? toggleDropdown : undefined}
            className={showing ? "turnedIcon" : ""}
            $disabled={disabled}
            $error={error?.has}
          >
            <S.Left>
              {selecteds.length > 0 ? (
                <S.SelectedInfo $error={error?.has}>
                  {selecteds.join(", ")}
                </S.SelectedInfo>
              ) : (
                <S.Placeholder $error={error?.has}>
                  {placeholder ?? label}
                </S.Placeholder>
              )}
            </S.Left>
            <Icons.Dropdown width={16} height={16} />
          </S.DataArea>

          <C.ErrorMessage $visible={error && error?.has}>
            {error?.message}
          </C.ErrorMessage>

          <S.OptionsArea
            className={showing ? "visible" : ""}
            $reverse={reverse}
            $elevation={elevation}
          >
            {options.map((o, k) => (
              <S.Option key={k} onClick={() => handlePick(o)}>
                <S.Checkbox $checked={value.includes(o.key)}>
                  {value.includes(o.key) && <Icons.Check />}
                </S.Checkbox>
                <span>{o.value}</span>
              </S.Option>
            ))}
          </S.OptionsArea>
        </S.SelectArea>
      </C.Area>
    </C.Wrapper>
  )
}

export default MultipleSelect
