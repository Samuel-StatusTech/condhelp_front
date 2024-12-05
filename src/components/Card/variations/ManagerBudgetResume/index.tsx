import * as C from "../../styled"
import * as S from "./styled"

import { Icons } from "../../../../assets/icons/icons"
import { TBudget } from "../../../../utils/@types/data/budget"
import { getDateStr } from "../../../../utils/tb/format/date"
import Divider from "../../../_minimals/Divider"

type Props = {
  k: number
  resume: {
    approved: number
    awaiting: number
    rejected: number
  }
  data: TBudget
  forBranch?: boolean
}

type PDataResumeItem = {
  type: "approved" | "awaiting" | "rejected"
  number: number
  total: number
}

const DataResumeItem = ({ type, number, total }: PDataResumeItem) => {
  const renderType = () => {
    let str = ""

    switch (type) {
      case "approved":
        str = `Participando`
        break
      case "awaiting":
        str = `Aguardando`
        break
      case "rejected":
        str = `Rejeitado${number > 1 ? "s" : ""}`
        break
      default:
        break
    }

    return str
  }

  return (
    <S.DataResumeItem $status={type}>
      <span>{number}</span>
      <span>{renderType()}</span>
    </S.DataResumeItem>
  )
}

/*
 *  Approval Resume Component
 */

const ManagerBudgetResume = ({ k, resume, data, forBranch }: Props) => {
  const total = resume.approved + resume.awaiting + resume.rejected

  const renderDate = () => {
    const split = data.startDate.split("-")

    const budgetTime = new Date(+split[0], +split[1] - 1, +split[2])

    return getDateStr(budgetTime, "dmy")
  }

  const renderDateAlert = () => {
    const split = data.endDate.split("-")

    const d = new Date()

    const todayTime = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate()
    ).getTime()
    const budgetTime = new Date(+split[0], +split[1] - 1, +split[2]).getTime()

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
              {forBranch && (
                <S.InfoItem>
                  <Icons.Franchise />
                  <span>Nome da franquia</span>
                </S.InfoItem>
              )}
              <S.InfoItem>
                <Icons.Conds />
                <span>{data.condominiumName}</span>
              </S.InfoItem>
              <S.InfoItem>
                <Icons.Subcategory />
                <span>{data.subcategoryName}</span>
              </S.InfoItem>
            </S.Info>

            <Divider />

            <S.ResumeArea>
              <DataResumeItem
                type="approved"
                number={resume.approved}
                total={total}
              />
              <DataResumeItem
                type="awaiting"
                number={resume.awaiting}
                total={total}
              />
              <DataResumeItem
                type="rejected"
                number={resume.rejected}
                total={total}
              />
            </S.ResumeArea>

            <Divider />

            <S.BottomCard>
              <S.DateArea>
                <Icons.Calendar />
                <span>{renderDate()}</span>
              </S.DateArea>
              {renderDateAlert()}
            </S.BottomCard>
          </S.Content>
        </C.ContentWrapper>
      </C.MainWrapper>
    </S.Element>
  )
}

export default ManagerBudgetResume
