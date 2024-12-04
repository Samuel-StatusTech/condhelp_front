import { FormField } from "../../../utils/@types/components/FormFields"
import * as S from "./styled"
import { Icons } from "../../../assets/icons/icons"

export type TInputDefault = {
  id: number
  label?: string
  placeholder?: string
  value: string
}

type Props = TInputDefault & {
  onChange: (id: number, v: string) => void
  handleDelete: (id: number) => void
  onEnter?: () => void
  gridSizes?: FormField["gridSizes"]
}

const ListInput = (props: Props) => {
  const { id, value, placeholder, onChange, handleDelete, onEnter } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    onChange(id, v)
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
    </S.Wrapper>
  )
}

export default ListInput
