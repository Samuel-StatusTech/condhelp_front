/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "../styled"

import Card from "../../../components/Card"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import { getStore } from "../../../store"
import { TProviderBudgetResume } from "../../../utils/@types/data/budget"
import { useCallback, useEffect, useState } from "react"
import { DataResumeItem } from "../../../components/Card/variations/ApprovalResume"
import Table from "../../../components/Table"
import { tableConfig } from "../../../utils/system/table"
import SearchBlock from "../../../components/SearchBlock"
import { systemOptions } from "../../../utils/system/options"
import { TFilter } from "../../../utils/@types/components/SearchBlock"
import { TOption } from "../../../components/Input/points"
import { Api } from "../../../api"
import ProviderBudgetDetails from "./details/providerBudgetDetails"
import { TBudgetStatistics } from "../../../utils/@types/data/budgetResume"
import { TFinishedBudgets } from "../../../utils/@types/data/budget/finished"
import { getDateStr } from "../../../utils/tb/format/date"
import { matchSearch } from "../../../utils/tb/helpers/matchSearch"

const DashboardProvider = () => {
  const { user, controllers } = getStore()

  /*
   *  Search control
   */

  const [loading, setLoading] = useState(true)
  const [budget, setBudget] = useState<TProviderBudgetResume | null>(null)

  const [finishedBudgetsSearch, setFinishedBudgetsSearch] = useState("")
  const [filters, setFilters] = useState({
    status: "",
  })
  const [options] = useState<{ [key: string]: TOption[] }>({
    status: systemOptions.budgetsStatus,
  })

  const handleFilters = (filter: Partial<TFilter>) => {
    setFilters((filtersList) => ({
      ...filtersList,
      [filter.name as string]: filter.value,
    }))
  }

  const handleFinishedBudgetsSearch = async () => {}

  // Engine

  const [budgets, setBudgets] = useState<TProviderBudgetResume[]>([])
  const [budgetsResume, setBudgetsResume] = useState<TBudgetStatistics>({
    total: 0,
    completed: 0,
    inProgress: 0,
    canceled: 0,
    completedPercentage: 0,
    inProgressPercentage: 0,
    canceledPercentage: 0,
  })
  const [finishedBudgets, setFinishedBudgets] = useState<TFinishedBudgets[]>([])

  const loadBudgetInfo = async (pickedBudget: TProviderBudgetResume) => {
    setBudget(pickedBudget)
  }

  const reloadPage = () => {
    window.location.reload()
  }

  const handleReparticipate = async (budgetId: number) => {
    try {
      setLoading(true)

      const req = await Api.budgets.interact({
        budgetId: budgetId,
        providerId: user?.userAccountId as number,
        status: "AGUARDANDO_SINDICO",
      })

      if (req.ok) {
        setLoading(false)
        reloadPage()
      } else throw new Error()
    } catch {
      controllers.feedback.setData({
        state: "error",
        message:
          "Não foi possível confirmar sua participação. Tente novamente mais tarde.",
        visible: true,
      })
    }

    setLoading(false)
  }

  // Cards

  const renderCardsContent = () => {
    const content: JSX.Element[] = budgets.map((budget) => (
      <Card.ProviderBudgetResume
        k={2}
        data={budget}
        onPickBudget={() => loadBudgetInfo(budget)}
      />
    ))

    return (
      <PageRow>
        <S.BudgetsArea>{content}</S.BudgetsArea>
      </PageRow>
    )
  }

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // Budgets

      const budgetsReq = await Api.budgets.listProviderBudgets({
        size: 300,
        providerId: user?.userAccountId,
      })

      if (budgetsReq.ok) {
        let resume = {
          total: 0,
          approved: 0,
          awaiting: 0,
          rejected: 0,
        }

        budgetsReq.data.content.forEach((b) => {
          resume.total = resume.total + b.accepted + b.awaiting + b.rejected
          resume.approved = resume.approved + b.accepted
          resume.awaiting = resume.awaiting + b.awaiting
          resume.rejected = resume.rejected + b.rejected
        })

        setBudgets(budgetsReq.data.content)

        /*
         * Finished table content
         */

        const finishedsReq = await Api.budgets.finished.provider({
          size: 300,
          id: user?.userId as number,
        })

        if (finishedsReq.ok) {
          setFinishedBudgets(
            finishedsReq.data.content.sort((a, b) =>
              a.endDate && b.endDate
                ? new Date(a.endDate).getTime() > new Date(b.endDate).getTime()
                  ? 1
                  : -1
                : a.endDate && !b.endDate
                ? 1
                : -1
            )
          )
        } else throw new Error()

        let resumeReq = await Api.budgets.statistics({
          providerId: user?.userAccountId as number,
        })

        if (resumeReq.ok) setBudgetsResume(resumeReq.data)
        else throw new Error()
      } else throw new Error()

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

  return !budget ? (
    <S.SubContent>
      <S.BlockArea className="falseSubContentWrapper">
        <S.BlockHeader>
          <S.BlockTitle $k={2}>
            <span>
              {budgets.length > 0
                ? `Olá ${user?.name}, estes são os orçamentos em andamento:`
                : `Olá ${user?.name}, você não tem orçamentos em andamento.`}
            </span>
          </S.BlockTitle>
        </S.BlockHeader>

        {budgets.length > 0 && <Divider />}

        {budgets.length > 0 && renderCardsContent()}
      </S.BlockArea>

      <PageRow>
        <S.BlockArea>
          <S.ManagerBudgetsResumeArea>
            <S.MBRMessage>
              Sua empresa já recebeu, <span>{budgetsResume.total}</span>{" "}
              orçamentos:
            </S.MBRMessage>
            <S.MBRDataArea>
              <DataResumeItem
                type={"approved"}
                number={budgetsResume.completed}
                total={budgetsResume.total}
                role={"budgets"}
              />
              <DataResumeItem
                type={"awaiting"}
                number={budgetsResume.inProgress}
                total={budgetsResume.total}
                role={"budgets"}
              />
              <DataResumeItem
                type={"rejected"}
                number={budgetsResume.canceled}
                total={budgetsResume.total}
                role={"budgets"}
              />
            </S.MBRDataArea>
          </S.ManagerBudgetsResumeArea>
        </S.BlockArea>
      </PageRow>

      <S.BlockArea className="falseSubContentWrapper">
        <S.BlockTitle $k={2}>
          <span>Histórico de orçamentos finalizados:</span>
        </S.BlockTitle>

        <SearchBlock
          search={finishedBudgetsSearch}
          onSearchChange={setFinishedBudgetsSearch}
          onSearch={handleFinishedBudgetsSearch}
          searchPlaceholder="Pesquisar por id, data, título, condomínio..."
          onFilterChange={handleFilters}
          filters={[
            {
              label: "Status",
              name: "status",
              options: options.status,
              value: filters.status,
            },
          ]}
        />

        <Table
          config={tableConfig.finishedBudgets}
          actions={{
            reparticipate: handleReparticipate,
          }}
          data={finishedBudgets.filter((i) => {
            const fields = [
              i.title,
              i.condominiumName,
              getDateStr(i.endDate, "dmy"),
            ]

            let ok = true
            let searchOk = true
            let statusOk = true

            searchOk = !!finishedBudgetsSearch
              ? fields.some((val) => matchSearch(val, finishedBudgetsSearch))
              : true

            if (filters.status && filters.status !== "all") {
              statusOk = i.status === filters.status
            }

            statusOk = !!finishedBudgetsSearch
              ? fields.some((val) => matchSearch(val, finishedBudgetsSearch))
              : true

            ok = searchOk && statusOk

            return ok
          })}
        />
      </S.BlockArea>
    </S.SubContent>
  ) : (
    <ProviderBudgetDetails
      budget={budget}
      handleBack={() => {
        setBudget(null)
        window.location.reload()
      }}
    />
  )
}

export default DashboardProvider
