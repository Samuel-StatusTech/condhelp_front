import * as S from ".././styled"
import { fdata } from "../../../utils/_dev/falseData"

import Card from "../../../components/Card"
import PageRow from "../../../components/_minimals/PageRow"
import { PGraph } from "../../../components/Card/variations/LeaderDetails"
import BreadCrumb from "../../../components/BreadCrumb"
import Modal from "../../../components/Modal"
import { useEffect, useState } from "react"
import { TGoal } from "../../../utils/@types/data/goal"
import { FDgoalViews } from "../../../utils/_dev/falseData/goalViews"
import { FDgoals } from "../../../utils/_dev/falseData/goals"

type Props = {
  handleSubPageChange: (page: "main" | "leaderDetails", data?: any) => void
  data: { id: string }
}

const Leaders = ({ handleSubPageChange, data }: Props) => {
  const [modal, setModal] = useState<{ visible: boolean; data: any }>({
    visible: false,
    data: null,
  })

  const getGraphs = () => {
    let res: PGraph[] = []

    // process data..

    const leaderStats = {
      title: "Estatísticas do Líder",
      approved: 35,
      awaiting: 11,
      rejected: 0,
    }

    const teamStats = {
      title: "Estatísticas da Equipe",
      approved: 35,
      awaiting: 11,
      rejected: 3,
    }

    res = [leaderStats, teamStats]

    return res
  }

  const handleBack = () => {
    handleSubPageChange("main")
  }

  const handleSelectGoal = (goal: TGoal) => {
    const orGoal = FDgoals.find((gl) => gl.id === goal.id)
    const g = FDgoalViews.find((gl) => gl.goalId === goal.id)

    if (goal && orGoal && g) {
      setModal({
        visible: true,
        data: {
          goalName: orGoal?.name,
          viewers: g?.viewers,
        },
      })
    }
  }

  useEffect(() => {
    window.addEventListener("popstate", (ev: PopStateEvent) => {
      ev.preventDefault()

      handleSubPageChange("main")
    })

    window.scrollTo({ top: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.SubContent>
      <Modal
        visible={modal.visible && modal.data}
        onClose={() => setModal({ visible: false, data: null })}
        role={"goalViews"}
        data={modal.data ?? { viewers: [] }}
      />

      <BreadCrumb
        paths={[
          { title: "Dashboard", to: "/dashboard", action: handleBack },
          { title: "Líderes", to: window.location.href },
        ]}
      />
      <PageRow>
        <Card
          k={1}
          type="leaderDetails"
          title=""
          data={{
            leader: fdata.cards.leaders.find((l) => l.id === data.id),
            graphs: getGraphs(),
          }}
        />
        <Card
          k={2}
          type="lights"
          title="Semaforo do Líder"
          data={fdata.cards.goalsLights}
          actions={{ handleSelectGoal }}
        />
        <Card
          k={3}
          type="team"
          title="Equipe do líder"
          data={fdata.cards.myTeam}
          actions={{ handleSubPageChange }}
        />
      </PageRow>
    </S.SubContent>
  )
}

export default Leaders
