import * as S from "./styled"
import { TPendency } from "../../utils/@types/data/user"
import ColorTextIndicator from "../ColorTextIndicator"

type Props = {
  label: string
  value: TPendency
}

const ProviderLegalization = ({ label, value }: Props) => {
  return (
    <S.Element>
      <S.Label>{label}</S.Label>
      <ColorTextIndicator role="pendencies" data={value} />
    </S.Element>
  )
}

export default ProviderLegalization
