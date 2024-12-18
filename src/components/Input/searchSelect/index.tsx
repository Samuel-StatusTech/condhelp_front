import React, { useEffect, useRef, useState } from "react"
import * as S from "./styles"

import { Icons } from "../../../assets/icons/icons"
import { TFilter } from "../../../utils/@types/components/SearchBlock"

export type TInputSelect = {
  label: string
  field: string
  options: TOption[]
  value: string | null
  disabled?: boolean
  byKey?: boolean
}

export type TOption = {
  key: string
  value: string
}

type Props = TInputSelect & {
  onChange?: (filter: Partial<TFilter>) => void
}

const SearchSelect = ({
  label,
  value,
  field,
  options,
  disabled,
  onChange,
  byKey,
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
    onChange &&
      onChange({
        name: field,
        value: picked.key,
      })
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
    <S.SelectArea ref={wrapperRef}>
      <S.DataArea
        onClick={!disabled ? toggleDropdown : undefined}
        className={showing ? "turnedIcon" : ""}
        $disabled={disabled}
      >
        <S.Left>
          <S.SelectedInfo>
            {selected &&
            selected.key &&
            selected.value &&
            selected.key !== "all"
              ? byKey
                ? selected.key
                : selected.value
              : label}
          </S.SelectedInfo>
        </S.Left>
        <Icons.Dropdown width={16} height={16} />
      </S.DataArea>
      <S.OptionsArea
        className={showing ? "visible" : ""}
        $reverse={false}
        ref={dropRef}
      >
        {options.map((o, k) => (
          <S.Option key={k} onClick={() => handlePick(o)}>
            <span>{o.value}</span>
          </S.Option>
        ))}
      </S.OptionsArea>
    </S.SelectArea>
  )
}

export default SearchSelect
