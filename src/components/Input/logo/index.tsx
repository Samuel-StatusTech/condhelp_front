import * as C from "../styled"
import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { useRef } from "react"
import Button from "../../Button"
import { FormField } from "../../../utils/@types/components/FormFields"
import { checkFileType } from "../../../utils/tb/helpers/file/sendFile"
import { getStore } from "../../../store"

export type TInputLogo = {
  height?: number
  field: string
  value: string | File | null
}

type Props = TInputLogo & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputLogo = (props: Props) => {
  const { controllers } = getStore()

  const inputRef = useRef<HTMLInputElement>(null)

  const { height, field, value, onChange } = props

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
    <C.Wrapper $gridSizes={props.gridSizes}>
      <C.Area>
        <S.Box $height={height ?? 140}>
          <S.ImageWrapper $hasContent={!!value} $height={height ?? 140}>
            {value ? (
              <S.Image src={getImageUrl()} alt="" />
            ) : (
              <span>Nenhuma logo selecionada</span>
            )}
          </S.ImageWrapper>
          <Button
            type="quaternary"
            text={`${value ? "Remover" : "Adicionar"} logo`}
            fit={true}
            icon={value ? <Icons.Trash /> : <Icons.PlusCircle />}
            iconLeft={true}
            action={value ? handleRemove : handleClick}
          />
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

export default InputLogo
