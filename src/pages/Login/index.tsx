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
import { TUser } from "../../utils/@types/data/user"

const userAdminData: any = {
  id: "user-1",
  status: "active",
  profile: "ADMIN",
  name: "StatusTech",
  surname: "Top",
  email: "ADMIN@email.com",
  image: null,
}

// @ts-ignore
const userManagerData: TUser = {
  id: 111,
  userId: 111,
  status: "ATIVO",
  profile: "SINDICO",
  name: "StatusTech",
  surname: "Company",
  email: "MANAGER@email.com",
  photo: null,
  document: {
    type: "cpf",
    register: "111.111.111-11",
    date: new Date().toISOString(),
  },
  since: new Date().toISOString(),
  experience: "13",
  condos: [],
}

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

  const handleForm = (field: keyof typeof form, v: string) => {
    setForm({ ...form, [field]: v })
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    const errors = checkErrors.login(form)

    if (!errors.has) {
      if (form.email === "MANAGER@email.com") {
        localStorage.setItem(
          "token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25kaGVscCIsInN1YiI6Im5hcG9sZWFvQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiUk9MRV9BRE1JTiIsImV4cCI6MTczMjg1NTY2OX0.2ANV9Fa2QpMGEPS_H55wGe6q7gjUR2yrFz0jhCdGHqI"
        )
        controllers.user.setData(userManagerData)
        navigate("/dashboard")
      } else {
        const auth = await Api.auth.login({
          usuario: form.email,
          senha: form.pass,
        })

        if (auth.ok) {
          controllers.user.setData(userAdminData)
          navigate("/dashboard")
        } else {
          controllers.feedback.setData({
            state: "error",
            message: auth.error,
            visible: true,
          })
        }
      }
    } else {
      controllers.feedback.setData({
        state: "error",
        message: "Verifique os dados e tente novamente.",
        visible: true,
      })
    }

    setSubmitting(false)
  }

  const handleRecoveryMail = () => {
    // ...
    setContent("passmailSent")
  }

  const handleNewAccount = () => {
    // ...
    setContent("createAccount")
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
              type={"mail"}
              placeholder={"Senha"}
              value={pass}
              onChange={(v: any) => setPass(v)}
            />
            <Button
              type={"main"}
              text={"Criar minha conta"}
              action={handleRecoveryMail}
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
