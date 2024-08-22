import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Input from "../../../Input"
import { useState } from "react"
import initials from "../../../../utils/initials"
import { Icons } from "../../../../assets/icons/icons"
import Button from "../../../Button"

type Props = {
  data: {
    id: string
    title: string
    points: number
    concluded: string | boolean

    user: any
  }
  onClose: () => void
}

const GoalApprove = ({ data, onClose }: Props) => {
  const [update, setUpdate] = useState({
    ...data,
    ...initials.modals.goalApprove,
  })

  const handleClose = () => {
    onClose()
  }

  const handleField = (field: string, value: boolean | string) => {
    setUpdate((u) => ({ ...u, [field]: value }))
  }

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>{data.title}</C.ModalTitle>
            <C.CloseBtn onClick={handleClose}>
              <CloseIcon />
            </C.CloseBtn>
          </C.HeaderMain>
          <S.UserArea>
            {data.user.profile ? (
              <img src={data.user.profile} alt={""} />
            ) : (
              <Icons.Users />
            )}
            <S.UserNameArea>
              <S.UserName>{data.user.name}</S.UserName>
              <S.UserPoints>
                {data.user.points} ponto{data.user.points > 0 ? "s" : ""}
              </S.UserPoints>
            </S.UserNameArea>
          </S.UserArea>
        </C.HeaderDefault>
      </C.Header>
      <S.Content>
        <Input.Default
          field="progress"
          label="Descreva o que fez essa semana para avançar com seu OKR *"
          onChange={handleField}
          value={update.progress}
          placeholder="Resposta do funcionário"
        />
        <Input.Multiple
          label="Seu OKR do mês está concluso? *"
          onChange={(v) => handleField("concluded", v)}
          options={[
            { key: true, value: "Sim" },
            { key: false, value: "Não" },
          ]}
          value={update.concluded}
          fromForm={false}
        />
        <Input.Default
          field="comment"
          label="Algum comentário importante?"
          onChange={handleField}
          value={update.comment}
          placeholder="Resposta do funcionário"
        />
        <Input.Select
          field="status"
          label="Alterar status"
          onChange={handleField}
          options={[
            { key: "awaiting", value: "Aguardando" },
            { key: "denied", value: "Reprovada" },
            { key: "approved", value: "Aprovada" },
          ]}
          value={update.status}
        />
        <S.Bottom>
          <Button type="main" text="Salvar alterações" action={onClose} />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default GoalApprove
