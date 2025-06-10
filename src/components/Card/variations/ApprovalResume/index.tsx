import * as C from "../../styled"
import * as S from "./styled"

import { useState } from "react"

type Props = {
  k: number
  title: string
  data: {
    [key: string]: number
  }
  isExpansible?: boolean
  role: "budgets" | "providers"
  doubledCard?: boolean
}

type PDataResumeItem = {
  type: "awaitingResponse" | "approved" | "awaiting" | "rejected" | "recused"
  number: number
  percentage?: number
  role: "budgets" | "providers"
}

/*
 *  Component relations
 */

const textRelations = {
  budgets: {
    awaitingResponse: "Aguardando",
    approved: "Finalizado",
    awaiting: "Em andamento",
    rejected: "Cancelado",
    recused: "Recusado",
  },
  providers: {
    awaitingResponse: "Aguardando",
    approved: "Ativo",
    awaiting: "Inativo",
    rejected: "Cancelado",
    recused: "Recusado",
  },
}

export const DataResumeItem = ({
  type,
  number,
  role,
  percentage,
}: PDataResumeItem) => {
  const renderType = () => {
    const pctg = percentage ?? 0

    let str = ""

    switch (type) {
      case "awaitingResponse":
        str = `${textRelations[role][type]}`
        break
      case "approved":
        str = `${textRelations[role][type]}${number > 1 ? "s" : ""}`
        break
      case "awaiting":
        str =
          role === "budgets"
            ? `${textRelations[role][type]}`
            : `${textRelations[role][type]}${number > 1 ? "s" : ""}`
        break
      case "rejected":
        str = `${textRelations[role][type]}${number > 1 ? "s" : ""}`
        break
      case "recused":
        str = `${textRelations[role][type]}${number > 1 ? "s" : ""}`
        break
      default:
        break
    }

    return str + ` (${pctg}%)`
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
  type: string
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
  const total = data.approved + data.awaiting + (data.rejected ?? 0)

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
              percentage={data.approvedPercentage}
              role={role}
            />
            <DataResumeItem
              type="awaiting"
              number={data.awaiting}
              percentage={data.awaitingPercentage}
              role={role}
            />
            {data.rejected !== undefined && (
              <DataResumeItem
                type="rejected"
                number={data.rejected}
                percentage={data.rejectedPercentage}
                role={role}
              />
            )}
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
                <GraphData type={"approved"} size={data.approvedPercentage} />
                <GraphData type={"awaiting"} size={data.awaitingPercentage} />
                {data.rejected !== undefined && (
                  <GraphData type={"rejected"} size={data.rejectedPercentage} />
                )}
              </S.Graph>
            )}
          </C.Content>
        </C.ContentWrapper>
      </C.MainWrapper>
    </S.Element>
  )
}

export default ApprovalResume
