/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "../styled"

import Card from "../../../components/Card"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import { getStore } from "../../../store"
import { TBudget, TBudgetResume } from "../../../utils/@types/data/budget"
import { useCallback, useEffect, useState } from "react"
import { DataResumeItem } from "../../../components/Card/variations/ApprovalResume"
import Table from "../../../components/Table"
import { tableConfig } from "../../../utils/system/table"
import SearchBlock from "../../../components/SearchBlock"
import { systemOptions } from "../../../utils/system/options"
import { TFilter } from "../../../utils/@types/components/SearchBlock"
import Input from "../../../components/Input"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import { TOption } from "../../../components/Input/points"
import { TUserTypes } from "../../../utils/@types/data/user"
import { Api } from "../../../api"

import BudgetDetails from "./details/budget"

const DashboardManager = () => {
  const { user, controllers } = getStore((store) => ({
    controllers: store.controllers,
    user: store.user as TUserTypes["SINDICO"],
  }))

  const [loading, setLoading] = useState(true)

  /*
   *  Search control
   */

  const [budget, setBudget] = useState<TBudget | null>()
  const [specificCondo, setSpecificCondo] = useState("")
  const [finishedBudgetsSearch, setFinishedBudgetsSearch] = useState("")
  const [filters, setFilters] = useState({
    status: "",
  })
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    status: systemOptions.budgetsStatus,
    condos: [],
  })

  const handleFilters = (filter: Partial<TFilter>) => {
    setFilters((filtersList) => ({
      ...filtersList,
      [filter.name as string]: filter.value,
    }))
  }

  const handleFinishedBudgetsSearch = async () => {}

  // Engine

  const [budgets, setBudgets] = useState<TBudgetResume[]>([])
  const [finishedBudgets, setFinishedBudgets] = useState<TBudgetResume[]>([])

  const handlePickBudget = async (id: number) => {
    setLoading(true)

    try {
      const req = await Api.budgets.getSingle({ id: id })

      if (req.ok) setBudget(req.data)
      else throw new Error()
    } catch {}

    setLoading(false)
  }

  // Cards

  const renderCardsContent = () => {
    const content: JSX.Element[] = budgets.map((budget) => (
      <Card.ManagerBudgetResume
        data={budget}
        k={2}
        resume={{
          approved: budget.accepted,
          awaiting: budget.awaiting,
          rejected: budget.rejected,
        }}
        handlePick={handlePickBudget}
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
      setOptions((opts) => ({
        ...opts,
        condos: parseOptionList(user?.condominiums, "id", "name"),
      }))

      // Budgets
      const budgetsReq = await Api.budgets.listAll({
        size: 300,
        managerId: user?.id,
        condominiumId: Number.isNaN(specificCondo) ? +specificCondo : undefined,
      })

      if (budgetsReq.ok) {
        setBudgets(
          budgetsReq.data.content.sort((a, b) =>
            a.endDate && b.endDate
              ? new Date(a.endDate).getTime() > new Date(b.endDate).getTime()
                ? 1
                : -1
              : a.endDate && !b.endDate
              ? 1
              : -1
          )
        )
        setFinishedBudgets(
          budgetsReq.data.content.filter((b) => b.status === "approved")
        )
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        state: "alert",
        message:
          "Não foi possível carregar as informações. Tente novamente mais tarde.",
        visible: true,
      })
    }

    setLoading(false)
  }, [specificCondo])

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
              Olá {`${user?.name} ${user?.surname}`}, estes são seus pedidos de
              orçamentos em andamento:
            </span>
          </S.BlockTitle>
          <Input.CondoSelect
            field="condo"
            options={options.condos}
            label="Todos os condomínios"
            value={specificCondo}
            onChange={setSpecificCondo}
          />
        </S.BlockHeader>

        <Divider />

        {renderCardsContent()}
      </S.BlockArea>

      <PageRow>
        <S.BlockArea>
          <S.ManagerBudgetsResumeArea>
            <S.MBRMessage>
              Para <span>todos os condomínios</span>, você já pediu{" "}
              <span>{budgets.length}</span> orçamentos:
            </S.MBRMessage>
            <S.MBRDataArea>
              <DataResumeItem
                type={"approved"}
                number={0}
                total={budgets.length}
                role={"budgets"}
              />
              <DataResumeItem
                type={"awaiting"}
                number={0}
                total={budgets.length}
                role={"budgets"}
              />
              <DataResumeItem
                type={"rejected"}
                number={0}
                total={budgets.length}
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
    <BudgetDetails budget={budget} handleBack={() => setBudget(null)} />
  )
}

export default DashboardManager
