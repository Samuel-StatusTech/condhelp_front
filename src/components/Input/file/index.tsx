import * as C from "../styled"
import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { useRef } from "react"
import Button from "../../Button"
import { FormField } from "../../../utils/@types/components/FormFields"

export type TInputFile = {
  height?: number
  label?: string
  field: string
  value: string | File | null
}

type Props = TInputFile & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputFile = (props: Props) => {
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

  const getUrl = (val: File) => {
    const blob = new Blob([val], { type: val.type })
    const url = URL.createObjectURL(blob)
    return url
  }

  return (
    <C.Wrapper $gridSizes={props.gridSizes}>
      <C.Area>
        {label && <C.Label>{label}</C.Label>}
        <S.Box $height={height ?? 140}>
          {value && value instanceof File ? (
            <a href={getUrl(value)} download={value}>
              <Icons.Clip />
              <span>{value.name}</span>
            </a>
          ) : (
            <div>
              <Icons.Clip />
              <span>Nenhum arquivo selecionado</span>
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

export default InputFile
