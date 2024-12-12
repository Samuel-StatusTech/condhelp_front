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
}

/*
 *  Approval Resume Component
 */

const ManagerBudgetResume = ({ k, data, onPickBudget }: Props) => {
  const { user, controllers } = getStore()

  const reloadPage = () => {
    window.location.reload()
  }

  const renderDateAlert = () => {
    if (data.endDate) {
      const d = new Date()

      const todayTime = new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate()
      ).getTime()
      const budgetTime = new Date(data.endDate).getTime()

      const diff = (budgetTime - todayTime) / 1000 / 60 / 60 / 24
      const shouldShow = diff <= 3 && diff > -1

      return shouldShow ? (
        <S.AlertArea>
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
        status: !data.status ? "RECUSADO" : "CANCELADO",
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
        status: "ACEITO",
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
    <S.Element $k={k}>
      <C.HTop>
        <C.Header>
          <C.HPart $k={k}>
            <S.CardTitle>{data.title}</S.CardTitle>
          </C.HPart>
        </C.Header>
      </C.HTop>

      <C.MainWrapper $expanded={true}>
        <C.ContentWrapper>
          <S.Content>
            <S.Info>
              <S.InfoItem>
                <Icons.Location />
                <span>São José - SC</span>
              </S.InfoItem>
              <S.InfoItem>
                <Icons.Conds />
                <span>{data.condominiumName}</span>
              </S.InfoItem>
              <S.InfoItem>
                <Icons.User />
                <span>25 unidades</span>
              </S.InfoItem>
              <S.InfoItem>
                <Icons.Subcategory />
                <span>{data.subcategoryName}</span>
              </S.InfoItem>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <S.InfoItem>
                  <Icons.Calendar />
                  <span>
                    {data.endDate ? getDateStr(data.endDate, "dmy") : "-"}
                  </span>
                  {data.isUrgent && <span className="urgent">Urgente</span>}
                </S.InfoItem>

                {renderDateAlert()}
              </div>
            </S.Info>

            <Divider />

            <S.ResumeArea>
              {!data.status && (
                <S.Available>Disponível para participação</S.Available>
              )}
              {data.status === "ACEITO" &&
                data.statusBudget === "AGUARDANDO" && (
                  <S.AwaitingManager>
                    <Icons.Alert />
                    <span>Aguardando Síndico</span>
                  </S.AwaitingManager>
                )}
              {data.status === "ACEITO" &&
                data.statusBudget === "PARTICIPANDO" && (
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
                text={!data.status ? "Recusar" : "Cancelar Participação"}
                action={handleReject}
                fit={true}
                red={true}
              />

              <Button
                type="green"
                text={"PARTICIPAR"}
                action={handleGetIn}
                fit={true}
                disabled={data.status === "ACEITO"}
              />
            </S.BottomCard>
          </S.Content>
        </C.ContentWrapper>
      </C.MainWrapper>
    </S.Element>
  )
}

export default ManagerBudgetResume
