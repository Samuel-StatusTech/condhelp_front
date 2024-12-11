/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "../styled"

import Card from "../../../components/Card"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import { getStore } from "../../../store"
import {
  TBudgetResume,
  TProviderBudgetResume,
} from "../../../utils/@types/data/budget"
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
  const [budgetsResume, setBudgetsResume] = useState({
    total: 0,
    approved: 0,
    awaiting: 0,
    rejected: 0,
  })
  const [finishedBudgets, setFinishedBudgets] = useState<TBudgetResume[]>([])

  const loadBudgetInfo = async (pickedBudget: TProviderBudgetResume) => {
    setBudget(pickedBudget)
  }

  // Cards

  const renderCardsContent = () => {
    console.log(budgets)
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
        setBudgetsResume(resume)
        setFinishedBudgets(
          budgetsReq.data.content.filter((b) => b.statusBudget === "FINALIZADO")
        )
      }

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
            <span>Olá {user?.name}, estes são os orçamentos em andamento:</span>
          </S.BlockTitle>
        </S.BlockHeader>

        <Divider />

        {renderCardsContent()}
      </S.BlockArea>

      <PageRow>
        <S.BlockArea>
          <S.ManagerBudgetsResumeArea>
            <S.MBRMessage>
              Sua empresa já recebeu, <span>{budgets.length}</span> orçamentos:
            </S.MBRMessage>
            <S.MBRDataArea>
              <DataResumeItem
                type={"approved"}
                number={budgetsResume.approved}
                total={budgetsResume.total}
                role={"budgets"}
              />
              <DataResumeItem
                type={"awaiting"}
                number={budgetsResume.awaiting}
                total={budgetsResume.total}
                role={"budgets"}
              />
              <DataResumeItem
                type={"rejected"}
                number={budgetsResume.rejected}
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

        <Table data={finishedBudgets} config={tableConfig.finishedBudgets} />
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
