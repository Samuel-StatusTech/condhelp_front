import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Input from "../../../Input"
import { useState } from "react"
import initials from "../../../../utils/initials"

import { TNewBudget } from "../../../../utils/@types/data/budget"

import { getStore } from "../../../../store"
import { getDateStr } from "../../../../utils/tb/format/date"
import { TMonitorContactResume } from "../../../../utils/@types/data/monitoring"

type Props = {
  data: TMonitorContactResume & {
    subCategoryName: string
  }
  onClose: () => void
  handleOp?: (newBudget: TNewBudget) => void
}

const ContactInfo = ({ data, onClose }: Props) => {
  const { user } = getStore()

  const [, setForm] = useState<TNewBudget>({
    ...initials.modals.newBudget,
  })

  const handleClose = () => {
    onClose()
  }

  const handleField = (field: string, value: boolean | string) => {
    setForm((f) => ({ ...f, [field]: value }))
  }

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>Informações de contato</C.ModalTitle>
            <C.CloseBtn onClick={handleClose}>
              <CloseIcon />
            </C.CloseBtn>
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <S.DataResumeArea>
          <S.DataInfo>
            <S.DITitle>Monitor</S.DITitle>
            <S.DIValue>{user?.name}</S.DIValue>
          </S.DataInfo>
          <S.DataInfo>
            <S.DITitle>Hora</S.DITitle>
            <S.DIValue>{getDateStr(data.openingDate, "time")}</S.DIValue>
          </S.DataInfo>
          <S.DataInfo>
            <S.DITitle>Abertura</S.DITitle>
            <S.DIValue>{getDateStr(data.openingDate, "dmy")}</S.DIValue>
          </S.DataInfo>
        </S.DataResumeArea>

        <S.Row>
          <Input.ReadonlyField
            label="Categoria"
            field={"serviceCategoryId"}
            onChange={handleField}
            value={data.categoryName}
            gridSizes={{ big: 1 }}
            disabled={true}
          />

          <Input.ReadonlyField
            label="Subcategoria"
            field={"serviceSubcategoryId"}
            onChange={handleField}
            value={data.subCategoryName}
            gridSizes={{ big: 1 }}
            disabled={true}
          />
        </S.Row>

        <S.Row>
          <Input.ReadonlyTextArea
            field={"description"}
            onChange={() => {}}
            value={data.description}
            gridSizes={{ big: 12 }}
            label="Descrição"
            disabled={true}
          />
        </S.Row>

        {/* <S.Bottom>
          <Button
            type="outlined"
            text="Editar"
            action={() => setIsEditing(true)}
            greenText={true}
            icon={<Icons.Edit />}
            fit={true}
            iconLeft={true}
          />
          <Button 
            type="main"
            text="Salvar"
            action={handleSubmit}
            fit={true}
            disabled={!isEditing}
          />
        </S.Bottom> */}
      </S.Content>
    </S.Element>
  )
}

export default ContactInfo
