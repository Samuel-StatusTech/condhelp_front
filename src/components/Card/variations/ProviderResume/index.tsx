import * as C from "../../styled"
import * as S from "./styled"

import { Icons } from "../../../../assets/icons/icons"

import Divider from "../../../_minimals/Divider"
import Button from "../../../Button"
import { formatPhone } from "../../../../utils/tb/format/phone"
import { TProviderOnBudget } from "../../../../utils/@types/data/_user/provider"
import { TBudgetStatus } from "../../../../utils/@types/data/status"

type Props = {
  k: number
  data: TProviderOnBudget
  onPick: (provider: TProviderOnBudget) => void
  budgetId: number
  handleResponseProvider: (providerId: number, status: TBudgetStatus) => void
}

/*
 *  Approval Resume Component
 */

const ProviderResume = ({
  k,
  data,
  onPick,
  budgetId,
  handleResponseProvider,
}: Props) => {
  const isRefusedOrRejected = [
    "RECUSADO_SINDICO",
    "RECUSADO_PRESTADOR",
    "CANCELADO_PRESTADOR",
  ].includes(data.status)

  const handleReject = () => {
    handleResponseProvider(data.id, "RECUSADO_SINDICO")
  }

  const renderStatusIndicator = () => {
    let content: any = null

    switch (data.status) {
      case "CONTRATADO":
        content = (
          <S.StatusArea $status={data.status}>
            <Icons.CheckFill />
            <span>CONTRATADO</span>
          </S.StatusArea>
        )
        break
      case "AGUARDANDO_SINDICO":
        content = (
          <S.StatusArea $status={data.status}>
            <Icons.Alert />
            <span>Aguardando Síndico</span>
          </S.StatusArea>
        )
        break
      case "APROVADO_SINDICO":
        content = (
          <S.StatusArea $status={data.status}>
            <Icons.CheckFill />
            <span>PARTICIPANDO</span>
          </S.StatusArea>
        )
        break
      case "RECUSADO_SINDICO":
      case "RECUSADO_PRESTADOR":
      case "CANCELADO_PRESTADOR":
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

  const handleApprove = async () => {
    const status: TBudgetStatus =
      isRefusedOrRejected || data.status === "AGUARDANDO_SINDICO"
        ? "APROVADO_SINDICO"
        : "CONTRATADO"

    handleResponseProvider(data.userId, status)
  }

  return (
    <S.Element $k={k}>
      <C.Header>
        <C.HPart $k={k}>
          <S.CardTitle>{data.nome}</S.CardTitle>
        </C.HPart>

        <Button
          greenText={true}
          type="quaternary"
          text={"Ver mais"}
          action={() => onPick(data)}
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
                <span>{formatPhone(data.contato)}</span>
              </S.InfoItem>
              <S.InfoItem>
                <Icons.Mail />
                <span>{data.email}</span>
              </S.InfoItem>
            </S.Info>

            <Divider />

            <S.BottomCard>
              {renderStatusIndicator()}

              {data.status !== "CONTRATADO" &&
                !(
                  [
                    "CANCELADO_SINDICO",
                    "EXPIRADO",
                    "FINALIZADO",
                  ] as TBudgetStatus[]
                ).includes(data.status) && (
                  <S.ButtonsArea>
                    <Button
                      type="quaternary"
                      greenText={isRefusedOrRejected}
                      text={isRefusedOrRejected ? "Aceitar" : "Recusar"}
                      action={
                        isRefusedOrRejected ? handleApprove : handleReject
                      }
                      fit={true}
                      red={true}
                    />

                    <Button
                      type={
                        data.status === "AGUARDANDO_SINDICO" ? "green" : "main"
                      }
                      text={
                        data.status === "AGUARDANDO_SINDICO"
                          ? "ACEITAR"
                          : "CONTRATAR"
                      }
                      action={handleApprove}
                      iconLeft={true}
                      disabled={[
                        "RECUSADO_SINDICO",
                        "RECUSADO_PRESTADOR",
                        "CANCELADO_PRESTADOR",
                      ].includes(data.status)}
                    />
                  </S.ButtonsArea>
                )}
            </S.BottomCard>
          </S.Content>
        </C.ContentWrapper>
      </C.MainWrapper>
    </S.Element>
  )
}

export default ProviderResume
