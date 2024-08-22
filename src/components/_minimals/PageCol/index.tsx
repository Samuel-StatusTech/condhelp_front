import * as S from "./styled"

type Props = {
  children: JSX.Element | JSX.Element[]
  size?: number
}

const PageCol = ({ children, size }: Props) => {
  return <S.Container $size={size}>{children}</S.Container>
}

export default PageCol
