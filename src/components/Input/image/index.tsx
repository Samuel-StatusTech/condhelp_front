import * as C from "../styled"
import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { useRef } from "react"
import Button from "../../Button"
import { FormField } from "../../../utils/@types/components/FormFields"

export type TInputImage = {
  height?: number
  label?: string
  field: string
  value: string | File | null
}

type Props = TInputImage & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputImage = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { height, label, field, value, onChange } = props

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleRemove = () => {
    onChange(field, null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)

    onChange(field, file)
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
        {label && <C.Label>{label}</C.Label>}
        <S.Box $height={height ?? 140}>
          <S.ImageWrapper $hasContent={!!value} $height={height ?? 140}>
            {value ? (
              <S.Image src={getImageUrl()} alt="" />
            ) : (
              <span>Nenhuma imagem selecionada</span>
            )}
          </S.ImageWrapper>
          <Button
            type="quaternary"
            text={`${value ? "Remover" : "Adicionar"} imagem`}
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

export default InputImage
