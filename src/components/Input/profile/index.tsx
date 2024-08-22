import * as C from "../styled"
import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { useRef } from "react"

export type TInputProfile = {
  label: string
  field: string
  value: string | File | null
}

type Props = TInputProfile & {
  onChange: (field: any, v: any) => void
}

const InputProfile = (props: Props) => {
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
          <S.ImageWrapper>
            <S.ImageContent>
              {value && <S.Image src={getImageUrl()} alt="" />}
            </S.ImageContent>
          </S.ImageWrapper>

          <S.ButtonsArea>
            <S.Button onClick={handleRemove}>
              <Icons.Trash />
            </S.Button>
            <S.Button onClick={handleClick}>
              <Icons.Upload />
              <span>Enviar foto</span>
            </S.Button>
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
