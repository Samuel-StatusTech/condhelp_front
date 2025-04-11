import { useState } from "react"
import * as C from "../../styled"
import * as S from "./styled"

import { terms } from "./text"
import { Icons } from "../../../../assets/icons/icons"

type Props = {
  data?: {
    profile: "SINDICO" | "PRESTADOR"
  }
  onClose: () => void
  handleOp?: () => void
}

const TermsModal = ({ data, onClose, handleOp }: Props) => {
  const [accepted, setAccepted] = useState(false)

  const handleSubmit = () => {
    if (accepted && handleOp) {
      handleOp()
      setAccepted(false)
    }
  }

  const handleCancel = () => {
    if (onClose) onClose()
  }

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle />
            <C.CloseBtn onClick={handleCancel}>
              <Icons.Close />
            </C.CloseBtn>
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>
      <S.Content>
        <S.Row>
          <S.TermsContent>
            {data &&
              terms[data?.profile].map((t, tk) =>
                t.type === "documentTitle" ? (
                  <S.TermTitle key={tk} $documentTitle={true}>
                    {t.content}
                  </S.TermTitle>
                ) : t.type === "title" ? (
                  <S.TermTitle key={tk}>{t.content}</S.TermTitle>
                ) : t.type === "text" ? (
                  <S.TermText key={tk}>{t.content}</S.TermText>
                ) : (
                  <S.Divider />
                )
              )}

            <S.TermsAcceptArea
              $active={accepted}
              onClick={() => setAccepted(!accepted)}
            >
              <S.TAIndicator $active={accepted} />
              <S.TALabel>Aceito os termos.</S.TALabel>
            </S.TermsAcceptArea>

            <S.Bottom>
              <S.Button
                $disabled={!accepted}
                onClick={accepted ? handleSubmit : () => {}}
              >
                Continuar
              </S.Button>
            </S.Bottom>
          </S.TermsContent>
        </S.Row>
      </S.Content>
    </S.Element>
  )
}

export default TermsModal
