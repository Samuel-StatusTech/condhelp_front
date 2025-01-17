import * as C from "../../styled"
import * as S from "./styled"

import { Icons } from "../../../../assets/icons/icons"
import { TMonitorItem } from "../../../../utils/@types/data/monitoring"

import Divider from "../../../_minimals/Divider"
import Button from "../../../Button"
import { Api } from "../../../../api"
import { getStore } from "../../../../store"

type Props = {
  k: number
  data: TMonitorItem
  onPick: (budget: TMonitorItem) => void
  selected?: boolean
}

const BudgetCard = ({ k, data, onPick, selected = false }: Props) => {
  const { controllers } = getStore()

  const reloadPage = () => {
    window.location.reload()
  }

  const handleOpen = async () => {
    try {
      const req = await Api.monitoring.attendSingle({ id: data.budgetId })

      if (req.ok) {
        controllers.feedback.setData({
          message: "Orçamento aberto com sucesso.",
          state: "success",
          visible: true,
        })

        reloadPage()
      } else throw new Error()
    } catch {
      controllers.feedback.setData({
        message:
          "Houve um erro ao abrir o orçamento. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }
  }

  const handleClose = async () => {
    try {
      const req = await Api.monitoring.closeRequest({ id: data.budgetId })

      if (req.ok) {
        controllers.feedback.setData({
          message: "Orçamento fechado com sucesso.",
          state: "success",
          visible: true,
        })

        reloadPage()
      } else throw new Error()
    } catch {
      controllers.feedback.setData({
        message:
          "Houve um erro ao fechar o orçamento. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }
  }

  const renderButton = () => {
    const haveButton =
      (data.statusCard.startsWith("RED") ||
        data.statusCard.startsWith("GREEN")) &&
      data.statusCard.endsWith("ENABLED")

    return haveButton ? (
      <Button
        type="main"
        text={data.statusCard.startsWith("RED") ? "Atender" : "Fechar"}
        action={data.statusCard.startsWith("RED") ? handleOpen : handleClose}
        fit={true}
      />
    ) : null
  }

  return (
    <S.Element $role={data.statusCard} $k={k} onClick={() => onPick(data)}>
      {selected && <S.PickedIndicator />}
      <S.MainWrapper
        $role={data.statusCard}
        $selected={selected}
        $expanded={true}
      >
        <C.ContentWrapper>
          <S.Content>
            {data.isUrgent && (
              <S.AlertArea>
                <Icons.Alert />
              </S.AlertArea>
            )}

            <S.Info>
              <S.BudgetNumber>
                Nº {Number(data.budgetId)} {selected && "(SELECIONADO)"}
              </S.BudgetNumber>
              <S.InfoItem>{data.condominiumName}</S.InfoItem>
            </S.Info>

            <Divider />

            <S.Info>
              <S.InfoItem $bold={true}>{data.budgetTitle}</S.InfoItem>
              <S.InfoItem>{data.categoryName}</S.InfoItem>
              <S.InfoItem>{data.subcategoryName}</S.InfoItem>
            </S.Info>

            {renderButton()}
          </S.Content>
        </C.ContentWrapper>
      </S.MainWrapper>
    </S.Element>
  )
}

export default BudgetCard
