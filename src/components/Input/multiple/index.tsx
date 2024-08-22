import { useRef } from "react"
import { TQOption } from "../../../utils/initials/forms/goal"
import * as S from "./styled"

export type TInputCheckbox = {
  label: string
}

type TFromForm = {
  onChange: (field: "checked" | "title", v: any) => void
  fromForm: true
  value: TQOption
}

type TNormal = {
  onChange: (value: boolean | string) => void
  fromForm: false
  value: boolean | string
  options: { key: boolean | string; value: string }[]
}

type Props = TInputCheckbox & (TFromForm | TNormal)

const InputMultiple = (props: Props) => {
  const inptRef = useRef<HTMLInputElement>(null)

  const { label, value, onChange, fromForm } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange("title", e.target.value)
  }

  const toggle = (d: any) => {
    if (fromForm) onChange("checked", !value.checked)
    else onChange(d.key)
  }

  const focusInput = () => {
    inptRef.current?.focus()
  }

  return (
    <S.Wrapper>
      <S.Area>
        <S.Label>{label}</S.Label>
        <S.Main $fromForm={false} onClick={!fromForm ? undefined : focusInput}>
          {fromForm ? (
            <S.Option>
              <S.Radio $checked={value.checked} />
              <S.Input
                ref={inptRef}
                placeholder={label}
                value={value.title}
                onChange={handleChange}
              />
            </S.Option>
          ) : (
            props.options.map((o, k) => (
              <S.Option key={k} onClick={() => toggle(o)}>
                <S.Radio $checked={value === o.key} />
                <span>{o.value}</span>
              </S.Option>
            ))
          )}
        </S.Main>
      </S.Area>
    </S.Wrapper>
  )
}

export default InputMultiple
