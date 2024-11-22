import { useEffect } from "react"
import * as S from "./styled"
import { relations } from "../../utils/system/relations"

type Props = {
  text?: string
} & (
  | {
      role: "status"
      data: keyof typeof relations.status
    }
  | {
      role: "profile"
      data: keyof typeof relations.roles
    }
  | {
      role: "pendencies"
      data: keyof typeof relations.pendencies
    }
)

const ColorTextIndicator = (props: Props) => {
  const { role, data, text } = props

  useEffect(() => {}, [])

  return (
    <S.Element>
      {/* @ts-ignore */}
      <S.Dot $color={relations.colors[role][data]} />
      <S.Text>
        {text ??
          (role === "status"
            ? relations.status[data]
            : role === "profile"
            ? relations.roles[data]
            : relations.pendencies[data])}
      </S.Text>
    </S.Element>
  )
}

export default ColorTextIndicator
