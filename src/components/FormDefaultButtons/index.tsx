import * as S from "./styled"

import Button from "../Button"
import { Icons } from "../../assets/icons/icons"

type Props = {
  handleDelete: (params: any) => void
  handleCancel: (params: any) => void
  handleSave: (params: any) => void
}

const FormDefaultButtons = ({
  handleDelete,
  handleCancel,
  handleSave,
}: Props) => {
  return (
    <S.Buttons className="buttonsArea">
      <Button
        type="quaternary"
        action={handleDelete}
        text="Excluir"
        icon={<Icons.Trash />}
        iconLeft={true}
        fit={true}
      />
      <S.BtnArea>
        <Button
          type="outlined"
          action={handleDelete}
          text="Cancelar"
          icon={<Icons.Edit />}
          iconLeft={true}
          fit={true}
        />
        <Button
          type="main"
          action={handleDelete}
          text="Salvar"
          icon={<Icons.CheckCircle />}
          iconLeft={true}
          fit={true}
        />
      </S.BtnArea>
    </S.Buttons>
  )
}

export default FormDefaultButtons
