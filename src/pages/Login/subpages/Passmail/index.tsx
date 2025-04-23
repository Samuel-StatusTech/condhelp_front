import * as S from "../../styled"

import Input from "../../../../components/Input/login"
import Button from "../../../../components/Button"
import { useState } from "react"
import { getStore } from "../../../../store"
import { validEmail } from "../../../../utils/tb/checkErrors/email"

type Props = {
  backToLogin: () => void
  handleRecoveryMail: (recoveryEmail: string) => Promise<boolean>
}

const SPPassmail = ({ backToLogin, handleRecoveryMail }: Props) => {
  const { controllers } = getStore()

  const [recoveryEmail, setRecoveryEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const clearFields = () => {
    setRecoveryEmail("")
  }

  const finish = async () => {
    if (!submitting) {
      setSubmitting(true)
      const recovery = await handleRecoveryMail(recoveryEmail)
      if (recovery) clearFields()
      else {
        controllers.feedback.setData({
          message:
            "Não foi possível enviar o link no momento. Tente novamente mais tarde.",
          state: "alert",
          visible: true,
        })
      }
      setSubmitting(false)
    }
  }

  const handleAction = () => {
    if (!!recoveryEmail && validEmail(recoveryEmail)) finish()
    else {
      controllers.feedback.setData({
        message: "Digite um email válido",
        state: "alert",
        visible: true,
      })
    }
  }

  return (
    <>
      <S.StepTitle>Esqueci minha senha</S.StepTitle>
      <S.StepDescription>
        Se você esqueceu sua senha, informe
        <br /> seu e-mail de acesso para que um link
        <br /> de recuperação seja enviado.
      </S.StepDescription>
      <Input
        type={"mail"}
        placeholder={"E-mail"}
        value={recoveryEmail}
        onChange={(v: any) => setRecoveryEmail(v)}
        avoidAutoCap={true}
      />
      <Button
        type={"main"}
        text={"Recuperar minha senha"}
        action={!submitting ? handleAction : () => {}}
        disabled={submitting}
      />
      <S.Subaction onClick={backToLogin}>
        Voltar para a tela de login
      </S.Subaction>
    </>
  )
}

export default SPPassmail
