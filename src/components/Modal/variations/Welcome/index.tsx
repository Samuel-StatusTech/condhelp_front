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

const WelcomeModal = ({ handleOp }: Props) => {
  const handleUpdatePassword = () => {
    if (handleOp) handleOp()
  }

  return (
    <S.Element>
      <S.Content>
        <Icons.Logo width={48} height={48} />

        <S.ModalTitle>Feliz em ter você por aqui!</S.ModalTitle>

        <S.Message>
          Estamos sempre trabalhando para você ter a amelhor experiência. A
          partir de agora, você terá acesso a CONDHELP, uma plataforma
          desenvolvida especialmente para você.
        </S.Message>

        <S.Message $bold={true}>
          Agora só falta atualizar a sua senha, vamos lá?
        </S.Message>

        <S.Bottom>
          <Button
            type="main"
            text="Alterar senha"
            action={handleUpdatePassword}
            fit={true}
          />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default WelcomeModal
