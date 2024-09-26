import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as UserIcon } from "../../../../assets/icons/users.svg"
import { PLeaderItem } from "../../../../utils/@types/components/LeaderItem"
import ReactApexChart from "react-apexcharts"
import { theme } from "../../../../theme"
import Button from "../../../Button"

import { Icons } from "../../../../assets/icons/icons"

export type PGraph = {
  title?: string
  approved: number
  awaiting: number
  rejected: number
}

type Props = {
  k: number
  data: {
    leader: PLeaderItem
    graphs: PGraph[]
  }
  togglePointsModal: (p?: any) => void
}

type PGraphBlock = {
  k: number
  graph: PGraph
}

const GraphBlock = ({ k, graph }: PGraphBlock) => {
  const handleClick = () => {
    // ...
  }

  return (
    <S.GraphBlock onClick={handleClick}>
      <ReactApexChart
        width={140}
        height={140}
        type="pie"
        series={[graph.approved, graph.awaiting, graph.rejected]}
        options={{
          labels: [`Aprovadas`, "Aguardando", "Reprovadas"],
          colors: [theme.colors.green, theme.colors.yellow, theme.colors.red.main],
          legend: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
        }}
      />

      <S.ResumeArea>
        {graph.title && (
          <S.Legend $k={k + 1}>
            <span>{graph.title}</span>
          </S.Legend>
        )}
        <S.RData $k={k + 2}>
          <S.Color $color={"approved"} />
          <S.Legend>
            <span>{graph.approved}</span>{" "}
            <span>Aprovada{graph.approved > 1 ? "s" : ""}</span>
          </S.Legend>
        </S.RData>
        <S.RData $k={k + 3}>
          <S.Color $color={"awaiting"} />
          <S.Legend>
            <span>{graph.awaiting}</span> <span>Aguardando</span>
          </S.Legend>
        </S.RData>
        <S.RData $k={k + 4}>
          <S.Color $color={"denied"} />
          <S.Legend>
            <span>{graph.rejected}</span>{" "}
            <span>Rejeitada{graph.rejected > 1 ? "s" : ""}</span>
          </S.Legend>
        </S.RData>
      </S.ResumeArea>
    </S.GraphBlock>
  )
}

const MemberDetails = ({ k, data, togglePointsModal }: Props) => {
  return (
    <C.Element>
      <C.MainWrapper $expanded={true}>
        <C.ContentWrapper>
          <C.Content>
            <S.LeaderItem $k={k}>
              <S.UserArea>
                {data.leader.profile ? (
                  <img src={data.leader.profile} alt={""} />
                ) : (
                  <UserIcon />
                )}
                <S.UserNameArea>
                  <S.UserName>{data.leader.name}</S.UserName>
                  <S.UserCompany>{data.leader.company}</S.UserCompany>
                </S.UserNameArea>
              </S.UserArea>
            </S.LeaderItem>
            <S.List>
              {data.graphs.map((info, key) => (
                <GraphBlock k={k + (key + 1) / 2} key={key} graph={info} />
              ))}
            </S.List>
            <Button
              type="main"
              text="Ajustar pontuação"
              icon={<Icons.ChangingPoints />}
              iconLeft={true}
              action={togglePointsModal}
            />
          </C.Content>
        </C.ContentWrapper>
      </C.MainWrapper>
    </C.Element>
  )
}

export default MemberDetails
