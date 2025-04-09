import * as S from "./styled"
import { ReactComponent as Logo } from "../../assets/icons/logo_full.svg"
import { useEffect, useState } from "react"
import Button from "../../components/Button"
import { getStore } from "../../store"
import SPDefault from "./subpages/Default"
import Modal from "../../components/Modal"
import SPPassmail from "./subpages/Passmail"
import { Api } from "../../api"

const Login = () => {
  const { controllers } = getStore()

  const [content, setContent] = useState<
    "normal" | "passmail" | "passmailSent" | "createAccount"
  >("normal")

  const [recoveryEmail, setRecoveryEmail] = useState("")

  const handleRecoveryMail = async (email: string) => {
    // ...
    try {
      const req = await Api.auth.requestPasswordLink({ email: email })

      if (req.ok) {
        setContent("passmailSent")
        setRecoveryEmail(email)
        return true
      } else throw new Error()
    } catch (error) {
      return false
    }
  }

  const renderContent = () => {
    switch (content) {
      case "normal":
        return <SPDefault forgottenPass={() => setContent("passmail")} />
      case "passmail":
        return (
          <SPPassmail
            backToLogin={() => setContent("normal")}
            handleRecoveryMail={handleRecoveryMail}
          />
        )
      case "passmailSent":
        return (
          <>
            <S.StepTitle>Sucesso!</S.StepTitle>
            <S.StepDescription>
              Um e-mail de recuperação foi enviado para:{" "}
              <strong>{recoveryEmail}</strong>
            </S.StepDescription>
            <Button
              type={"main"}
              text={"Fazer login"}
              action={() => {
                setRecoveryEmail("")
                setContent("normal")
              }}
            />
          </>
        )
      default:
        return null
    }
  }

  useEffect(() => {
    controllers.user.clear()
    localStorage.removeItem("token")
  }, [controllers])

  return (
    <S.Page>
      <Modal />
      <Logo />
      <S.FormContainer>
        <span>ACESSO AO SISTEMA</span>
        {renderContent()}
      </S.FormContainer>
    </S.Page>
  )
}

export default Login
