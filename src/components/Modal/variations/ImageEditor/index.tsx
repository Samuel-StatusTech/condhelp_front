import { useCallback, useEffect, useState } from "react"
import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"

import Button from "../../../Button"
import CropEditor from "../../../CropEditor"

type Props = {
  data?: any
  onClose: () => void
  handleOp?: (newUrl: string | null) => void
}

const ImageEditor = ({ data, onClose, handleOp }: Props) => {
  const [incomingUrl, setIncomingUrl] = useState<string | undefined>()
  const [croppedUrl, setCroppedUrl] = useState("")

  const handleClose = () => {
    onClose()
    if (handleOp) handleOp(null)
  }

  const handleSubmit = () => {
    if (handleOp) handleOp(croppedUrl as string)
    onClose()
  }

  const loadData = useCallback(async () => {
    let url = ""

    if (typeof data.file === "string") url = data.file
    else if (data.file instanceof File) url = URL.createObjectURL(data.file)

    setIncomingUrl(url)
  }, [data])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.Element>
      <C.Header>
        <C.HeaderDefault>
          <C.HeaderMain>
            <C.ModalTitle>Editar imagem</C.ModalTitle>
            <C.CloseBtn onClick={handleClose}>
              <CloseIcon />
            </C.CloseBtn>
          </C.HeaderMain>
        </C.HeaderDefault>
      </C.Header>

      <S.Content>
        <S.ContentBox>
          <CropEditor
            imageSrc={incomingUrl as string}
            onCancel={() => {}}
            onSave={setCroppedUrl}
            ratio={data.ratio}
          />

          <S.Bottom>
            <Button
              type="main"
              text={"Atualizar"}
              action={handleSubmit}
              fit={true}
              // text={submitting ? "Atualizando..." : "Atualizar"}
              // action={!submitting ? handleSubmit : () => {}}
              // disabled={errors().has || submitting}
            />
          </S.Bottom>
        </S.ContentBox>
      </S.Content>
    </S.Element>
  )
}

export default ImageEditor
