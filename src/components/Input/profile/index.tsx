import * as C from "../styled"
import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { useRef } from "react"
import { FormField } from "../../../utils/@types/components/FormFields"
import Button from "../../Button"
import { checkFileType } from "../../../utils/tb/helpers/file/sendFile"
import { getStore } from "../../../store"

export type TInputProfile = {
  height?: number
  label?: string
  field: string
  value: string | File | null
}

type Props = TInputProfile & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputProfile = (props: Props) => {
  const { controllers } = getStore()

  const inputRef = useRef<HTMLInputElement>(null)

  const { gridSizes, label, field, value, onChange } = props

  const handleClick = () => {
    inputRef.current?.click()
  }

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const handleRemove = () => {
    onChange(field, null)
    clearInput()
  }

  const handleImageCrop = (imgUrl: string) => {
    onChange(field, imgUrl)
    clearInput()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)

    if (file) {
      const isFileAcceptable = checkFileType(file, "image")

      if (isFileAcceptable) {
        // const limitSize = 10485760 // 10mb

        // if (file.size > limitSize) {
        //   controllers.feedback.setData({
        //     visible: true,
        //     state: "alert",
        //     message: "Tamanho máximo permitido: 10mb",
        //   })
        // } else {
        controllers.modal.open({
          role: "imageEditor",
          visible: true,
          width: "md",
          data: {
            file: file,
          },
          handleOp: (v) => (v ? handleImageCrop(v) : clearInput()),
        })
        // }
      } else {
        e.target.value = ""

        controllers.feedback.setData({
          visible: true,
          state: "alert",
          message: `Tipo de arquivo não permitido. Apenas imagem.`,
        })
      }
    } else {
      controllers.feedback.setData({
        visible: true,
        state: "alert",
        message:
          "Houve um erro ao carregar o arquivo. Verifique-o em seu dispositivo e tente novamente.",
      })
    }
  }

  const getImageUrl = () => {
    let url = ""

    if (typeof value === "string") url = value
    else if (value instanceof File) url = URL.createObjectURL(value)

    return url
  }

  return (
    <C.Wrapper $gridSizes={gridSizes}>
      <C.Area>
        <C.Label>{label}</C.Label>
        <S.Box $hasContent={!!value}>
          <S.ImageWrapper>
            <S.ImageContent onClick={handleClick}>
              {value && <S.Image src={getImageUrl()} alt="" />}
            </S.ImageContent>
          </S.ImageWrapper>

          <S.ButtonsArea>
            {value ? (
              <Button
                type="quaternary"
                text="Remover foto"
                iconLeft={true}
                icon={<Icons.Trash />}
                action={handleRemove}
              />
            ) : (
              <Button
                type="quaternary"
                text="Adicionar imagem"
                action={handleClick}
              />
            )}
          </S.ButtonsArea>
        </S.Box>
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleInputChange}
          ref={inputRef}
          hidden={true}
          alt={""}
        />
      </C.Area>
    </C.Wrapper>
  )
}

export default InputProfile
