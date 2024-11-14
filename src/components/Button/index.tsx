import * as S from "./styled"

type Props =
  | {
      type: "main" | "secondary" | "quaternary" | "outlined"
      text: string
      icon?: JSX.Element
      iconLeft?: boolean
      action: (v?: any) => void
      fit?: boolean
      k?: number
    }
  | {
      type: "tertiary"
      icon: JSX.Element
      action: (v?: any) => void
      fit?: boolean
      k?: number
    }

const Button = (props: Props) => {
  return (
    <S.Element
      $type={props.type}
      $outlined={props.type === "outlined"}
      $fit={props.fit}
      $k={props.k}
      onClick={props.action}
    >
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
  )
}

export default Button
