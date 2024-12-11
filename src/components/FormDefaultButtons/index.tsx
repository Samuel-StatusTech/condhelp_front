import * as S from "./styled"

import Button from "../Button"
import { Icons } from "../../assets/icons/icons"
import { useParams } from "react-router-dom"
import { getStore } from "../../store"

type Props = {
  handleDelete?: (params: any) => void
  handleCancel: (params: any) => void
  handleSave: (params: any) => void
  disabled?: boolean
  deleteModalTitle?: string
}

const FormDefaultButtons = ({
  handleDelete,
  handleCancel,
  handleSave,
  disabled,
  deleteModalTitle,
}: Props) => {
  const { controllers } = getStore()

  const params = useParams()

  const handlePressDelete = () => {
    controllers.modal.open({
      role: "confirmDelete",
      visible: true,
      handleOp: handleDelete,
      width: "xs",
      data: {
        title: deleteModalTitle,
      },
    })
  }

  return (
    <S.Buttons className="buttonsArea" $alignEnd={!handleDelete}>
      {handleDelete && (
        <Button
          type="quaternary"
          action={handlePressDelete}
          text="Excluir"
          icon={<Icons.Trash />}
          iconLeft={true}
          fit={true}
          disabled={!params.id}
        />
      )}
      <S.BtnArea>
        <Button
          type="outlined"
          action={handleCancel}
          text="Cancelar"
          icon={<Icons.Edit />}
          iconLeft={true}
        />
        <Button
          type="main"
          action={handleSave}
          text="Salvar"
          icon={<Icons.CheckCircle />}
          iconLeft={true}
          disabled={disabled}
        />
      </S.BtnArea>
    </S.Buttons>
  )
}

export default FormDefaultButtons
