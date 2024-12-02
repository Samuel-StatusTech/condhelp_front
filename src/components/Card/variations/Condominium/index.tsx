import * as C from "../../styled"
import * as S from "./styled"

import { Icons } from "../../../../assets/icons/icons"

import { TCondominium } from "../../../../utils/@types/data/condominium"
import Divider from "../../../_minimals/Divider"

type Props = {
  k: number
  data: TCondominium
  onPick: (budget: TCondominium) => void
}

const CondominiumCard = ({ k, data, onPick }: Props) => {
  const getRole = () => {
    let role: string = "opened"

    return role as "openedCalled" | "opened" | "running" | "runningSigned"
  }

  return (
    <S.Element $role={getRole()} $k={k} onClick={() => onPick(data)}>
      <C.Header>
        <S.CardTitle>{data.name}</S.CardTitle>

        <Icons.Expand />
      </C.Header>

      <C.MainWrapper $expanded={true}>
        <C.ContentWrapper>
          <S.Content>
            <S.ImageWrapper $height={120} $hasContent={!!data.image}>
              <S.Image src={data as any} alt={""} />
            </S.ImageWrapper>

            <Divider />

            <S.Unities>
              {`${data.unities} unidade${data.unities > 1 ? "s" : ""}`}
            </S.Unities>

            <S.AddressInfo>{`${data?.address}, ${data?.addressNumber}`}</S.AddressInfo>
            <S.AddressInfo>{`${data?.neighborhood} - ${data?.city}, ${data?.federateUnit}`}</S.AddressInfo>
          </S.Content>
        </C.ContentWrapper>
      </C.MainWrapper>
    </S.Element>
  )
}

export default CondominiumCard
