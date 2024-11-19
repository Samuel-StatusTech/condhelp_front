import * as S from "./styled"
import { ReactComponent as Logo } from "../../assets/icons/logo_full.svg"
import { useEffect, useState } from "react"
import Input from "../../components/Input/login"
import initials from "../../utils/initials"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { getStore } from "../../store"

const fixedAuth = {
  email: "email@email.com",
  pass: "123456",
}

const userAdminData: any = {
  id: "user-1",
  status: "active",
  profile: "admin",
  name: "StatusTech",
  surname: "Top",
  email: "admin@email.com",
  image: null,
}

const userBranchData: any = {
  id: "user-1",
  status: "active",
  profile: "branch",
  name: "StatusTech",
  surname: "Top",
  email: "branch@email.com",
  image: null,
}

const userFranchiseData: any = {
  id: "user-1",
  status: "active",
  profile: "franchise",
  name: "StatusTech",
  surname: "Top",
  email: "franchise@email.com",
  image: null,
}

const userManagerData: any = {
  id: "user-1",
  status: "active",
  profile: "manager",
  name: "StatusTech",
  surname: "Top",
  email: "manager@email.com",
  image: null,
}

const userProviderData: any = {
  id: "user-1",
  status: "active",
  profile: "provider",
  name: "StatusTech",
  surname: "Top",
  email: "provider@email.com",
  image: null,
}

const userData = {
  admin: userAdminData,
  branch: userBranchData,
  franchise: userFranchiseData,
  manager: userManagerData,
  provider: userProviderData,
}

const Login = () => {
  const navigate = useNavigate()

  const { controllers } = getStore()

  const [form, setForm] = useState(initials.forms.login)
  const [submitting, setSubmitting] = useState(false)
  const [recoveryEmail, setRecoveryEmail] = useState("")
  const [content, setContent] = useState<
    "normal" | "passmail" | "passmailSent"
  >("normal")

  const handleForm = (field: keyof typeof form, v: string) => {
    setForm({ ...form, [field]: v })
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    // ...
    setTimeout(async () => {
      setSubmitting(false)
      const emailrole = form.email.split("@")[0] as any

      // @ts-ignore
      const info = userData[emailrole]

      if (info) {
        // ... store data
        // @ts-ignore

        if (form.pass === fixedAuth.pass) {
          controllers.user.setData(info)
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
          message:
            "Usuário não encontrado. Verifique os dados e tente novamente.",
          visible: true,
        })
      }
    }, 1000)
  }

  const handleRecoveryMail = () => {
    // ...
    setContent("passmailSent")
  }

  const handleNewAccount = () => {
    // ...
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
      default:
        return dft
    }
  }

  useEffect(() => {
    controllers.user.clear()
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
