import * as S from "./styled"

import Button from "../Button"
import { Icons } from "../../assets/icons/icons"

type Props = {
  handleDelete?: (params: any) => void
  handleCancel: (params: any) => void
  handleSave: (params: any) => void
  disabled?: boolean
}

const FormDefaultButtons = ({
  handleDelete,
  handleCancel,
  handleSave,
  disabled,
}: Props) => {
  return (
    <S.Buttons className="buttonsArea" $alignEnd={!handleDelete}>
      {handleDelete && (
        <Button
          type="quaternary"
          action={handleDelete}
          text="Excluir"
          icon={<Icons.Trash />}
          iconLeft={true}
          fit={true}
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
