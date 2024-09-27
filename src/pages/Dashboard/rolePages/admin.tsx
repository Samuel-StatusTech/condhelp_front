/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "../styled"
import { getStore } from "../../../store"
import { fdata } from "../../../utils/_dev/falseData"

import Card from "../../../components/Card"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import { dashboardShortcuts } from "../../../utils/system/dashboardShortcuts"

const DashboardAdmin = () => {
  const { user } = getStore()

  // Cards

  const renderCardsContent = () => {
    let content: any = <></>

    switch (user?.role) {
      case "admin":
        content = [
          <Card.Dashboard
            title="CONDOMÍNIOS"
            k={2}
            data={{
              role: "superavit",
              mainValue: 125,
              percentage: 12,
              indicatorText: "este mês",
            }}
          />,
          <Card.Dashboard
            title="PRESTADORES"
            k={3}
            data={{
              role: "deficit",
              mainValue: 48,
              percentage: 4,
              indicatorText: "este mês",
            }}
          />,
          <Card.Dashboard
            title="USUÁRIOS"
            k={4}
            data={{
              role: "superavit",
              mainValue: 87,
              percentage: 7,
              indicatorText: "de aumento",
            }}
          />,
          <Card.Dashboard
            title="ORÇAMENTOS"
            k={5}
            data={{
              role: "deficit",
              mainValue: 1000,
              percentage: 2,
              indicatorText: "de redução",
            }}
          />,
        ]
        break
      default:
        content = null
        break
    }

    return content ? <PageRow>{content}</PageRow> : null
  }

  const renderGridContent = () => {
    let content: any[] = []

    dashboardShortcuts.admin.forEach((s, sk) => {
      content.push(
        <Card.DashboardShortcut
          k={5 + (sk + 1) / 2}
          title={s.title}
          icon={s.icon}
          registers={s.registers}
          link={s.link}
        />
      )
    })
    content.push(
      <Card.DashboardShortcut
        k={5 + dashboardShortcuts.admin.length / 2}
        title={"Configurações"}
        icon={"settings"}
        link={"/settings"}
        text={"Avançado"}
      />
    )

    return content
  }

  return (
    <S.SubContent>
      {renderCardsContent()}

      <Divider />

      <PageRow>
        <Card.ApprovalResume
          k={1}
          title="Todas os Orçamentos"
          data={fdata.cards.approval as any}
        />
      </PageRow>

      <Divider />

      <S.ShortcutsGrid>{renderGridContent()}</S.ShortcutsGrid>
    </S.SubContent>
  )
}

export default DashboardAdmin
