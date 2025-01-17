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
}

type PDataResumeItem = {
  type: "approved" | "awaiting" | "rejected"
  number: number
  total: number
}

const DataResumeItem = ({ type, number, total }: PDataResumeItem) => {
  const renderType = () => {
    const percentage = Math.round((number / total) * 100)

    let str = ""

    switch (type) {
      case "approved":
        str = `Finalizada${number > 1 ? "s" : ""}`
        break
      case "awaiting":
        str = `Em andamento`
        break
      case "rejected":
        str = `Cancelado${number > 1 ? "s" : ""}`
        break
      default:
        break
    }

    return str + ` (${percentage}%)`
  }

  return (
    <S.DataResumeItem>
      <S.StatusColor $status={type} />
      <span>
        {number} {renderType()}
      </span>
    </S.DataResumeItem>
  )
}

type PGraphData = {
  type: "approved" | "awaiting" | "rejected"
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

const ApprovalResume = ({ k, title, data, isExpansible }: Props) => {
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
          <S.DataResumeArea>
            <DataResumeItem
              type="approved"
              number={data.approved}
              total={total}
            />
            <DataResumeItem
              type="awaiting"
              number={data.awaiting}
              total={total}
            />
            <DataResumeItem
              type="rejected"
              number={data.rejected}
              total={total}
            />
          </S.DataResumeArea>
        </C.Header>
      </C.HTop>
      <C.MainWrapper $expanded={isOpened}>
        <C.ContentWrapper>
          <C.Content>
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
          </C.Content>
        </C.ContentWrapper>
      </C.MainWrapper>
    </S.Element>
  )
}

export default ApprovalResume
