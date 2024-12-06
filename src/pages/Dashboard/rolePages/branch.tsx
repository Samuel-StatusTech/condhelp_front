/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "../styled"

import Card from "../../../components/Card"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import { dashboardShortcuts } from "../../../utils/system/dashboardShortcuts"
import { useCallback, useEffect, useState } from "react"
import { Api } from "../../../api"
import { TUser } from "../../../utils/@types/data/user"

type TGridInfo = {
  condo: number
  FRANQUEADO: number
  PRESTADOR: number
  SINDICO: number
  chat: number
  faq: number
  category: number
  subcategory: number
  user: number
  settings: number
}

const gridInitial: TGridInfo = {
  condo: 0,
  FRANQUEADO: 0,
  PRESTADOR: 0,
  SINDICO: 0,
  chat: 0,
  faq: 0,
  category: 0,
  subcategory: 0,
  user: 0,
  settings: 0,
}

const DashboardBranch = () => {
  const [data, setData] = useState({
    franchises: 0,
    providers: 0,
    condos: 0,
    budgets: 0,
  })

  const [budgetsDetails, setBudgetsDetails] = useState<{
    [key: string]: number
  }>({
    approved: 0,
    awaiting: 0,
    rejected: 0,
  })

  const [gridData, setGridData] = useState(gridInitial)

  // Cards

  const renderCardsContent = () => {
    const content: JSX.Element[] = [
      <Card.Dashboard
        title="FRANQUEADOS"
        k={2}
        data={{
          role: "superavit",
          mainValue: data.franchises,
          percentage: 12,
          indicatorText: "este mês",
        }}
      />,
      <Card.Dashboard
        title="PRESTADORES"
        k={3}
        data={{
          role: "deficit",
          mainValue: data.providers,
          percentage: 4,
          indicatorText: "este mês",
        }}
      />,
      <Card.Dashboard
        title="CONDOMÍNIOS"
        k={4}
        data={{
          role: "superavit",
          mainValue: data.condos,
          percentage: 7,
          indicatorText: "de aumento",
        }}
      />,
      <Card.Dashboard
        title="ORÇAMENTOS"
        k={5}
        data={{
          role: "deficit",
          mainValue: data.budgets,
          percentage: 2,
          indicatorText: "de redução",
        }}
      />,
    ]

    return <PageRow>{content}</PageRow>
  }

  const renderGridContent = () => {
    let content: any[] = []

    dashboardShortcuts.FILIAL.forEach((s, sk) => {
      content.push(
        <Card.DashboardShortcut
          k={5 + (sk + 1) / 2}
          title={s.title}
          icon={s.icon}
          registers={gridData[s.icon as keyof TGridInfo]}
          link={s.link}
        />
      )
    })

    return content
  }

  /*
   *  Load data
   */

  const getGridResume = (info: TUser[], gridRef: TGridInfo) => {
    let gridInfo: TGridInfo = gridRef

    try {
      info.forEach((u) => {
        switch (u.profile) {
          case "FRANQUEADO":
            gridInfo.FRANQUEADO += 1
            break
          case "PRESTADOR":
            gridInfo.PRESTADOR += 1
            break
          case "SINDICO":
            gridInfo.SINDICO += 1
            break
          default:
            break
        }
      })
    } catch (error) {}

    gridInfo.user = gridInfo.FRANQUEADO + gridInfo.PRESTADOR + gridInfo.SINDICO

    return gridInfo
  }

  const loadData = useCallback(async () => {
    let condoCount = 0
    let providerCount = 0
    let budgetCount = 0

    let budgetsInfo: { [key: string]: number } = {
      approved: 0,
      awaiting: 0,
      rejected: 0,
    }

    let gridInfo: TGridInfo = {
      condo: 0,
      FRANQUEADO: 0,
      PRESTADOR: 0,
      SINDICO: 0,
      chat: 0,
      faq: 0,
      category: 0,
      subcategory: 0,
      user: 0,
      settings: 0,
    }

    let proms: Promise<any>[] = []

    // Categories
    proms.push(
      new Promise(async (resolve, reject) => {
        try {
          const req = await Api.categories.listAll({ size: 1 })

          if (req.ok) gridInfo.category = req.data.totalElements

          resolve(true)
        } catch (error) {
          reject()
        }
      })
    )

    // Subcategories
    proms.push(
      new Promise(async (resolve, reject) => {
        try {
          const req = await Api.subcategories.listAll({ size: 1 })

          if (req.ok) gridInfo.subcategory = req.data.totalElements

          resolve(true)
        } catch (error) {
          reject()
        }
      })
    )

    // Condos
    proms.push(
      new Promise(async (resolve, reject) => {
        try {
          const req = await Api.condos.listAll({ size: 1 })

          if (req.ok) {
            condoCount = req.data.totalElements
            gridInfo.condo = req.data.totalElements
          }

          resolve(true)
        } catch (error) {
          reject()
        }
      })
    )

    // Budgets
    proms.push(
      new Promise(async (resolve, reject) => {
        try {
          const req = await Api.budgets.listAll({})

          if (req.ok) {
            budgetCount = req.data.totalElements
            budgetsInfo = req.data.content.reduce(
              (prev, b) => ({
                approved: prev.approved + b.accepted,
                awaiting: prev.awaiting + b.awaiting,
                rejected: prev.rejected + b.rejected,
              }),
              budgetsInfo
            )
          }

          resolve(true)
        } catch (error) {
          reject()
        }
      })
    )

    // Providers and users
    proms.push(
      new Promise(async (resolve, reject) => {
        try {
          const req = await Api.persons.listAll({ size: 300 })

          if (req.ok) {
            // Providers
            providerCount = req.data.content.filter(
              (u) => u.profile === "PRESTADOR"
            ).length

            gridInfo = getGridResume(req.data.content, gridInfo)
          }

          resolve(true)
        } catch (error) {
          reject()
        }
      })
    )

    // FAQ's
    proms.push(
      new Promise(async (resolve, reject) => {
        try {
          const req = await Api.faqs.listAll({ size: 1 })

          if (req.ok) gridInfo.faq = req.data.totalElements

          resolve(true)
        } catch (error) {
          reject()
        }
      })
    )

    await Promise.all(proms)

    setData({
      condos: condoCount,
      providers: providerCount,
      franchises: gridInfo.FRANQUEADO,
      budgets: budgetCount,
    })

    setBudgetsDetails(budgetsInfo)

    setGridData(gridInfo)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <S.SubContent>
      <S.BlockTitle $k={2}>
        <span>Painel Administrativo da Filial</span>
      </S.BlockTitle>

      {renderCardsContent()}

      <Divider />

      <PageRow>
        <Card.ApprovalResume
          k={1}
          title="Estatísticas gerais de orçamentos"
          data={budgetsDetails}
          role="budgets"
          doubledCard={true}
        />
        <Card.ApprovalResume
          k={1}
          title="Estatísticas gerais de prestadores"
          data={budgetsDetails}
          role="providers"
          doubledCard={true}
        />
      </PageRow>

      <Divider />

      <S.ShortcutsGrid>{renderGridContent()}</S.ShortcutsGrid>
    </S.SubContent>
  )
}

export default DashboardBranch
