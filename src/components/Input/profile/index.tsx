import * as C from "../styled"
import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { useRef } from "react"
import { FormField } from "../../../utils/@types/components/FormFields"
import Button from "../../Button"

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
  const inputRef = useRef<HTMLInputElement>(null)

  const { gridSizes, label, field, value, onChange } = props

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
                text="Clique para selecionar"
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
