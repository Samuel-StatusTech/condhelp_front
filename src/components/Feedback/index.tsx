import { useEffect } from "react"
import * as S from "./styled"

type Props = {
  type: "success" | "failure"
  text: string
  state: boolean
  time?: number
}

const Feedback = (props: Props) => {
  const { type, text, state } = props

  useEffect(() => {}, [])

  return (
    <S.Element $type={type} $state={state}>
      <S.Text>{text}</S.Text>
    </S.Element>
  )
}

export default Feedback
