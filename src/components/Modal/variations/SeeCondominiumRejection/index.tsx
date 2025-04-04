import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Input from "../../../Input"

import Button from "../../../Button"

type Props = {
  data?: any
  onClose?: () => void
  handleOp?: (condoId: number, reason: string) => Promise<void>
}

const SeeCondominiumRejection = ({ data, onClose }: Props) => {
  const handleClose = () => {
    if (onClose) onClose()
  }

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>Condomínio recusado</C.ModalTitle>
            {onClose && (
              <C.CloseBtn onClick={handleClose}>
                <CloseIcon />
              </C.CloseBtn>
            )}
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <S.Row>
          <Input.TextArea
            field={"reason"}
            onChange={() => {}}
            value={data.rejectionReason}
            gridSizes={{ big: 12 }}
            placeholder=""
            nonEditable={true}
          />
        </S.Row>

        <S.Bottom>
          <Button type="main" text={"Fechar"} action={handleClose} />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default SeeCondominiumRejection
