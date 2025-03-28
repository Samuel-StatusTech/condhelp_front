/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "../styled"

import Card from "../../../components/Card"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import { dashboardShortcuts } from "../../../utils/system/dashboardShortcuts"
import { useCallback, useEffect, useState } from "react"
import { Api } from "../../../api"
import { getStore } from "../../../store"
import { TDashboardAdmin } from "../../../utils/@types/data/dashboards/admin"
import initials from "../../../utils/initials"

const DashboardAdmin = ({ canLoadData }: { canLoadData: boolean }) => {
  const { controllers } = getStore()

  const [data, setData] = useState<TDashboardAdmin>(initials.dashboards.admin)

  const [loading, setLoading] = useState(false)

  // Cards

  const renderCardsContent = () => {
    const content: JSX.Element[] = [
      <Card.Dashboard
        title="CONDOMÍNIOS"
        k={2}
        data={{
          role: "superavit",
          mainValue: data.totalCondominiums,
        }}
      />,
      <Card.Dashboard
        title="PRESTADORES"
        k={3}
        data={{
          role: "deficit",
          mainValue: data.totalProviders,
        }}
      />,
      <Card.Dashboard
        title="SÍNDICOS"
        k={4}
        data={{
          role: "superavit",
          mainValue: data.totalManagers,
        }}
      />,
      <Card.Dashboard
        title="ORÇAMENTOS"
        k={5}
        data={{
          role: "deficit",
          mainValue: data.totalBudgets,
        }}
      />,
    ]

    return <PageRow>{content}</PageRow>
  }

  const renderGridContent = useCallback(() => {
    let content: any[] = []

    const totalUsers =
      data.totalProviders +
      data.totalManagers +
      data.totalFranchises +
      data.totalBranches

    dashboardShortcuts.ADMIN.forEach((s, sk) => {
      const keyValue: { [key: string]: keyof typeof data } = {
        FILIAL: "totalBranches",
        FRANQUEADO: "totalFranchises",
        region: "totalRegions",
        PRESTADOR: "totalProviders",
        SINDICO: "totalManagers",
        condo: "totalCondominiums",
        chat: "totalErrands" as any,
        faq: "totalFaqs",
        category: "totalCategories",
        subcategory: "totalSubCategories",
        user: "totalUsers" as any,
        settings: "total" as any,
      }

      content.push(
        <Card.DashboardShortcut
          k={5 + (sk + 1) / 2}
          title={s.title}
          icon={s.icon}
          registers={
            s.icon === "user"
              ? totalUsers
              : s.icon === "settings"
              ? 0
              : (data[keyValue[s.icon]] as number)
          }
          link={s.link}
        />
      )
    })

    return content
  }, [data])

  /*
   *  Load data
   */

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.dashboards.main({})

      if (req.ok) {
        setData(req.data)
        setLoading(false)
      } else throw new Error()
    } catch (error) {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (canLoadData) loadData()
  }, [loadData, canLoadData])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  return (
    <S.SubContent>
      <S.BlockTitle $k={2}>
        <span>Painel Administrativo</span>
      </S.BlockTitle>

      {renderCardsContent()}

      <Divider />

      <PageRow>
        <Card.ApprovalResume
          k={1}
          title="Todos os Orçamentos"
          data={{
            approved: data.totalBudgetsCompleted,
            awaiting: data.totalBudgetsInProgress,
            rejected: data.totalBudgetsCancelled,
          }}
          role="budgets"
        />
      </PageRow>

      <Divider />

      <S.ShortcutsGrid>{renderGridContent()}</S.ShortcutsGrid>
    </S.SubContent>
  )
}

export default DashboardAdmin
