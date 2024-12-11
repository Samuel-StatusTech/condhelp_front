import React, { useRef } from "react"
import * as C from "../styled"
import * as S from "./styles"
import { Icons } from "../../../assets/icons/icons"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { FormField } from "../../../utils/@types/components/FormFields"

export type TInputDate = {
  label: string
  field: string | number
  value: string | Date | null
  disabled?: boolean
  minDate?: Date | string | number
  maxDate?: Date | string | number
}

type Props = TInputDate & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputDate = ({
  gridSizes,
  label,
  value,
  field,
  disabled,
  onChange,
  minDate,
  maxDate,
}: Props) => {
  const pickerRef = useRef<any>(null)

  const toggleCalendar = () => {
    if (window.innerWidth <= 520) pickerRef.current?.click()
    else pickerRef.current?.querySelector("button")?.click()
  }

  const handlePickDate = (picked: any) => {
    onChange(field, picked)
  }

  const renderDate = () => {
    let str: any = null

    if (value) {
      const d = new Date(value)
      str = String(d.getDate()).padStart(2, "0") + "/"
      str += String(d.getMonth() + 1).padStart(2, "0") + "/"
      str += d.getFullYear()
    }

    return str
  }

  return (
    <>
      {/* Calendar */}

      <C.Wrapper $gridSizes={gridSizes}>
        <S.DatePickerWrapper>
          <DatePicker
            ref={pickerRef}
            label="Data de expiração"
            value={dayjs(value)}
            onChange={handlePickDate}
            minDate={minDate ? dayjs(new Date(minDate)) : undefined}
            maxDate={maxDate ? dayjs(new Date(maxDate)) : undefined}
          />
        </S.DatePickerWrapper>

        <C.Area>
          <S.SelectArea>
            <S.Label>{label}</S.Label>
            <S.DataArea
              onClick={!disabled ? toggleCalendar : undefined}
              $disabled={disabled}
            >
              <S.Left>
                <S.SelectedInfo>{renderDate() ?? "DD/MM/AAAA"}</S.SelectedInfo>
              </S.Left>
              <Icons.Calendar />
            </S.DataArea>
          </S.SelectArea>
        </C.Area>
      </C.Wrapper>
    </>
  )
}

export default InputDate
