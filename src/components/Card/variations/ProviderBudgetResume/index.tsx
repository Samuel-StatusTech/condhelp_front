import * as C from "../../styled"
import * as S from "./styled"

import { Icons } from "../../../../assets/icons/icons"
import { TProviderBudgetResume } from "../../../../utils/@types/data/budget"
import { getDateStr } from "../../../../utils/tb/format/date"
import Divider from "../../../_minimals/Divider"
import Button from "../../../Button"
import { Api } from "../../../../api"
import { getStore } from "../../../../store"

type Props = {
  k: number
  data: TProviderBudgetResume
  onPickBudget: (budgetId: number) => void
  forGrid?: boolean
}

/*
 *  Approval Resume Component
 */

const ManagerBudgetResume = ({ k, data, onPickBudget, forGrid }: Props) => {
  const { user, controllers } = getStore()

  const reloadPage = () => {
    window.location.reload()
  }

  const getDateDiff = () => {
    const d = new Date()

    const todayTime = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate()
    ).getTime()
    const budgetTime = new Date(data.endDate as string).getTime()

    const diff = (budgetTime - todayTime) / 1000 / 60 / 60 / 24

    return diff
  }

  const renderDateAlert = () => {
    if (data.endDate) {
      const diff = getDateDiff()

      const shouldShow = diff <= 3 && diff > -1

      return shouldShow ? (
        <S.AlertArea $forGrid={forGrid} $column={diff === 0}>
          <span>
            {diff === 0 ? "O prazo se encerra hoje" : `Restam ${diff} dias`}
          </span>
          <Icons.Alert />
        </S.AlertArea>
      ) : null
    } else return null
  }

  const handleReject = async () => {
    try {
      const req = await Api.budgets.interact({
        budgetId: data.id,
        providerId: user?.id as number,
        status: !data.status ? "RECUSADO_PRESTADOR" : "CANCELADO_PRESTADOR",
      })

      if (req.ok) reloadPage()
      else throw new Error()
    } catch {
      controllers.feedback.setData({
        state: "error",
        message:
          "Não foi possível recusar sua participação. Tente novamente mais tarde.",
        visible: true,
      })
    }
  }

  const handleGetIn = async () => {
    try {
      const req = await Api.budgets.interact({
        budgetId: data.id,
        providerId: user?.id as number,
        status: "AGUARDANDO_SINDICO",
      })

      if (req.ok) reloadPage()
      else throw new Error()
    } catch {
      controllers.feedback.setData({
        state: "error",
        message:
          "Não foi possível confirmar sua participação. Tente novamente mais tarde.",
        visible: true,
      })
    }
  }

  const handleSeeDetails = () => {
    onPickBudget(data.id)
  }

  return (
    <S.Element $k={k} $forGrid={forGrid}>
      <C.HTop>
        <C.Header>
          <C.HPart $k={k}>
            <S.CardTitle>{data.title}</S.CardTitle>
          </C.HPart>
        </C.Header>
      </C.HTop>

      <S.MainWrapper>
        <S.ContentWrapper>
          <S.Content>
            <S.Info>
              <S.InfoItem>
                <Icons.Location />
                <span>{`${data.condominiumCity} - ${data.condominiumState}`}</span>
              </S.InfoItem>
              <S.InfoItem>
                <Icons.Conds />
                <span>{data.condominiumName}</span>
              </S.InfoItem>
              <S.InfoItem>
                <Icons.User />
                <span>
                  {data.condominiumUnities} unidade
                  {data.condominiumUnities > 1 ? "s" : ""}
                </span>
              </S.InfoItem>
              <S.InfoItem>
                <Icons.Subcategory />
                <span>{data.subcategoryName}</span>
              </S.InfoItem>
              <S.LastInfo $column={getDateDiff() === 0}>
                <S.InfoItem>
                  <Icons.Calendar />
                  <span>
                    {data.endDate ? getDateStr(data.endDate, "dmy") : "-"}
                  </span>
                  {data.isUrgent && <span className="urgent">Urgente</span>}
                </S.InfoItem>

                {renderDateAlert()}
              </S.LastInfo>
            </S.Info>

            <Divider />

            <S.ResumeArea>
              {(
                [
                  "DISPONIVEL",
                  "CANCELADO_PRESTADOR",
                ] as TProviderBudgetResume["status"][]
              ).includes(data.status) && (
                <S.Available>Disponível para participação</S.Available>
              )}
              {data.status === "AGUARDANDO_SINDICO" && (
                <S.AwaitingManager>
                  <Icons.Alert />
                  <span>Aguardando Síndico</span>
                </S.AwaitingManager>
              )}
              {data.status === "APROVADO_SINDICO" && (
                <S.InRow>
                  <S.InMessage>
                    <Icons.CheckFill />
                    <span>PARTICIPANDO</span>
                  </S.InMessage>

                  <Button
                    greenText={true}
                    type="quaternary"
                    text={"Detalhes"}
                    action={handleSeeDetails}
                    fit={true}
                    icon={<Icons.Expand />}
                    iconSize={18}
                  />
                </S.InRow>
              )}
            </S.ResumeArea>

            <Divider />

            <S.BottomCard>
              <Button
                type="quaternary"
                text={
                  (
                    [
                      "DISPONIVEL",
                      "AGUARDANDO_SINDICO",
                    ] as TProviderBudgetResume["status"][]
                  ).includes(data.status)
                    ? "Recusar"
                    : "Cancelar Participação"
                }
                action={handleReject}
                fit={true}
                red={true}
              />

              <Button
                type="green"
                text={"PARTICIPAR"}
                action={handleGetIn}
                fit={true}
                disabled={(
                  [
                    "AGUARDANDO_SINDICO",
                    "APROVADO_SINDICO",
                    "RECUSADO_SINDICO",
                    "CANCELADO_SINDICO",
                    "CONTRATADO",
                    "FINALIZADO",
                    "EXPIRADO",
                  ] as TProviderBudgetResume["status"][]
                ).includes(data.status)}
              />
            </S.BottomCard>
          </S.Content>
        </S.ContentWrapper>
      </S.MainWrapper>
    </S.Element>
  )
}

export default ManagerBudgetResume
