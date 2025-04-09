import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Button from "../../../Button"
import { useState } from "react"
import { TUserProfile } from "../../../../utils/@types/data/user"
import { Icons } from "../../../../assets/icons/icons"

/*
 * Profile Option
 */

type OptionProps = {
  active: boolean
  label: string
  onChange: (v: TUserProfile) => void
  value: TUserProfile
}

const ProfileOption = ({ active, label, onChange, value }: OptionProps) => {
  const handleClick = () => {
    onChange(value)
  }

  return (
    <S.ProfileOption $active={active} onClick={handleClick}>
      <S.POIndicator $active={active} />
      <S.POLabel>{label}</S.POLabel>
    </S.ProfileOption>
  )
}

/*
 * Component
 */

type Props = {
  data?: any
  onClose?: () => void
  handleOp?: (profile: TUserProfile) => Promise<boolean>
}

const NewAccountType = ({ data, onClose, handleOp }: Props) => {
  const [accountType, setAccountType] = useState<TUserProfile>("PRESTADOR")

  const handleClose = () => {
    if (onClose) onClose()
  }

  const handleContinue = () => {
    if (handleOp) handleOp(accountType)
    if (onClose) onClose()
  }

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <Icons.Logo width={24} height={24} />

            {onClose && (
              <C.CloseBtn onClick={handleClose}>
                <CloseIcon />
              </C.CloseBtn>
            )}
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <S.ModalTitle>Estamos ansiosos para ter você conosco!</S.ModalTitle>

        <S.Message>
          Queremos te conhecer melhor. Em que perfil você se encaixa?
        </S.Message>
        <S.Row>
          <ProfileOption
            active={accountType === "PRESTADOR"}
            label={"Prestador de serviço"}
            onChange={setAccountType}
            value="PRESTADOR"
          />
          <ProfileOption
            active={accountType === "SINDICO"}
            label={"Síndico"}
            onChange={setAccountType}
            value="SINDICO"
          />
        </S.Row>

        <S.Bottom>
          <Button
            type="main"
            text={"Iniciar cadastro"}
            action={handleContinue}
          />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default NewAccountType
