import * as C from "../../styled"
import * as S from "./styled"

import { Icons } from "../../../../assets/icons/icons"
import { TBudgetResume } from "../../../../utils/@types/data/budget"
import { getDateStr } from "../../../../utils/tb/format/date"
import Divider from "../../../_minimals/Divider"
import Button from "../../../Button"

type Props = {
  k: number
  data: TBudgetResume
}

/*
 *  Approval Resume Component
 */

const ManagerBudgetResume = ({ k, data }: Props) => {
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

  const handleReject = () => {
    // ...
  }

  const handleGetIn = () => {
    // ...
  }

  // const handleSeeDetails = () => {
  //   // ...
  // }

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
                }}
              >
                <S.InfoItem>
                  <Icons.Calendar />
                  <span>
                    {data.endDate ? getDateStr(data.endDate, "dmy") : "-"}
                  </span>
                  <span className="urgent">Urgente</span>
                </S.InfoItem>

                {renderDateAlert()}
              </div>
            </S.Info>

            <Divider />

            <S.ResumeArea>
              <S.Available>Disponível para participação</S.Available>
              {/* <S.AwaitingManager>
                <Icons.Alert />
                <span>Aguardando Síndico</span>
              </S.AwaitingManager> */}
              {/* <S.InRow>
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
                />
              </S.InRow> */}
            </S.ResumeArea>

            <Divider />

            <S.BottomCard>
              <Button
                type="quaternary"
                text={"Recusar"}
                action={handleReject}
                fit={true}
                red={true}
              />

              <Button
                type="green"
                text={"PARTICIPAR"}
                action={handleGetIn}
                fit={true}
              />
            </S.BottomCard>
          </S.Content>
        </C.ContentWrapper>
      </C.MainWrapper>
    </S.Element>
  )
}

export default ManagerBudgetResume
