import * as S from "./styled"
import { ReactComponent as Logo } from "../../assets/icons/named_logo.svg"
import { useEffect, useState } from "react"
import Input from "../../components/Input/login"
import initials from "../../utils/initials"
import Button from "../../components/Button"
import Feedback from "../../components/Feedback"
import { useNavigate } from "react-router-dom"
import { getStore } from "../../store"
import { TUser } from "../../utils/@types/data/user"

const fixedAuth = {
  email: "email@email.com",
  pass: "123456",
}

const userData: TUser = {
  name: "StatusTech",
  surname: "Top",
  level: "master",
  id: "id1",
  email: "email@email.com",
  company: {
    id: "id-empresa-1",
    name: "Empresa legal 123",
  },
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
  const [feedback, setFeedback] = useState<any>({
    type: "failure",
    text: "Houve um erro. Tente novamente mais tarde.",
    state: false,
  })

  const handleForm = (field: keyof typeof form, v: string) => {
    setForm({ ...form, [field]: v })
  }

  const login = async (): Promise<{ ok: boolean }> => {
    return new Promise((resolve) => {
      let ok = true

      if (!form.email || !form.pass) ok = false
      else if (form.email !== fixedAuth.email || form.pass !== fixedAuth.pass)
        ok = false

      resolve({ ok })
    })
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    // ...
    setTimeout(async () => {
      setSubmitting(false)

      const credentials = await login() // Api.login({ ... })

      if (!credentials.ok) {
        setFeedback({ ...feedback, state: true })

        setTimeout(() => {
          setFeedback({ ...feedback, state: false })
        }, 3000)
      } else {
        // ... store data
        controllers.user.setData(userData)

        navigate("/dashboard")
      }
    }, 1000)
  }

  const handleRecoveryMail = () => {
    // ...
    setContent("passmailSent")
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
      <Feedback {...feedback} />
      <Logo />
      <S.FormContainer>{renderContent()}</S.FormContainer>
    </S.Page>
  )
}

export default Login
