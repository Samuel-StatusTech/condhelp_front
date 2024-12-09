import * as C from "../../styled"
import * as S from "./styled"

import { Icons } from "../../../../assets/icons/icons"

import Divider from "../../../_minimals/Divider"
import Button from "../../../Button"
import { TUserTypes } from "../../../../utils/@types/data/user"
import { formatPhone } from "../../../../utils/tb/format/phone"

type Props = {
  k: number
  data: TUserTypes["PRESTADOR"]
  onPick: (providerId: number) => void
}

/*
 *  Approval Resume Component
 */

const ProviderResume = ({ k, data, onPick }: Props) => {
  const handleReject = () => {
    // ...
  }

  const renderStatusIndicator = () => {
    let content: any = null

    switch (data.status) {
      case "AGUARDANDO":
        content = (
          <S.StatusArea $status={data.status}>
            <Icons.Alert />
            <span>Aguardando Síndico</span>
          </S.StatusArea>
        )
        break
      case "ATIVO":
        content = (
          <S.StatusArea $status={data.status}>
            <Icons.CheckFill />
            <span>PARTICIPANDO</span>
          </S.StatusArea>
        )
        break
      case "INATIVO":
        content = (
          <S.StatusArea $status={data.status}>
            <Icons.Close />
            <span>RECUSADO</span>
          </S.StatusArea>
        )
        break
    }

    return content
  }

  return (
    <S.Element $k={k}>
      <C.Header>
        <C.HPart $k={k}>
          <S.CardTitle>{data.name}</S.CardTitle>
        </C.HPart>

        <Button
          greenText={true}
          type="quaternary"
          text={"Ver mais"}
          action={() => onPick(data.id)}
          fit={true}
          icon={<Icons.Expand width={16} height={16} />}
        />
      </C.Header>

      <C.MainWrapper $expanded={true}>
        <C.ContentWrapper>
          <S.Content>
            <S.Info>
              <S.InfoItem>
                <Icons.Phone />
                <span>{formatPhone(data.phone1)}</span>
              </S.InfoItem>
              <S.InfoItem>
                <Icons.Mail />
                <span>{data.email}</span>
              </S.InfoItem>
            </S.Info>

            <Divider />

            <S.BottomCard>
              {renderStatusIndicator()}

              <S.ButtonsArea>
                <Button
                  type="quaternary"
                  greenText={data.status === "INATIVO"}
                  text={data.status === "INATIVO" ? "Aceitar" : "Recusar"}
                  action={handleReject}
                  fit={true}
                  red={true}
                />

                <Button
                  type={data.status === "AGUARDANDO" ? "green" : "main"}
                  text={data.status === "AGUARDANDO" ? "ACEITAR" : "CONTRATAR"}
                  action={() => {}}
                  iconLeft={true}
                  disabled={data.status === "INATIVO"}
                />
              </S.ButtonsArea>
            </S.BottomCard>
          </S.Content>
        </C.ContentWrapper>
      </C.MainWrapper>
    </S.Element>
  )
}

export default ProviderResume
