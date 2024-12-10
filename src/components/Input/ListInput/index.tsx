import { FormField } from "../../../utils/@types/components/FormFields"
import * as S from "./styled"
import { Icons } from "../../../assets/icons/icons"
import { TOption } from "../../../utils/@types/data/option"
import { useState } from "react"

export type TInputDefault = {
  id: number
  label?: string
  placeholder?: string
  value: string
}

type Props = TInputDefault & {
  autoSugest?: boolean
  options?: TOption[]
  onSelectOption?: (id: any, params: any) => any
  onChange: (id: number, v: string) => void
  handleDelete: (id: number) => void
  onEnter?: () => void
  gridSizes?: FormField["gridSizes"]
}

const ListInput = (props: Props) => {
  const {
    id,
    value,
    placeholder,
    onChange,
    handleDelete,
    onEnter,
    autoSugest,
    options,
    onSelectOption,
  } = props

  const [canSelect, setCanSelect] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canSelect) setCanSelect(true)

    const v = e.target.value
    onChange(id, v)
  }

  const handleCityPick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cityId: number
  ) => {
    if (onSelectOption) onSelectOption(id, cityId)

    if (canSelect) setCanSelect(false)
  }

  return (
    <S.Wrapper $gridSizes={props.gridSizes}>
      <S.Item $k={0}>
        <S.Input
          id={String(props.id)}
          value={value}
          placeholder={placeholder}
          onKeyUp={({ code, keyCode }) => {
            if (!!onEnter && (code === "Enter" || keyCode === 13)) onEnter()
          }}
          onChange={handleChange}
        />
        <S.BtnArea onClick={() => handleDelete(id)}>
          <Icons.Trash />
        </S.BtnArea>
      </S.Item>
      {autoSugest && canSelect && options && options.length > 0 && (
        <S.OptionsArea className={options.length > 0 ? "visible" : ""}>
          {options.map((o, k) => (
            <S.Option key={k} onClick={(e) => handleCityPick(e, +o.key)}>
              <span>{o.value}</span>
            </S.Option>
          ))}
        </S.OptionsArea>
      )}
    </S.Wrapper>
  )
}

export default ListInput
