import { useState } from "react"
import * as C from "../../styled"
import * as S from "./styled"

import { TErrorsCheck } from "../../../../utils/@types/helpers/checkErrors"

import Input from "../../../Input"

import Button from "../../../Button"
import { checkErrors } from "../../../../utils/tb/checkErrors"

type Props = {
  data?: any
  onClose: () => void
  handleOp?: (newPass: string) => Promise<void>
}

const ResetPassword = ({ handleOp }: Props) => {
  const [form, setForm] = useState({
    newPass1: "",
    newPass2: "",
  })

  const [submitting, setSubmitting] = useState(false)

  const [errors, setErrors] = useState<TErrorsCheck>({
    fields: [],
    has: false,
  })

  const handleSubmit = async () => {
    setSubmitting(true)

    const errorsCheck = updateErrors()

    if (!errorsCheck.has) {
      const newPass = form.newPass1

      if (handleOp) await handleOp(newPass)
    } else {
      setErrors(errorsCheck)
    }

    setSubmitting(false)
  }

  const handleField = (field: string, value: boolean | string) => {
    if (errors.fields.includes(field)) {
      const newFieldsList = errors.fields.filter(
        (errorItem) => errorItem !== field
      )
      setErrors({
        fields: newFieldsList,
        has: newFieldsList.length > 0,
      })
    }

    setForm((f) => ({ ...f, [field]: value }))
  }

  const updateErrors = () => {
    return checkErrors.resetPass(form)
  }

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>Nova senha</C.ModalTitle>
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <S.Row>
          <Input.Password
            field={"newPass1"}
            onChange={handleField}
            value={form.newPass1}
            gridSizes={{ big: 12 }}
            placeholder="Digite sua senha"
            error={{
              has: errors.fields.includes("newPass1"),
              message: "As senhas não correspondem",
            }}
          />
        </S.Row>

        <S.Row>
          <Input.Password
            field={"newPass2"}
            onChange={handleField}
            value={form.newPass2}
            gridSizes={{ big: 12 }}
            placeholder="Digite sua senha"
            error={{
              has: errors.fields.includes("newPass2"),
              message: "As senhas não correspondem",
            }}
          />
        </S.Row>

        <S.Bottom>
          <Button
            type="main"
            text={submitting ? "Enviando..." : "Alterar senha"}
            action={!submitting ? handleSubmit : () => {}}
            disabled={errors.has || submitting}
          />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default ResetPassword
