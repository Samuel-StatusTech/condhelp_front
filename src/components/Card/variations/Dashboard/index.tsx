import * as S from "./styled"

import { ReactComponent as SuperavitGraph } from "../../../../assets/icons/superavitGraph.svg"

type Props = {
  k: number
  title: string
  data: {
    role: "superavit" | "deficit"
    mainValue: number | string
    percentage?: number
    indicatorText?: string
  }
}

const DashboardCard = ({ k, title, data }: Props) => {
  return (
    <S.Element $k={k}>
      <S.CardMain>
        <S.CardTitle>{title}</S.CardTitle>
        <S.CardInfo>
          <S.CardNumber>{data.mainValue}</S.CardNumber>
          {/* <S.RelativeData $state={data.role}>
            <Icons.CircleIndicator />
            <S.RDPercentage>
              <span>
                {(data.role === "superavit" ? "+" : "-") +
                  `${data.percentage}% `}
              </span>
              <span>{data.indicatorText}</span>
            </S.RDPercentage>
          </S.RelativeData> */}
        </S.CardInfo>
      </S.CardMain>
      <S.GraphArea>
        <SuperavitGraph />
        {/* {data.role === "superavit" ? <SuperavitGraph /> : <DeficitGraph />} */}
      </S.GraphArea>
    </S.Element>
  )
}

export default DashboardCard
