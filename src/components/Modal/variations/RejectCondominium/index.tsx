import { useState } from "react"
import * as C from "../../styled"
import * as S from "./styled"

import { TErrorsCheck } from "../../../../utils/@types/helpers/checkErrors"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Input from "../../../Input"

import Button from "../../../Button"

type Props = {
  data?: any
  onClose?: () => void
  handleOp?: (condoId: number, reason: string) => Promise<void>
}

const RejectCondominium = ({ data, onClose, handleOp }: Props) => {
  const [form, setForm] = useState({
    reason: "",
  })

  const [submitting, setSubmitting] = useState(false)

  const [errors, setErrors] = useState<TErrorsCheck>({
    fields: [],
    has: false,
  })

  const clearFields = () => {
    setForm({ reason: "" })
    setErrors({ fields: [], has: false })
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    const errorsCheck = updateErrors()

    if (!errorsCheck.has) {
      if (handleOp) await handleOp(data.condoId as number, form.reason)
      clearFields()
    } else {
      setErrors(errorsCheck)
    }

    setSubmitting(false)
  }

  const handleClose = () => {
    if (onClose) onClose()
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
    return {
      has: !form.reason || form.reason.trim().length === 0,
      fields: !form.reason || form.reason.trim().length === 0 ? ["reason"] : [],
    }
  }

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>Recusar condomínio</C.ModalTitle>
            {onClose && (
              <C.CloseBtn onClick={handleClose}>
                <CloseIcon />
              </C.CloseBtn>
            )}
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <S.Row>
          <Input.TextArea
            field={"reason"}
            onChange={handleField}
            value={form.reason}
            gridSizes={{ big: 12 }}
            placeholder="Explique o motivo"
            error={{
              has: errors.fields.includes("reason"),
              message: "Esse campo é obrigatório",
            }}
          />
        </S.Row>

        <S.Bottom>
          <Button
            type="main"
            text={submitting ? "Recusando..." : "Recusar"}
            action={!submitting ? handleSubmit : () => {}}
            disabled={errors.has || submitting}
          />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default RejectCondominium
