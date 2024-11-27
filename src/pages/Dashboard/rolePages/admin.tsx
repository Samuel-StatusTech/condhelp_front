/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "../styled"

import Card from "../../../components/Card"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import {
  dashboardShortcuts,
  PDashboardShortcut,
} from "../../../utils/system/dashboardShortcuts"
import { useCallback, useEffect, useState } from "react"
import { Api } from "../../../api"
import { TBudget } from "../../../utils/@types/data/budget"
import { TUser } from "../../../utils/@types/data/user"

const DashboardAdmin = () => {
  const [data, setData] = useState({
    condos: 0,
    providers: 0,
    users: 0,
    budgets: 0,
  })

  const [budgetsDetails, setBudgetsDetails] = useState<{
    [key in TBudget["status"]]: number
  }>({
    approved: 0,
    awaiting: 0,
    rejected: 0,
  })

  const [gridData, setGridData] = useState({
    region: 0,
    condo: 0,
    FILIAL: 0,
    FRANQUEADO: 0,
    PRESTADOR: 0,
    SINDICO: 0,
    chat: 0,
    faq: 0,
    category: 0,
    subcategory: 0,
    user: 0,
    settings: 0,
  })

  // Cards

  const renderCardsContent = () => {
    const content: JSX.Element[] = [
      <Card.Dashboard
        title="CONDOMÍNIOS"
        k={2}
        data={{
          role: "superavit",
          mainValue: data.condos,
        }}
      />,
      <Card.Dashboard
        title="PRESTADORES"
        k={3}
        data={{
          role: "deficit",
          mainValue: data.providers,
        }}
      />,
      <Card.Dashboard
        title="USUÁRIOS"
        k={4}
        data={{
          role: "superavit",
          mainValue: data.users,
        }}
      />,
      <Card.Dashboard
        title="ORÇAMENTOS"
        k={5}
        data={{
          role: "deficit",
          mainValue: data.budgets,
        }}
      />,
    ]

    return <PageRow>{content}</PageRow>
  }

  const renderGridContent = useCallback(() => {
    let content: any[] = []

    dashboardShortcuts.ADMIN.forEach((s, sk) => {
      content.push(
        <Card.DashboardShortcut
          k={5 + (sk + 1) / 2}
          title={s.title}
          icon={s.icon}
          registers={gridData[s.icon]}
          link={s.link}
        />
      )
    })

    // content.push(
    //   <Card.DashboardShortcut
    //     k={5 + dashboardShortcuts.ADMIN.length / 2}
    //     title={"Configurações"}
    //     icon={"settings"}
    //     link={"/settings"}
    //     text={"Avançado"}
    //   />
    // )

    return content
  }, [gridData])

  const getGridResume = (info: TUser[]) => {
    return new Promise((resolve) => {
      let gridInfo: { [key in PDashboardShortcut["icon"]]: number } = {
        region: 0,
        condo: 0,
        FILIAL: 0,
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

      try {
        info.forEach((u) => {
          gridInfo.user += 1

          switch (u.profile) {
            case "FILIAL":
              gridInfo.FILIAL += 1
              break
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

      resolve(gridInfo)
    })
  }

  /*
   *  Load data
   */

  const loadData = useCallback(async () => {
    let condoCount = 0
    let providerCount = 0
    let userCount = 0
    let budgetCount = 0

    let budgetsInfo: { [key in TBudget["status"]]: number } = {
      approved: 0,
      awaiting: 0,
      rejected: 0,
    }

    let gridInfo: {
      region: number
      condo: number
      FILIAL: number
      FRANQUEADO: number
      PRESTADOR: number
      SINDICO: number
      chat: number
      faq: number
      category: number
      subcategory: number
      user: number
      settings: number
    } = {
      region: 0,
      condo: 0,
      FILIAL: 0,
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

    // Condos
    proms.push(
      new Promise(async (resolve, reject) => {
        try {
          const req = await Api.condos.listAll({})

          if (req.ok) {
            condoCount = req.data.totalElements
            budgetsInfo = {
              approved: 0,
              awaiting: 0,
              rejected: 0,
            }
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

          if (req.ok) budgetCount = req.data.totalElements

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
          const req = await Api.persons.listAll({})

          if (req.ok) {
            // Providers
            providerCount = req.data.content.filter(
              (u) => u.profile === "PRESTADOR"
            ).length

            // Users
            userCount = req.data.totalElements

            const gridResume = (await getGridResume(req.data.content)) as any
            gridInfo = gridResume
          }

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
      users: userCount,
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
        <span>Painel Administrativo</span>
      </S.BlockTitle>

      {renderCardsContent()}

      <Divider />

      <PageRow>
        <Card.ApprovalResume
          k={1}
          title="Todos os Orçamentos"
          data={budgetsDetails}
          role="budgets"
        />
      </PageRow>

      <Divider />

      <S.ShortcutsGrid>{renderGridContent()}</S.ShortcutsGrid>
    </S.SubContent>
  )
}

export default DashboardAdmin
