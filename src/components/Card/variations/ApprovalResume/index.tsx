import { TBudget } from "../../../../utils/@types/data/budget"
import * as C from "../../styled"
import * as S from "./styled"

import { useState } from "react"

type Props = {
  k: number
  title: string
  data: {
    approved: number
    awaiting: number
    rejected: number
  }
  isExpansible?: boolean
  role: "budgets" | "providers"
  doubledCard?: boolean
}

type PDataResumeItem = {
  type: "approved" | "awaiting" | "rejected"
  number: number
  total: number
  role: "budgets" | "providers"
}

/*
 *  Component relations
 */

const textRelations = {
  budgets: {
    approved: "Finalizado",
    awaiting: "Em andamento",
    rejected: "Cancelado",
  },
  providers: {
    approved: "Ativo",
    awaiting: "Inativo",
    rejected: "Cancelado",
  },
}

export const DataResumeItem = ({
  type,
  number,
  total,
  role,
}: PDataResumeItem) => {
  const renderType = () => {
    const pNumber = Math.round((number / total) * 100)
    const percentage = !Number.isNaN(pNumber) ? pNumber : 0

    let str = ""

    switch (type) {
      case "approved":
        str = `${textRelations[role][type]}${number > 1 ? "s" : ""}`
        break
      case "awaiting":
        str = `${textRelations[role][type]}`
        break
      case "rejected":
        str = `${textRelations[role][type]}${number > 1 ? "s" : ""}`
        break
      default:
        break
    }

    return str + ` (${percentage}%)`
  }

  return (
    <S.DataResumeItem>
      <S.StatusColor $status={type} />
      <span>{number}</span>
      <span>{renderType()}</span>
    </S.DataResumeItem>
  )
}

/*
 *  Graph Data
 */

type PGraphData = {
  type: TBudget["status"]
  size: number
}

const GraphData = ({ type, size }: PGraphData) => {
  const value = Math.round(size)

  return (
    <S.GraphData $type={type} $size={value}>
      {value > 0 && <span>{value}%</span>}
    </S.GraphData>
  )
}

/*
 *  Approval Resume Component
 */

const ApprovalResume = ({
  k,
  title,
  data,
  isExpansible,
  role,
  doubledCard,
}: Props) => {
  const total = data.approved + data.awaiting + data.rejected

  const [isOpened, setIsOpened] = useState(true)

  return (
    <S.Element $k={k}>
      <C.HTop
        $noHover={!isExpansible}
        onClick={isExpansible ? () => setIsOpened(!isOpened) : undefined}
      >
        <C.Header>
          <C.HPart $k={k}>
            <S.CardTitle>{title}</S.CardTitle>
          </C.HPart>
          <S.DataResumeArea $selfLine={doubledCard}>
            <DataResumeItem
              type="approved"
              number={data.approved}
              total={total}
              role={role}
            />
            <DataResumeItem
              type="awaiting"
              number={data.awaiting}
              total={total}
              role={role}
            />
            <DataResumeItem
              type="rejected"
              number={data.rejected}
              total={total}
              role={role}
            />
          </S.DataResumeArea>
        </C.Header>
      </C.HTop>
      <C.MainWrapper $expanded={isOpened}>
        <C.ContentWrapper>
          <C.Content>
            {total === 0 ? (
              <S.Graph>
                <S.NullishBudgets>Nenhum orçamento realizado</S.NullishBudgets>
              </S.Graph>
            ) : (
              <S.Graph>
                <GraphData
                  type={"approved"}
                  size={(data.approved / total) * 100}
                />
                <GraphData
                  type={"awaiting"}
                  size={(data.awaiting / total) * 100}
                />
                <GraphData
                  type={"rejected"}
                  size={(data.rejected / total) * 100}
                />
              </S.Graph>
            )}
          </C.Content>
        </C.ContentWrapper>
      </C.MainWrapper>
    </S.Element>
  )
}

export default ApprovalResume
