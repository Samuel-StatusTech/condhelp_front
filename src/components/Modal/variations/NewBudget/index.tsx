import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Input from "../../../Input"
import { useState } from "react"
import initials from "../../../../utils/initials"
import { Icons } from "../../../../assets/icons/icons"
import Button from "../../../Button"
import { Divider } from "@mui/material"

type Props = {
  data: {
    id: string
    title: string
    points: number
    concluded: string | boolean

    user: any
  }
  onClose: () => void
  handleOp?: (op: string) => void
}

const NewBudget = ({ data, onClose, handleOp }: Props) => {
  const [update, setUpdate] = useState({
    ...data,
    ...initials.modals.goalApprove,
  })

  const handleClose = () => {
    onClose()
  }

  const handleField = (field: string, value: boolean | string) => {
    if (field === "points") {
      setUpdate((u) => ({ ...u, points: u.points + +value }))
    } else setUpdate((u) => ({ ...u, [field]: value }))
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
      <Divider />
      <S.Content>
        <span>{update.progress}</span>
        <S.PointsArea>
          <span>Defina a pontuação</span>
          <S.PointsControl>
            <S.PointsButton onClick={() => handleField("points", "-5")}>
              <Icons.Minus />
            </S.PointsButton>
            <S.PointsNumber>{update.points}</S.PointsNumber>
            <S.PointsButton onClick={() => handleField("points", "+5")}>
              <Icons.Plus />
            </S.PointsButton>
          </S.PointsControl>
        </S.PointsArea>
        <Input.Default
          field="comment"
          label="Informe o motivo da alteração na pontuação"
          onChange={handleField}
          value={update.comment}
          placeholder="Motivo escrito aqui"
        />
        <S.Bottom>
          <Button type="main" text="Salvar alterações" action={onClose} />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default NewBudget
