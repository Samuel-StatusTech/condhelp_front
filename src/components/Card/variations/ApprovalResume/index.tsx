import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as Papercheck } from "../../../../assets/icons/papercheck.svg"
import { ReactComponent as DropdownIcon } from "../../../../assets/icons/dropdown.svg"
import { useState } from "react"
import Divider from "../../../_minimals/Divider"

type Props = {
  k: number
  title: string
  data: {
    approved: number
    awaiting: number
    rejected: number
  }
}

const DataResumeItem = ({
  type,
  number,
}: {
  type: "approved" | "awaiting" | "rejected"
  number: number
}) => {
  const renderType = () => {
    let str = ""

    switch (type) {
      case "approved":
        str = `Aprovada${number > 1 ? "s" : ""}`
        break
      case "awaiting":
        str = `Aguardando`
        break
      case "rejected":
        str = `Reprovada${number > 1 ? "s" : ""}`
        break
      default:
        break
    }

    return str
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

const GraphData = ({
  type,
  size,
}: {
  type: "approved" | "awaiting" | "rejected"
  size: number
}) => {
  const value = Math.round(size)

  return (
    <S.GraphData $type={type} $size={value}>
      {value > 0 && <span>{value}%</span>}
    </S.GraphData>
  )
}

const ApprovalResume = ({ k, title, data }: Props) => {
  const total = data.approved + data.awaiting + data.rejected

  const [isOpened, setIsOpened] = useState(true)

  return (
    <C.Element $k={k}>
      <C.HTop onClick={() => setIsOpened(!isOpened)}>
        <C.Header>
          <C.HPart $k={k}>
            <Papercheck />
            <span>{title}</span>
          </C.HPart>
          <S.DataResumeArea>
            <DataResumeItem type="approved" number={data.approved} />
            <DataResumeItem type="awaiting" number={data.awaiting} />
            <DataResumeItem type="rejected" number={data.rejected} />
          </S.DataResumeArea>
          <C.HPart $k={k} $expanded={isOpened}>
            <span>{isOpened ? "Recolher" : "Expandir"}</span>
            <DropdownIcon />
          </C.HPart>
        </C.Header>
        <Divider />
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
    </C.Element>
  )
}

export default ApprovalResume
