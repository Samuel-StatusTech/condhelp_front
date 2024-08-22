import * as S from ".././styled"
import { fdata } from "../../../utils/_dev/falseData"

import Card from "../../../components/Card"
import PageRow from "../../../components/_minimals/PageRow"
import { PGraph } from "../../../components/Card/variations/LeaderDetails"
import BreadCrumb from "../../../components/BreadCrumb"
import Modal from "../../../components/Modal"
import { useEffect, useState } from "react"

import PageCol from "../../../components/_minimals/PageCol"
import initials from "../../../utils/initials"

type Props = {
  handleSubPageChange: (page: "main" | "leaderDetails", data?: any) => void
  data: { id: string }
}

const TeamMember = ({ handleSubPageChange, data }: Props) => {
  const [modal, setModal] = useState<{
    visible: boolean
    data: any
    role: any
  }>({
    visible: false,
    data: null,
    role: null,
  })

  const getGraphs = () => {
    let res: PGraph[] = []

    // process data..

    const stats = {
      approved: 23,
      awaiting: 14,
      rejected: 0,
    }

    res = [stats]

    return res
  }

  const handleBack = () => {
    handleSubPageChange("main")
  }

  const handleSelectOkr = (okr: any) => {
    if (okr) {
      setModal({
        visible: true,
        data: {
          ...initials.modals.goalApprove,
          title: "OKR",
          points: 0,
          user: fdata.cards.myTeam.find((l) => l.id === data.id),
        },
        role: "okrPoints",
      })
    }
  }

  const handleSelectGoal = (goal: any) => {
    if (goal) {
      setModal({
        visible: true,
        data: {
          ...initials.modals.goalApprove,
          title: goal.title,
          points: goal.points,
          user: fdata.cards.myTeam.find((l) => l.id === data.id),
        },
        role: "goalApprove",
      })
    }
  }

  const togglePointsModal = () => {
    setModal({
      visible: true,
      data: {
        ...initials.modals.goalApprove,
        title: "Ajustar pontuação",
        points: 0,
        user: fdata.cards.myTeam.find((l) => l.id === data.id),
      },
      role: "changingPoints",
    })
  }

  useEffect(() => {
    window.addEventListener("popstate", (ev: PopStateEvent) => {
      ev.preventDefault()

      handleSubPageChange("main")
    })

    window.scrollTo({ top: 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOp = (op: string) => {
    if (op === "minus") {
      setModal((m) => ({
        ...m,
        data: { ...m.data, points: m.data.points - 5 },
      }))
    } else if (op === "plus") {
      setModal((m) => ({
        ...m,
        data: { ...m.data, points: m.data.points + 5 },
      }))
    }
  }

  return (
    <S.SubContent>
      <Modal
        visible={modal.visible && modal.data && !!modal.role}
        onClose={() => setModal({ visible: false, data: null, role: "" })}
        role={modal.role as any}
        data={modal.data}
        handleOp={handleOp}
      />

      <BreadCrumb
        paths={[
          { title: "Dashboard", to: "/dashboard", action: handleBack },
          { title: "Membro da equipe", to: window.location.href },
        ]}
      />
      <PageRow>
        <PageCol size={1}>
          <Card
            k={1}
            type="memberDetails"
            title=""
            data={{
              leader: fdata.cards.myTeam.find((l) => l.id === data.id),
              graphs: getGraphs(),
            }}
            actions={{ togglePointsModal }}
          />
          <Card
            k={2}
            type="okr"
            title="OKR"
            data={fdata.cards.okr}
            actions={{ handleSelectOkr }}
          />
        </PageCol>
        <PageCol size={2}>
          <Card
            k={3}
            type="lights"
            title="Semaforo do Funcionário"
            data={fdata.cards.goalsLights}
            actions={{ handleSelectGoal }}
          />
        </PageCol>
      </PageRow>
    </S.SubContent>
  )
}

export default TeamMember
