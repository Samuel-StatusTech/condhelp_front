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
  singleComponent?: boolean
  allowsPdf?: boolean
}

type Props = TInputFile & {
  onChange: (field: any, v: any) => void
  gridSizes?: FormField["gridSizes"]
}

const InputFile = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { allowsPdf, singleComponent, height, label, field, value, onChange } = props

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
            </>
          )}
        </S.Box>

        <input
          type="file"
          accept={`image/png,image/jpeg,image/jpg${
            allowsPdf ? ",application/pdf" : ""
          }`}
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
