import * as C from "../../styled"
import * as S from "./styled"

import { Icons } from "../../../../assets/icons/icons"
import { TBudgetResume } from "../../../../utils/@types/data/budget"
import { getDateStr } from "../../../../utils/tb/format/date"
import Divider from "../../../_minimals/Divider"

type Props = {
  k: number
  resume: {
    approved: number
    awaiting: number
    rejected: number
  }
  data: TBudgetResume
  forBranch?: boolean
  handlePick: (id: number) => void
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

const ManagerBudgetResume = ({
  k,
  resume,
  data,
  forBranch,
  handlePick,
}: Props) => {
  const total = resume.approved + resume.awaiting + resume.rejected

  const renderDate = () => {
    return data.endDate ? getDateStr(data.endDate, "dmy") : "-"
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

      const diff = Math.floor((budgetTime - todayTime) / 1000 / 60 / 60 / 24)
      const shouldShow = diff <= 3

      return shouldShow ? (
        <S.AlertArea>
          <span>
            {diff === 0
              ? "O prazo se encerra hoje"
              : diff > 0
              ? `Restam ${diff} dias`
              : "Prazo expirado"}
          </span>
          <Icons.Alert />
        </S.AlertArea>
      ) : null
    } else return null
  }

  const handleClick = () => {
    handlePick(data.id)
  }

  return (
    <S.Element $k={k} onClick={handleClick}>
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
        </S.ContentWrapper>
      </S.MainWrapper>
    </S.Element>
  )
}

export default ManagerBudgetResume
