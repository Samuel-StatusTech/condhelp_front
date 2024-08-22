/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import Banner from "../../../components/Banner"
import Card from "../../../components/Card"
import NewsboardSection from "../../../components/NewsboardSection"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import PageCol from "../../../components/_minimals/PageCol"
import * as S from ".././styled"
import { getStore } from "../../../store"
import { fdata } from "../../../utils/_dev/falseData"
import { useGoogleLogin } from "@react-oauth/google"

import axios from "axios"
import { TGoogleEvent } from "../../../utils/@types/data/googleEvents"
import Modal from "../../../components/Modal"
import { TGoal } from "../../../utils/@types/data/goal"
import { FDgoals } from "../../../utils/_dev/falseData/goals"
import { FDgoalViews } from "../../../utils/_dev/falseData/goalViews"
import initials from "../../../utils/initials"

type Props = {
  handleSubPageChange: (page: "main" | "leaderDetails", data?: any) => void
}

const Principal = ({ handleSubPageChange }: Props) => {
  const { user, controllers } = getStore()

  const [modal, setModal] = useState<{
    visible: boolean
    data: any
    role?: string
  }>({
    visible: false,
    data: null,
    role: "",
  })

  const auth = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/calendar",
    onSuccess: (res) => {
      if (user) {
        controllers.user.setData({ ...user, googleAToken: res.access_token })
        loadCalendar(res.access_token)
      }
    },
  })

  const [banner] = useState(null)
  const [googleEvents, setGoogleEvents] = useState<TGoogleEvent[]>([])

  const loadCalendar = async (token?: string) => {
    if (token || user?.googleAToken) {
      axios
        .get(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          {
            headers: {
              Authorization: `Bearer ${token ?? user?.googleAToken}`,
            },
          }
        )
        .then((response) => {
          setGoogleEvents(response.data.items)
        })
        .catch(() => {
          if (user)
            controllers.user.setData({ ...user, googleAToken: undefined })
        })
    }
  }

  const authGoogle = async () => {
    auth()
  }

  const handleSelectGoal = (goal: TGoal) => {
    const orGoal = FDgoals.find((gl) => gl.id === goal.id)
    const g = FDgoalViews.find((gl) => gl.goalId === goal.id)

    const goalBase = initials.modals.goalFill

    if (goal && orGoal && g) {
      setModal({
        visible: true,
        data:
          user?.level === "employee"
            ? { ...goalBase, bare: { ...goalBase.bare, name: orGoal.name } }
            : {
                goalName: orGoal?.name,
                viewers: g?.viewers,
              },
        role: user?.level === "employee" ? "goalFill" : "goalViews",
      })
    }
  }

  // Cards

  const renderCardsContent = () => {
    let content: any = <></>

    switch (user?.level) {
      case "master":
        content = (
          <>
            <Card
              k={2}
              type="goalsViews"
              title="Todas as metas"
              data={fdata.cards.goalsViews}
              actions={{ handleSelectGoal }}
            />
            <Card
              k={3}
              type="leaders"
              title="Líderes"
              data={fdata.cards.leaders}
              actions={{ handleSubPageChange }}
            />
          </>
        )
        break
      case "leader":
        content = (
          <>
            <PageCol>
              <Card
                k={2}
                type="lights"
                title="Semáforo"
                data={fdata.cards.goalsLights}
              />
              <Card
                k={2.5}
                title="Todas as metas"
                type="goalsViews"
                data={fdata.cards.goalsViews}
                actions={{ handleSelectGoal }}
              />
            </PageCol>
            <Card
              k={3}
              type="team"
              title="Minha equipe"
              data={fdata.cards.myTeam}
              actions={{ handleSubPageChange }}
            />
          </>
        )
        break
      case "employee":
        content = (
          <>
            <PageCol>
              <Card k={2} type="okr" title="OKR" data={fdata.cards.okr} />
              <Card
                k={2.5}
                type="lights"
                title="Todas as metas"
                data={fdata.cards.goalsLights}
                actions={{ handleSelectGoal }}
              />
            </PageCol>
            <PageCol>
              <Card
                k={3}
                type="employees"
                title="Ranking dos Funcionários"
                data={fdata.cards.employeesRanking}
              />
              <Card
                k={3.5}
                type="notifications"
                title="Notificações"
                data={fdata.cards.notifications}
              />
            </PageCol>
          </>
        )
        break
      default:
        content = null
        break
    }

    return content
  }

  useEffect(() => {
    if (user?.googleAToken) loadCalendar()
  }, [])

  return (
    <S.SubContent>
      {banner ? <Banner /> : null}

      <Modal
        visible={modal.visible && modal.data}
        onClose={() => setModal({ visible: false, data: null })}
        role={modal.role as any}
        data={modal.data}
      />

      <PageRow>
        <Card
          k={1}
          type="approvalResume"
          title="Todas as metas"
          data={fdata.cards.approval as any}
          actions={{ handleSelectGoal }}
        />
      </PageRow>

      <PageRow>
        {renderCardsContent()}
        <Card
          k={4}
          type="google"
          title="Google Agenda"
          data={googleEvents}
          actions={{ authGoogle }}
        />
      </PageRow>

      <Divider />

      <NewsboardSection />
    </S.SubContent>
  )
}

export default Principal
