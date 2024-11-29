import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Button from "../../../Button"

import { Icons } from "../../../../assets/icons/icons"
import Input from "../../../Input"
import { useState } from "react"

type Props = {
  data: {
    title: string
  }
  onClose: () => void
  handleOp?: () => void
}

const DeleteConfirm = ({ data, onClose, handleOp }: Props) => {
  const [confirm, setConfirm] = useState(false)

  const handleSubmit = () => {
    if (handleOp) handleOp()
    onClose()
  }

  const handleClose = () => {
    onClose()
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
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <S.ContentArea>
          <Icons.AlertThin />
          <S.Message>
            Tem certeza que deseja excluir? Esta ação não pode ser desfeita.
          </S.Message>
        </S.ContentArea>

        <Input.Multiple
          field="confirm"
          value={confirm ? ["confirm"] : []}
          onChange={() => setConfirm(!confirm)}
          options={[{ key: "confirm", value: "Sim tenho certeza" }]}
        />

        <S.Bottom>
          <Button
            disabled={!confirm}
            type="main"
            text="Excluir"
            action={handleSubmit}
            fit={true}
          />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default DeleteConfirm
