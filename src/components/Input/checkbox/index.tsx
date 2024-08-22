import { useRef } from "react"
import { Icons } from "../../../assets/icons/icons"
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
  onChange: (value: boolean | string, isChecked: boolean) => void
  fromForm: false
  value: string[]
  options: { key: any; value: string }[]
}

type Props = TInputCheckbox & (TFromForm | TNormal)

const InputCheckbox = (props: Props) => {
  const inptRef = useRef<HTMLInputElement>(null)

  const { label, value, onChange, fromForm } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange("title", e.target.value)
  }

  const toggle = (o?: any) => {
    if (o)
      fromForm
        ? onChange("checked", !value.checked)
        : onChange(o.key, value.includes(o.key))
  }

  const focusInput = () => {
    inptRef.current?.focus()
  }

  return (
    <S.Wrapper>
      <S.Area>
        <S.Label>{label}</S.Label>
        <S.Main
          $fromForm={fromForm}
          onClick={fromForm ? focusInput : undefined}
        >
          {fromForm ? (
            <>
              <S.CheckArea>
                <Icons.Check />
              </S.CheckArea>
              <S.Input
                ref={inptRef}
                placeholder={label}
                value={value.title}
                onChange={handleChange}
              />
            </>
          ) : (
            <S.OptionsArea>
              {props.options.map((o, k) => (
                <S.Option key={k} onClick={() => toggle(o)}>
                  <S.CheckArea>
                    {(value as any[]).includes(o.key) && <Icons.Check />}
                  </S.CheckArea>
                  <span>{o.value}</span>
                </S.Option>
              ))}
            </S.OptionsArea>
          )}
        </S.Main>
      </S.Area>
    </S.Wrapper>
  )
}

export default InputCheckbox
