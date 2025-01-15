import * as S from "./styled"
import { getStore } from "../../store"

import { useCallback, useEffect, useState } from "react"
import { systemOptions } from "../../utils/system/options"
import { TFilter } from "../../utils/@types/components/SearchBlock"
import PageRow from "../../components/_minimals/PageRow"
import { TOption } from "../../components/Input/condosSelect"
import SearchBlock from "../../components/SearchBlock"
import { TBudget, TBudgetResume } from "../../utils/@types/data/budget"
import { tableConfig } from "../../utils/system/table"
import Card from "../../components/Card"
import Input from "../../components/Input"
import Divider from "../../components/_minimals/Divider"
import Table from "../../components/Table"
import { Api } from "../../api"
import { parseOptionList } from "../../utils/tb/parsers/parseOptionList"
import initials from "../../utils/initials"
import { TDefaultFilters } from "../../api/types/params"
import { useNavigate } from "react-router-dom"

const Budgets = () => {
  const { user, controllers } = getStore()

  const navigate = useNavigate()

  /*
   *  Search control
   */

  const [loading, setLoading] = useState(true)

  const [searchControl, setSearchControl] = useState(initials.pagination)

  const [searchFilters, setSearchFilters] = useState<TDefaultFilters>({
    page: initials.pagination.pageable.pageNumber,
    size: initials.pagination.size,
    sort: undefined,
  })

  const [specificCondo, setSpecificCondo] = useState("")
  const [finishedBudgetsSearch, setFinishedBudgetsSearch] = useState("")
  const [filters, setFilters] = useState({
    status: "",
  })
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    status: systemOptions.budgetsStatus,
    franchises: [],
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
  const [finishedBudgets, setFinishedBudgets] = useState<TBudget[]>([])

  const handlePickBudget = async (id: number) => {
    navigate(`/dashboard/budgets/budget/${id}`)
  }

  // Cards

  const renderCardsContent = () => {
    const content: JSX.Element[] = budgets.map((budget) => (
      <Card.ManagerBudgetResume
        data={budget}
        forBranch={true}
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

  const loadData = useCallback(async (params: TDefaultFilters) => {
    setLoading(true)

    try {
      // Budgets
      const req = await Api.budgets.listAll(params)

      if (req.ok) {
        setSearchControl(req.data)
        setBudgets(
          req.data.content.sort((a, b) =>
            !a.endDate || !b.endDate
              ? 1
              : new Date(a.endDate).getTime() < new Date(b.endDate).getTime()
              ? -1
              : 1
          )
        )
        setFinishedBudgets([])
        // req.data.content.filter((b) => b.status === "approved")

        // Franchises
        const franchisesReq = await Api.persons.getByRole({
          role: "FRANQUEADO",
        })

        if (franchisesReq.ok) {
          setOptions((opts) => ({
            ...opts,
            franchises: parseOptionList(
              franchisesReq.data.content,
              "id",
              "name"
            ),
          }))
        }
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData(searchFilters)
  }, [loadData, searchFilters])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  return (
    <S.Content>
      <S.SubContent>
        <S.BlockArea className="falseSubContentWrapper">
          <S.BlockHeader>
            <S.BlockTitle $k={2}>
              <span>
                Olá {`${user?.name}`}, estes são seus pedidos de orçamentos em
                andamento:
              </span>
            </S.BlockTitle>
            <Input.CondoSelect
              field="franchises"
              options={options.franchises}
              label="Todos as franquias"
              value={specificCondo}
              onChange={setSpecificCondo}
            />
          </S.BlockHeader>

          <Divider />

          {renderCardsContent()}
        </S.BlockArea>

        <S.BlockArea className="falseSubContentWrapper">
          <S.BlockTitle $k={2}>
            <span>Histórico de orçamentos finalizados:</span>
          </S.BlockTitle>

          <SearchBlock
            search={finishedBudgetsSearch}
            onSearchChange={setFinishedBudgetsSearch}
            onSearch={handleFinishedBudgetsSearch}
            searchPlaceholder="Pesquisar por data, título, condomínio..."
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
            searchData={searchControl}
            setSearchFilters={setSearchFilters}
            data={finishedBudgets}
          />
        </S.BlockArea>
      </S.SubContent>
    </S.Content>
  )
}

export default Budgets
