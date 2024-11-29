import * as C from "../../styled"
import * as S from "./styled"

import { Icons } from "../../../../assets/icons/icons"
import { TBudget } from "../../../../utils/@types/data/budget"

import Divider from "../../../_minimals/Divider"
import Button from "../../../Button"

type Props = {
  k: number
  data: TBudget
  onPick: (budget: TBudget) => void
}

const BudgetCard = ({ k, data, onPick }: Props) => {
  const getRole = () => {
    let role: string = "opened"

    return role as "openedCalled" | "opened" | "running" | "runningSigned"
  }

  const renderButton = () => {
    const role = getRole()

    const haveButton = role === "openedCalled" || role === "runningSigned"

    return haveButton ? (
      <Button
        type="main"
        text={role === "openedCalled" ? "Atender" : "Fechar"}
        action={() => {}}
        fit={true}
      />
    ) : null
  }

  return (
    <S.Element $role={getRole()} $k={k} onClick={() => onPick(data)}>
      <C.MainWrapper $expanded={true}>
        <C.ContentWrapper>
          <S.Content>
            {data.urgent && (
              <S.AlertArea>
                <Icons.Alert />
              </S.AlertArea>
            )}

            <S.Info>
              <S.BudgetNumber>Nº {Number(data.id)}</S.BudgetNumber>
              <S.InfoItem>{data.condominium.name}</S.InfoItem>
            </S.Info>

            <Divider />

            <S.Info>
              <S.InfoItem $bold={true}>{data.title}</S.InfoItem>
              <S.InfoItem>{data.category}</S.InfoItem>
              <S.InfoItem>{data.subcategory}</S.InfoItem>
            </S.Info>

            {renderButton()}
          </S.Content>
        </C.ContentWrapper>
      </C.MainWrapper>
    </S.Element>
  )
}

export default BudgetCard