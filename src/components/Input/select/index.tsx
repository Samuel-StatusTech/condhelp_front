import React, { useEffect, useRef, useState } from "react"
import * as C from "../styled"
import * as S from "./styles"
import { Icons } from "../../../assets/icons/icons"
import { FormField } from "../../../utils/@types/components/FormFields"
import { TFieldError } from "../../../utils/@types/helpers/checkErrors"

export type TInputSelect = {
  label?: string
  placeholder?: string
  field: string
  options: TOption[]
  value: string | null
  disabled?: boolean
  byKey?: boolean
  elevation?: number
  reverse?: boolean
  fixedWidth?: number

  error?: TFieldError
}

export type TOption = {
  key: string
  value: string
}

type Props = TInputSelect & {
  onChange: (field: string, v: any) => void
  gridSizes?: FormField["gridSizes"]
  alignBottom?: boolean
  avoidValueShow?: boolean
}

const SelectDefault = ({
  elevation,
  label,
  placeholder,
  value,
  field,
  options = [],
  disabled,
  onChange,
  gridSizes,
  byKey,
  alignBottom,
  avoidValueShow,
  reverse,
  fixedWidth,
  error,
}: Props) => {
  // use ref ...

  const [showing, setShowing] = useState(false)
  const [selected, setSelected] = useState<any>({ value: "" })

  // # Refs
  const wrapperRef = useRef<null | HTMLDivElement>(null)
  const dataRef = useRef<null | HTMLDivElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setShowing(!showing)
  }

  const handlePick = (picked: any) => {
    setSelected(picked)
    onChange(field, picked.key)
    setShowing(false)
  }

  useEffect(() => {
    const v = options.find((o) => o.key === value)

    if (value) setSelected(v)
    else if (options.length === 0) setSelected(options[0])
  }, [options, value, selected, options.length])

  useEffect(() => {
    const collapseOwnDropdown = () => {
      setShowing(false)
    }

    const handleClickOutside = (e: any) => {
      if (e.target !== document.children[0]) {
        if (
          !wrapperRef.current?.contains(e.target) &&
          !dataRef.current?.contains(e.target) &&
          !dropRef.current?.contains(e.target) &&
          showing
        )
          collapseOwnDropdown()
      }
    }

    if (showing) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [dropRef, showing])

  return (
    <C.Wrapper
      $gridSizes={gridSizes}
      $alignBottom={alignBottom}
      $fixedWidth={fixedWidth}
    >
      <C.Area $elevation={elevation}>
        <S.SelectArea ref={wrapperRef}>
          {label && <S.Label $error={error?.has}>{label}</S.Label>}
          <S.DataArea
            onClick={!disabled ? toggleDropdown : undefined}
            className={showing ? "turnedIcon" : ""}
            $disabled={disabled}
            $error={error?.has}
          >
            <S.Left>
              {selected && selected.value && !avoidValueShow ? (
                <S.SelectedInfo $error={error?.has}>
                  {byKey ? selected.key : selected?.value}
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
                <span>{o.value}</span>
              </S.Option>
            ))}
          </S.OptionsArea>
        </S.SelectArea>
      </C.Area>
    </C.Wrapper>
  )
}

export default SelectDefault
