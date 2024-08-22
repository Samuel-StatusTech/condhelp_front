import * as C from "../styled"
import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { useRef } from "react"

export type TInputImageProfile = {
  label: string
  field: string
  value: string | File | null
}

type Props = TInputImageProfile & {
  onChange: (field: any, v: any) => void
}

const InputImage = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { label, field, value, onChange } = props

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
    <C.Wrapper>
      <C.Area>
        <C.Label>{label}</C.Label>
        <S.Box $hasContent={!!value}>
          {value ? (
            <S.ImageWrapper>
              <S.Image src={getImageUrl()} alt="" />
              <S.OptionsArea>
                <S.Button onClick={handleClick}>
                  <span>Trocar Imagem</span>
                </S.Button>
                <S.Button onClick={handleRemove}>
                  <span>Remover Imagem</span>
                </S.Button>
              </S.OptionsArea>
            </S.ImageWrapper>
          ) : (
            <S.Button onClick={handleClick}>
              <Icons.Upload />
              <span>Enviar imagem</span>
            </S.Button>
          )}
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
