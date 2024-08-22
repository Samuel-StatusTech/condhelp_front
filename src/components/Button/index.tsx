import { Icons } from "../../assets/icons/icons"
import * as S from "./styled"

type Props =
  | {
      type: "main" | "secondary"
      text: string
      icon?: JSX.Element
      iconLeft?: boolean
      action: (v?: any) => void
    }
  | {
      type: "tertiary"
      icon: JSX.Element
      action: (v?: any) => void
    }
  | {
      type: "google"
      action: (v?: any) => void
    }

const Button = (props: Props) => {
  return props.type !== "google" ? (
    <S.Element $type={props.type} onClick={props.action}>
      {
        // @ts-ignore
        props.icon && props.iconLeft ? props.icon : null
      }
      {props.type !== "tertiary" && (
        <S.Text $type={props.type}>{props.text}</S.Text>
      )}
      {
        // @ts-ignore
        props.icon && !props.iconLeft ? props.icon : null
      }
    </S.Element>
  ) : (
    <S.GoogleArea onClick={props.action}>
      <Icons.Google />
      <span>Conectar com o Google</span>
    </S.GoogleArea>
  )
}

export default Button
