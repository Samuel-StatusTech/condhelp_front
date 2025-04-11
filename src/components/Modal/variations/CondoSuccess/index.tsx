import * as C from "../../styled"
import * as S from "./styled"

import Button from "../../../Button"

import { Icons } from "../../../../assets/icons/icons"

type Props = {
  data: {
    message: string
  }
  onClose: () => void
  handleOp?: () => void
}

const CondoSuccess = ({ onClose }: Props) => {
  const handleClose = () => {
    if (onClose) onClose()
  }

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <Icons.Logo width={32} height={32} />

            <C.CloseBtn onClick={handleClose}>
              <Icons.Close />
            </C.CloseBtn>
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <S.ModalTitle>Condomínio cadastrado com sucesso</S.ModalTitle>

        <S.Message>Você está a um passo de solicitar orçamentos.</S.Message>

        <S.Message $bold={true}>
          Aguarde. Estamos analisando o documento informado.
        </S.Message>

        <S.Bottom>
          <Button type="main" text="Concluir" action={handleClose} fit={true} />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default CondoSuccess
