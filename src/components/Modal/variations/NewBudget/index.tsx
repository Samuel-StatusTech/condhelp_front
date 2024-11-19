import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Input from "../../../Input"
import { useState } from "react"
import initials from "../../../../utils/initials"

import Button from "../../../Button"
import { TNewBudget } from "../../../../utils/@types/data/budget"

type Props = {
  data?: any
  onClose: () => void
  handleOp?: (op: string) => void
}

const NewBudget = ({ data, onClose, handleOp }: Props) => {
  const [form, setForm] = useState<TNewBudget>({
    ...initials.modals.newBudget,
  })

  const handleClose = () => {
    onClose()
  }

  const handleField = (field: string, value: boolean | string) => {
    if (field === "points") {
      // setForm((f) => ({ ...f, points: f.points + +value }))
    } else setForm((f) => ({ ...f, [field]: value }))
  }

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>Novo Orçamento</C.ModalTitle>
            <C.CloseBtn onClick={handleClose}>
              <CloseIcon />
            </C.CloseBtn>
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <Input.Default
          field={"title"}
          onChange={handleField}
          value={form.title}
          gridSizes={{ big: 12 }}
          label="Título"
          placeholder="Digite aqui"
        />
        <S.Bottom>
          <Button type="main" text="Salvar alterações" action={onClose} />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default NewBudget
