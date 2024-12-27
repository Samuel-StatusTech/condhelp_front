import * as S from "./styled"
import { ReactComponent as Logo } from "../../assets/icons/logo_full.svg"
import { useEffect, useState } from "react"
import Input from "../../components/Input/login"
import initials from "../../utils/initials"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { getStore } from "../../store"
import { checkErrors } from "../../utils/tb/checkErrors"
import { Api } from "../../api"
import { getTokenData } from "../../utils/tb/helpers/getTokenData"
import { TAccess } from "../../utils/@types/data/access"

const Login = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [content, setContent] = useState<
    "normal" | "passmail" | "passmailSent" | "createAccount"
  >("normal")

  const [form, setForm] = useState(initials.forms.login)
  const [submitting, setSubmitting] = useState(false)
  const [recoveryEmail, setRecoveryEmail] = useState("")

  // create account
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [pass2, setPass2] = useState("")

  const handleForm = (field: keyof typeof form, v: string) => {
    setForm({ ...form, [field]: v })
  }

  const handleCreateAccount = async () => {
    try {
      // const errors = checkErrors.subscribe(form)
      const errors = { has: false }

      if (!errors.has) {
        const auth = await Api.auth.register({
          usuario: form.email,
          senha: form.pass,
          tipo: "SINDICO",
        })

        if (auth.ok) {
          controllers.feedback.setData({
            state: "success",
            message: "Conta criada com sucesso.",
            visible: true,
          })
          setForm(initials.forms.login)
          setContent("normal")
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
    } catch (error: any) {
      // ...
      controllers.feedback.setData({
        state: "error",
        message: error.message ?? "Houve um erro. Tente novamente mais tarde",
        visible: true,
      })
    }
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)

      switch (content) {
        case "createAccount":
          handleCreateAccount()
          break

        case "normal":
          const errors = checkErrors.login(form)

          if (!errors.has) {
            const auth = await Api.auth.login({
              usuario: form.email,
              senha: form.pass,
            })

            if (auth.ok) {
              const tokenData = getTokenData(auth.data.token)

              const userDataReq = await Api.persons.getSingle({
                id: auth.data.userId,
                profile: tokenData.userType as TAccess,
              })

              if (userDataReq.ok) {
                controllers.user.setData(userDataReq.data)
                navigate("/dashboard")
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
          break

        default:
          break
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

  const handleRecoveryMail = () => {
    // ...
    setContent("passmailSent")
  }

  const handleNewAccount = () => {
    // ...
    setContent("createAccount")
  }

  const handleSignUp = async () => {
    // ...

    if (!!user && !!pass && !!pass2 && pass === pass2) {
      // ...
      const auth = await Api.auth.login({
        usuario: form.email,
        senha: form.pass,
      })

      if (auth.ok) {
        const userData = await Api.persons.getSingle({ id: auth.data.userId })

        if (userData.ok) {
          controllers.user.setData(userData.data)
          navigate("/dashboard")
        } else throw new Error()
      } else {
        controllers.feedback.setData({
          state: "error",
          message: auth.error,
          visible: true,
        })
      }
      setContent("createAccount")
    }
  }

  const renderContent = () => {
    const dft = (
      <>
        <Input
          type={"mail"}
          placeholder={"E-mail"}
          value={form.email}
          onChange={(v: any) => handleForm("email", v)}
        />
        <Input
          type={"pass"}
          placeholder={"Senha"}
          value={form.pass}
          onChange={(v: any) => handleForm("pass", v)}
        />
        <Button
          type={"main"}
          text={submitting ? "Carregando..." : "Acessar"}
          action={submitting ? () => {} : handleSubmit}
        />
        <S.Subaction onClick={() => setContent("passmail")}>
          Esqueci minha senha
        </S.Subaction>
        <S.NewAccount style={{ display: "flex", flexDirection: "column" }}>
          <span>Ainda não tem cadastro?</span>
          <S.Subaction onClick={handleNewAccount}>
            Criar minha conta
          </S.Subaction>
        </S.NewAccount>
      </>
    )

    switch (content) {
      case "normal":
        return dft
      case "passmail":
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
            />
            <Button
              type={"main"}
              text={"Recuperar minha senha"}
              action={handleRecoveryMail}
            />
            <S.Subaction onClick={() => setContent("normal")}>
              Voltar para a tela de login
            </S.Subaction>
          </>
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
      case "createAccount":
        return (
          <>
            <S.StepTitle>Criar conta</S.StepTitle>
            <S.StepDescription>
              Escolha um nome de usuário e uma senha para fazer crescer com a
              CONDHELP.
            </S.StepDescription>
            <Input
              type={"mail"}
              placeholder={"Usuario"}
              value={user}
              onChange={(v: any) => setUser(v)}
            />
            <Input
              type={"pass"}
              placeholder={"Senha"}
              value={pass}
              onChange={(v: any) => setPass(v)}
            />
            <Input
              type={"pass"}
              placeholder={"Confirmar senha"}
              value={pass2}
              onChange={(v: any) => setPass2(v)}
            />
            <Button
              type={"main"}
              text={"Criar minha conta"}
              action={handleSignUp}
            />
            <S.Subaction onClick={() => setContent("normal")}>
              Voltar para a tela de login
            </S.Subaction>
          </>
        )
      default:
        return dft
    }
  }

  useEffect(() => {
    controllers.user.clear()
    localStorage.removeItem("token")
  }, [controllers])

  return (
    <S.Page>
      <Logo />
      <S.FormContainer>
        <span>ACESSO AO SISTEMA</span>
        {renderContent()}
      </S.FormContainer>
    </S.Page>
  )
}

export default Login
