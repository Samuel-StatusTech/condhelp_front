/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "../styled"

import Card from "../../../components/Card"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import { dashboardShortcuts } from "../../../utils/system/dashboardShortcuts"
import { useCallback, useEffect, useState } from "react"
import { getStore } from "../../../store"
import { Api } from "../../../api"
import initials from "../../../utils/initials"
import { TDashboardFranchise } from "../../../utils/@types/data/dashboards/franchise"

const DashboardFranchise = () => {
  const { controllers } = getStore()

  const [data, setData] = useState<TDashboardFranchise>(
    initials.dashboards.admin
  )

  const [loading, setLoading] = useState(true)

  // Cards

  const renderCardsContent = () => {
    const content: JSX.Element[] = [
      <Card.Dashboard
        title="SÍNDICOS"
        k={2}
        data={{
          role: "superavit",
          mainValue: data.totalManagers,
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
        title="CONDOMÍNIOS"
        k={4}
        data={{
          role: "superavit",
          mainValue: data.totalCondominiums,
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

    dashboardShortcuts.FRANQUEADO.forEach((s, sk) => {
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
      } else throw new Error()
    } catch (error) {
      // ...
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  return (
    <S.SubContent>
      <S.BlockTitle $k={2}>
        <span>Painel Administrativo do Franqueado</span>
      </S.BlockTitle>

      {renderCardsContent()}

      <Divider />

      <PageRow>
        <Card.ApprovalResume
          k={1}
          title="Estatísticas gerais de orçamentos"
          data={{
            approved: data.totalBudgetsCompleted,
            awaiting: data.totalBudgetsInProgress,
            rejected: data.totalBudgetsCancelled,
          }}
          role="budgets"
          doubledCard={true}
        />
        <Card.ApprovalResume
          k={1}
          title="Estatísticas gerais de prestadores"
          data={{
            approved: data.providerPercentage?.totalProvideActive ?? 0,
            awaiting: data.providerPercentage?.totalProvideInative ?? 0,
          }}
          role="providers"
          doubledCard={true}
        />
      </PageRow>

      <Divider />

      <S.ShortcutsGrid>{renderGridContent()}</S.ShortcutsGrid>
    </S.SubContent>
  )
}

export default DashboardFranchise
