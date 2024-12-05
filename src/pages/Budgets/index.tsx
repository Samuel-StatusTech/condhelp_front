import * as S from "./styled"
import { getStore } from "../../store"

import { useCallback, useEffect, useState } from "react"
import { systemOptions } from "../../utils/system/options"
import { TFilter } from "../../utils/@types/components/SearchBlock"
import PageRow from "../../components/_minimals/PageRow"
import { TOption } from "../../components/Input/condosSelect"
import SearchBlock from "../../components/SearchBlock"
import { TBudget } from "../../utils/@types/data/budget"
import { fdata } from "../../utils/_dev/falseData"
import { tableConfig } from "../../utils/system/table"
import Card from "../../components/Card"
import Input from "../../components/Input"
import Divider from "../../components/_minimals/Divider"
import Table from "../../components/Table"
import { Api } from "../../api"

const Budgets = () => {
  const { user } = getStore()

  /*
   *  Search control
   */

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

  const [budgets, setBudgets] = useState<TBudget[]>(fdata.managerBudgets)
  const [finishedBudgets, setFinishedBudgets] = useState<TBudget[]>(
    fdata.managerBudgets
  )

  // Cards

  const renderCardsContent = () => {
    const content: JSX.Element[] = budgets.map((budget) => (
      <Card.ManagerBudgetResume
        data={budget}
        forBranch={true}
        k={2}
        resume={{
          approved: 32,
          awaiting: 8,
          rejected: 12,
        }}
      />
    ))

    return (
      <PageRow>
        <S.BudgetsArea>{content}</S.BudgetsArea>
      </PageRow>
    )
  }

  const loadData = useCallback(async () => {
    try {
      // Budgets
      const req = await Api.budgets.listAll({ size: 300 })

      if (req.ok) {
        setBudgets(fdata.managerBudgets)
        setFinishedBudgets(
          fdata.managerBudgets.filter((b) => b.status === "approved")
        )

        setOptions((opts) => ({
          ...opts,
          // condos: parseOptionList(user?.condominiums, "id", "name"),
        }))
      }
    } catch (error) {}
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

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
              field="condo"
              options={options.condos}
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
    </S.Content>
  )
}

export default Budgets
