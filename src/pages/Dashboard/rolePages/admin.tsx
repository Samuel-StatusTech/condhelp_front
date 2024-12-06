/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "../styled"

import Card from "../../../components/Card"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import { dashboardShortcuts } from "../../../utils/system/dashboardShortcuts"
import { useCallback, useEffect, useState } from "react"
import { Api } from "../../../api"
import { TUser } from "../../../utils/@types/data/user"
import { getStore } from "../../../store"

type TGridInfo = {
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
}

const gridInitial: TGridInfo = {
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

const DashboardAdmin = () => {
  const { controllers } = getStore()

  const [data, setData] = useState({
    condos: 0,
    providers: 0,
    users: 0,
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

  const [loading, setLoading] = useState(true)

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

    return content
  }, [gridData])

  const getGridResume = (info: TUser[], gridRef: TGridInfo) => {
    let gridInfo: TGridInfo = gridRef

    try {
      info.forEach((u) => {
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

    gridInfo.user =
      gridInfo.FILIAL +
      gridInfo.FRANQUEADO +
      gridInfo.PRESTADOR +
      gridInfo.SINDICO

    return gridInfo
  }

  /*
   *  Load data
   */

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
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
        FILIAL: 0,
        FRANQUEADO: 0,
        PRESTADOR: 0,
        SINDICO: 0,
        region: 0,
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

      // Regions
      proms.push(
        new Promise(async (resolve, reject) => {
          try {
            const req = await Api.regions.listAll({ size: 1 })

            if (req.ok) gridInfo.region = req.data.totalElements

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
        users: gridInfo.user,
        budgets: budgetCount,
      })

      setBudgetsDetails(budgetsInfo)

      setGridData(gridInfo)

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
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
