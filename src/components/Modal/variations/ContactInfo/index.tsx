import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Input from "../../../Input"
import { useEffect, useState } from "react"
import initials from "../../../../utils/initials"

import { getStore } from "../../../../store"
import { getDateStr } from "../../../../utils/tb/format/date"
import { TMonitorContactResume } from "../../../../utils/@types/data/monitoring"
import Button from "../../../Button"
import { Icons } from "../../../../assets/icons/icons"
import Lottie from "lottie-react"

import lottieData from "../../../../assets/animations/loading.json"
import { Api } from "../../../../api"

type Props = {
  data: TMonitorContactResume & {
    subCategoryName: string
    budgetId: number
    providerId: number
  }
  onClose: () => void
  handleOp?: () => void
}

const ContactInfo = ({ data, onClose, handleOp }: Props) => {
  const { user, controllers } = getStore()

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<TMonitorContactResume>({
    ...initials.modals.newMonitorContact,
  })

  const handleClose = () => {
    onClose()
  }

  const handleField = (field: string, value: boolean | string) => {
    setForm((f) => ({ ...f, [field]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const req = await Api.monitoring.updateContact({
        contact: {
          id: data.idRegister,
          description: form.description,
        },
      })

      if (req.ok) {
        controllers.feedback.setData({
          state: "success",
          message: "Contato atualizado com sucesso",
          visible: true,
        })

        onClose()

        handleOp && handleOp()

        setForm(initials.modals.newMonitorContact)
      }
    } catch (error) {}

    setLoading(false)
  }
  useEffect(() => {
    setForm({
      categoryName: data.categoryName,
      description: data.description,
      idRegister: data.idRegister,
      openingDate: data.openingDate,
      providerName: data.providerName,
    })
  }, [data])

  return (
    <S.Element>
      {loading && (
        <C.LoadingContainer>
          <Lottie animationData={lottieData} width={64} height={64} />
        </C.LoadingContainer>
      )}

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
            <S.DIValue>
              {getDateStr(data.openingDate, "localTimeStr_HM")}
            </S.DIValue>
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
          {isEditing ? (
            <Input.TextArea
              field={"description"}
              onChange={(_, val) =>
                setForm((frm) => ({ ...frm, description: val }))
              }
              value={form.description}
              gridSizes={{ big: 12 }}
              label="Descrição"
              disabled={!isEditing}
            />
          ) : (
            <Input.ReadonlyTextArea
              field={"description"}
              onChange={(val) =>
                setForm((frm) => ({ ...frm, description: val }))
              }
              value={form.description}
              gridSizes={{ big: 12 }}
              label="Descrição"
              disabled={!isEditing}
            />
          )}
        </S.Row>

        <S.Bottom>
          <Button
            type="outlined"
            text="Editar"
            action={() => setIsEditing(true)}
            greenText={true}
            icon={<Icons.Edit />}
            fit={true}
            iconLeft={true}
            disabled={isEditing}
          />
          <Button
            type="main"
            text="Salvar"
            action={handleSubmit}
            fit={true}
            disabled={!isEditing || form.description.trim().length === 0}
          />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default ContactInfo
