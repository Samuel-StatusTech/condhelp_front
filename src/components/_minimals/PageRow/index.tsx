import * as S from "./styled"

type Props = {
  children: JSX.Element | JSX.Element[]
}

const PageRow = ({ children }: Props) => {
  return <S.Container>{children}</S.Container>
}

export default PageRow
