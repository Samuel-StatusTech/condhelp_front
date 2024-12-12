import * as S from "./styled"

type Props =
  | {
      type: "main" | "secondary" | "quaternary" | "outlined" | "green"
      text: string
      icon?: JSX.Element
      iconLeft?: boolean
      action: (v?: any) => void
      fit?: boolean
      k?: number
      greenText?: boolean
      disabled?: boolean
      fromSidebar?: boolean
      red?: boolean
      iconSize?: number
    }
  | {
      type: "tertiary"
      icon: JSX.Element
      action: (v?: any) => void
      fit?: boolean
      k?: number
      disabled?: boolean
      fromSidebar?: boolean
      red?: boolean
      iconSize?: number
    }

const Button = (props: Props) => {
  return (
    <S.Element
      $red={props.red}
      $type={props.type}
      $outlined={props.type === "outlined"}
      $fit={props.fit}
      $k={props.k}
      onClick={props.disabled ? undefined : props.action}
      disabled={props.disabled}
      $fromSidebar={props.fromSidebar}
      $iconSize={props.iconSize}
    >
      {
        // @ts-ignore
        props.icon && props.iconLeft ? props.icon : null
      }
      {props.type !== "tertiary" && (
        <S.Text $type={props.type} $greenText={props.greenText}>
          {props.text}
        </S.Text>
      )}
      {
        // @ts-ignore
        props.icon && !props.iconLeft ? props.icon : null
      }
    </S.Element>
  )
}

export default Button
