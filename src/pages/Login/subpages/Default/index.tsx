import * as S from "../../styled"

import Input from "../../../../components/Input/login"
import Button from "../../../../components/Button"
import { useEffect, useState } from "react"
import { getStore } from "../../../../store"
import { TUManager, TUserProfile } from "../../../../utils/@types/data/user"
import { useNavigate, useSearchParams } from "react-router-dom"
import { TAccess } from "../../../../utils/@types/data/access"
import { Api } from "../../../../api"
import { getTokenData } from "../../../../utils/tb/helpers/getTokenData"
import { checkErrors } from "../../../../utils/tb/checkErrors"
import { TUProvider } from "../../../../utils/@types/data/_user/provider"
import { validEmail } from "../../../../utils/tb/checkErrors/email"

type Props = {
  forgottenPass: () => void
}

const managerFormUrl = "https://condhelp.com/sindico"

const SPDefault = ({ forgottenPass }: Props) => {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const { controllers } = getStore()

  const [incomingEmail, setIncomingEmail] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const paramEmail = params.get("email")

    if (!incomingEmail) {
      if (paramEmail && validEmail(paramEmail)) {
        setIncomingEmail(paramEmail)
        setEmail(paramEmail)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const clearFields = () => {
    setEmail("")
    setPass("")
  }

  const handleForgetPass = () => {
    clearFields()
    forgottenPass()
  }

  const handleAcception = async (userId: number) => {
    setSubmitting(true)

    let res = false

    try {
      const req = await Api.auth.acceptTerms({ userId })

      if (req.ok) res = true
      else throw new Error()
    } catch (error) {
      res = false
    }

    setSubmitting(false)
    return res
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      const errors = checkErrors.login({ email, pass })

      if (!errors.has) {
        const auth = await Api.auth.login({
          usuario: email,
          senha: pass,
        })

        if (auth.ok) {
          const tokenData = getTokenData(auth.data.token)

          const userDataReq = await Api.persons.getSingle(
            {
              id: auth.data.userId,
              profile: tokenData.userType as TAccess,
            },
            true,
            auth.data.userAccount
          )

          if (userDataReq.ok) {
            if (
              (["PRESTADOR", "SINDICO"] as TAccess[]).includes(
                userDataReq.data.profile
              )
            ) {
              if (!(userDataReq.data as TUManager | TUProvider).termsAccepted) {
                controllers.modal.open({
                  role: "terms",
                  visible: true,
                  width: "sm",
                  data: {
                    profile: userDataReq.data.profile,
                  },
                  handleOp: async () => {
                    controllers.modal.close()

                    console.log(userDataReq.data)
                    const acception = await handleAcception(
                      userDataReq.data.userId
                    )

                    if (acception) {
                      controllers.user.setData(userDataReq.data)
                      navigate("/dashboard", {
                        state: {
                          resetPass: auth.data.renewPassword,
                        },
                      })
                    } else {
                      controllers.feedback.setData({
                        state: "error",
                        message:
                          "Houve um erro ao aceitar os termos. Tente novamente mais tarde",
                        visible: true,
                      })
                    }
                  },
                  onClose: () => {
                    controllers.feedback.setData({
                      state: "alert",
                      message: "Realize o login novamente.",
                      visible: true,
                    })
                  },
                })
              } else {
                controllers.user.setData(userDataReq.data)
                navigate("/dashboard", {
                  state: {
                    resetPass: auth.data.renewPassword,
                  },
                })
              }
            } else {
              controllers.user.setData(userDataReq.data)
              navigate("/dashboard", {
                state: {
                  resetPass: auth.data.renewPassword,
                },
              })
            }
          } else {
            controllers.feedback.setData({
              state: "error",
              message: "Verifique os dados e tente novamente.",
              visible: true,
            })
          }
        } else {
          controllers.feedback.setData({
            state: "error",
            message: auth.error,
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

  const handleProviderNewAccount = () => {
    const aLink = document.createElement("a")
    aLink.href =
      "https://wa.me/5548999918804?text=Olá gostaria de ser um prestador de serviço."
    aLink.target = "_blank"
    aLink.click()

    aLink.remove()
  }

  const handleManagerNewAccount = () => {
    const aLink = document.createElement("a")
    aLink.href = managerFormUrl
    aLink.target = "_blank"
    aLink.click()

    aLink.remove()
  }

  const handleNewAccountType = (accountType: TUserProfile) => {
    controllers.modal.close()

    if (accountType === "SINDICO") handleManagerNewAccount()
    else if (accountType === "PRESTADOR") handleProviderNewAccount()
    else {
      controllers.feedback.setData({
        message:
          "Não é possível criar uma conta desse tipo por aqui. Por favor entre em contato conosco.",
        state: "alert",
        visible: true,
      })
    }
  }

  const handleNewAccount = () => {
    controllers.modal.open({
      role: "newAccountType",
      visible: true,
      handleOp: handleNewAccountType,
      width: "sm",
    })
  }

  return (
    <>
      <Input
        type={"mail"}
        placeholder={"E-mail"}
        value={email}
        onChange={(v) => setEmail(v as any)}
        avoidAutoCap={true}
      />
      <Input
        type={"pass"}
        placeholder={"Senha"}
        value={pass}
        onChange={(v) => setPass(v as any)}
        onEnter={handleSubmit}
        avoidAutoCap={true}
      />
      <Button
        type={"main"}
        text={submitting ? "Carregando..." : "Acessar"}
        action={submitting ? () => {} : handleSubmit}
      />
      <S.Subaction onClick={handleForgetPass}>Esqueci minha senha</S.Subaction>
      <S.NewAccount style={{ display: "flex", flexDirection: "column" }}>
        <span>Ainda não tem cadastro?</span>
        <S.Subaction onClick={handleNewAccount}>Criar minha conta</S.Subaction>
      </S.NewAccount>
    </>
  )
}

export default SPDefault
