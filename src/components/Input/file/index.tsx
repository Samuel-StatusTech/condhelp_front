import * as C from "../styled"
import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { useRef } from "react"
import Button from "../../Button"
import { FormField } from "../../../utils/@types/components/FormFields"
import { TFieldError } from "../../../utils/@types/helpers/checkErrors"
import { theme } from "../../../theme"
import { getStore } from "../../../store"
import { checkFileType } from "../../../utils/tb/helpers/file/sendFile"

export type TInputFile = {
  height?: number
  label?: string
  field: string
  value: string | File | null
  singleComponent?: boolean
  allowsPdf?: boolean
  error?: TFieldError
}

type Props = TInputFile & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const imagesMimeTypes = ["image/png", "image/jpeg", "image/jpg"]

const InputFile = (props: Props) => {
  const { controllers } = getStore()

  const inputRef = useRef<HTMLInputElement>(null)

  const {
    allowsPdf,
    singleComponent,
    height,
    label,
    field,
    value,
    onChange,
    error,
  } = props

  const acceptableMimeTypes = allowsPdf
    ? "application/pdf"
    : imagesMimeTypes.join(",")

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleRemove = () => {
    onChange(field, null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)

    if (file) {
      const isFileAcceptable = checkFileType(file, allowsPdf ? "pdf" : "image")

      if (isFileAcceptable) {
        const limitSize = 10485760 // 10mb

        if (file.size > limitSize) {
          controllers.feedback.setData({
            visible: true,
            state: "alert",
            message: "Tamanho máximo permitido: 10mb",
          })
        } else onChange(field, file)
      } else {
        e.target.value = ""

        controllers.feedback.setData({
          visible: true,
          state: "alert",
          message: `Tipo de arquivo não permitido. Apenas ${
            allowsPdf ? "pdf" : "imagem"
          }.`,
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

  return (
    <C.Wrapper $gridSizes={props.gridSizes}>
      <C.Area>
        {label && <C.Label>{label}</C.Label>}
        <S.Box $centerContent={singleComponent} $height={height ?? 140}>
          {singleComponent ? (
            <div>
              <Button
                type="quaternary"
                text={value ? (value as File).name : "Anexar um arquivo"}
                fit={true}
                icon={<Icons.Clip />}
                iconLeft={true}
                action={
                  singleComponent
                    ? handleClick
                    : value
                    ? handleRemove
                    : handleClick
                }
                greenText={true}
              />
            </div>
          ) : (
            <>
              {value ? (
                typeof value === "string" ? (
                  <a href={value} download={value}>
                    <Icons.Clip />
                    <span>Baixar</span>
                  </a>
                ) : (
                  value instanceof File && (
                    <div>
                      <Icons.Clip />
                      <span>{value.name}</span>
                    </div>
                  )
                )
              ) : (
                <div>
                  <Icons.Clip />
                  <span
                    style={{
                      color: error?.has
                        ? theme.colors.red.main
                        : "currentcolor",
                    }}
                  >
                    Nenhum arquivo selecionado
                  </span>
                </div>
              )}

              <Button
                type="quaternary"
                text={`${value ? "Remover" : "Adicionar"} arquivo`}
                fit={true}
                icon={value ? <Icons.Trash /> : <Icons.PlusCircle />}
                iconLeft={true}
                action={value ? handleRemove : handleClick}
              />
            </>
          )}
        </S.Box>

        <input
          type="file"
          accept={acceptableMimeTypes}
          onChange={handleInputChange}
          ref={inputRef}
          hidden={true}
          alt={""}
        />
      </C.Area>
    </C.Wrapper>
  )
}

export default InputFile
