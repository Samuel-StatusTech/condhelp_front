import * as S from "./styled"
import { ReactComponent as Logo } from "../../assets/icons/logo_full.svg"
import { useEffect, useState } from "react"
import Input from "../../components/Input/login"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { getStore } from "../../store"
import { checkErrors } from "../../utils/tb/checkErrors"
import { Api } from "../../api"
import { Icons } from "../../assets/icons/icons"

const ResetPassPage = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [content, setContent] = useState<"normal" | "passReseted">("normal")

  const [submitting, setSubmitting] = useState(false)
  const [recoveringEmail, setRecoveringEmail] = useState("")

  const [recoverPass, setRecoverPass] = useState("")
  const [recoverPass2, setRecoverPass2] = useState("")
  const [isRobot, setIsRobot] = useState(true)

  const handleSubmit = async () => {
    try {
      setSubmitting(true)

      const newPassErrors = checkErrors.resetPass({
        newPass1: recoverPass,
        newPass2: recoverPass2,
      })

      if (!newPassErrors.has || isRobot) {
        const reset = await Api.auth.resetPassword({
          username: recoveringEmail,
          newPassword: recoverPass,
        })

        if (reset.ok) handlePassReseted()
        else {
          controllers.feedback.setData({
            state: "error",
            message: reset.error,
            visible: true,
          })
        }
      } else {
        controllers.feedback.setData({
          state: "error",
          message: "Verifique os dados e tente novamente.",
          visible: true,
        })
      }

      setSubmitting(false)
    } catch (error: any) {
      // ...
      controllers.feedback.setData({
        state: "error",
        message: error.message ?? "Houve um erro. Tente novamente mais tarde",
        visible: true,
      })
      setSubmitting(false)
    }
  }

  const handlePassReseted = () => {
    // ...
    setContent("passReseted")
  }

  const goToLogin = () => {
    navigate("/login")
  }

  const renderContent = () => {
    switch (content) {
      case "normal":
        return (
          <>
            <S.StepTitle>Cadastrar nova senha</S.StepTitle>
            <S.StepDescription>
              Informe a nova senha de acesso para:
              <br /> <label>{recoveringEmail}</label>
            </S.StepDescription>
            <Input
              type={"pass"}
              placeholder={"Digite sua nova senha"}
              value={recoverPass}
              onChange={(v: any) => setRecoverPass(v)}
            />
            <Input
              type={"pass"}
              placeholder={"Confirme sua nova senha"}
              value={recoverPass2}
              onChange={(v: any) => setRecoverPass2(v)}
            />
            <S.RecaptchaArea>
              <S.RContent onClick={() => setIsRobot(!isRobot)}>
                <S.RCheckbox $checked={!isRobot}>
                  {!isRobot && <Icons.Check />}
                </S.RCheckbox>
                <span>Não sou um robô</span>
              </S.RContent>
            </S.RecaptchaArea>
            <Button
              type={"main"}
              text={"Recuperar minha senha"}
              action={!(submitting || isRobot) ? handleSubmit : () => {}}
              disabled={
                submitting ||
                isRobot ||
                !recoverPass.trim() ||
                !recoverPass2.trim()
              }
            />
            <S.Subaction onClick={goToLogin}>
              Voltar para a tela de login
            </S.Subaction>
          </>
        )
      case "passReseted":
        return (
          <>
            <S.StepTitle>Sucesso!</S.StepTitle>
            <S.StepDescription>
              Sua senha foi redefinida. Faça login para entrar na plataforma.
            </S.StepDescription>
            <Button
              type={"main"}
              text={"Fazer login"}
              action={() => {
                setRecoveringEmail("")
                goToLogin()
              }}
            />
          </>
        )
      default:
        return null
    }
  }

  const getTokenInfo = () => {
    // get email from token
    setRecoveringEmail("email@gmail.com")
  }

  useEffect(() => {
    // getTokenData - project jwt decode

    getTokenInfo()
    controllers.user.clear()
    localStorage.removeItem("token")
  }, [controllers])

  return (
    <S.Page>
      <Logo />
      <S.FormContainer>{renderContent()}</S.FormContainer>
    </S.Page>
  )
}

export default ResetPassPage
