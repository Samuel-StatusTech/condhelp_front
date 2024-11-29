import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Button from "../../../Button"

import { Icons } from "../../../../assets/icons/icons"

type Props = {
  data: {
    message: string
  }
  onClose: () => void
  handleOp?: () => void
}

const SuccessFeedback = ({ data, onClose, handleOp }: Props) => {
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
            <C.ModalTitle>Sucesso!</C.ModalTitle>
            <C.CloseBtn onClick={handleClose}>
              <CloseIcon />
            </C.CloseBtn>
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <S.ContentArea>
          <Icons.CheckCircle />
          <S.Message>{data.message}</S.Message>
        </S.ContentArea>

        <S.Bottom>
          <Button
            type="main"
            text="Visualizar"
            action={handleSubmit}
            fit={true}
          />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default SuccessFeedback
