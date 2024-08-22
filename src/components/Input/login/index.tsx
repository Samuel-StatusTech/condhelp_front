import { ChangeEvent } from "react"
import * as S from "./styled"
import { ReactComponent as MailIcon } from "../../../assets/icons/mail_soft.svg"
import { ReactComponent as PassIcon } from "../../../assets/icons/hidepass_soft.svg"

type Props = {
  type: "mail" | "pass"
  placeholder?: string
  value: string | boolean
  onChange: (v: string | boolean) => void
}

const iconRef: { [key in Props["type"]]: JSX.Element } = {
  mail: <MailIcon />,
  pass: <PassIcon />,
}

const Input = (props: Props) => {
  const { type, placeholder, value, onChange } = props

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value as string | boolean)
  }

  const renderIcon = () => {
    const icon = iconRef[type]

    return icon ?? null
  }

  return (
    <S.Wrapper>
      <S.Input
        type={type === "pass" ? "password" : "text"}
        placeholder={placeholder}
        value={String(value)}
        onChange={handleChange}
      />
      {renderIcon()}
    </S.Wrapper>
  )
}

export default Input
