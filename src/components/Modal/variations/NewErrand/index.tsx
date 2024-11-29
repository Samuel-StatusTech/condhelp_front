import { useState } from "react"
import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Input from "../../../Input"

import Button from "../../../Button"
import { TNewErrand } from "../../../../utils/@types/data/errand"
import { getDateStr } from "../../../../utils/tb/format/date"
import Divider from "../../../_minimals/Divider"

type Props = {
  data?: TNewErrand
  onClose: () => void
  handleOp?: () => void
}

const NewErrand = ({ data, onClose, handleOp }: Props) => {
  const [form, setForm] = useState({
    canSave: false,
  })

  const handleSubmit = () => {
    // TODO: check errors

    if (handleOp) handleOp()

    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  const getImageUrl = () => {
    let url = ""

    if (typeof data?.content.image === "string") url = data?.content.image
    else if (data?.content.image instanceof File)
      url = URL.createObjectURL(data?.content.image)

    return url
  }

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>{data?.title}</C.ModalTitle>
            <C.CloseBtn onClick={handleClose}>
              <CloseIcon />
            </C.CloseBtn>
          </C.HeaderMain>
          <S.HeaderSubInfo>
            {getDateStr(new Date(), "dmy")} - {getDateStr(new Date(), "time")}
          </S.HeaderSubInfo>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
          }}
        >
          <S.ImageWrapper $hasContent={!!data?.content.image} $height={140}>
            {data?.content.image ? (
              <S.Image src={getImageUrl()} alt="" />
            ) : (
              <span>Nenhuma imagem selecionada</span>
            )}
          </S.ImageWrapper>
        </div>

        <p
          dangerouslySetInnerHTML={{
            __html: data?.content.message.replace(/\n/g, "<br/>") ?? "",
          }}
        ></p>

        <Divider />

        <S.TargetArea>
          <S.Target>Perfis de destino:</S.Target>
          <S.Target>Filial,</S.Target>
          <S.Target>Franquia</S.Target>
        </S.TargetArea>

        <Divider />

        <S.Bottom>
          <Input.Multiple
            field="canSave"
            value={form.canSave ? ["canSave"] : []}
            onChange={() => setForm({ canSave: !form.canSave })}
            options={[
              { key: "canSave", value: "As informações estão corretas" },
            ]}
          />
          <Button
            disabled={!form.canSave}
            type="main"
            text="Solicitar"
            action={handleSubmit}
            fit={true}
          />
        </S.Bottom>
      </S.Content>
    </S.Element>
  )
}

export default NewErrand
