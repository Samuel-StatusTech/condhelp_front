/* eslint-disable react-hooks/exhaustive-deps */
import * as S from "../styled"
import { fdata } from "../../../utils/_dev/falseData"

import Card from "../../../components/Card"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import { getStore } from "../../../store"
import { TBudget } from "../../../utils/@types/data/budget"
import { useEffect, useState } from "react"
import { DataResumeItem } from "../../../components/Card/variations/ApprovalResume"
import Table from "../../../components/Table"
import { tableConfig } from "../../../utils/system/table"
import SearchBlock from "../../../components/SearchBlock"
import { systemOptions } from "../../../utils/system/options"
import { TFilter } from "../../../utils/@types/components/SearchBlock"
import Input from "../../../components/Input"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import { TOption } from "../../../components/Input/points"

const DashboardManager = () => {
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

  useEffect(() => {
    setBudgets(fdata.managerBudgets)
    setFinishedBudgets(
      fdata.managerBudgets.filter((b) => b.status === "approved")
    )
    setOptions((opts) => ({
      ...opts,
      condos: parseOptionList(fdata.condos, "id", "name"),
    }))
  }, [])

  return (
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
              <span>11</span> orçamentos:
            </S.MBRMessage>
            <S.MBRDataArea>
              <DataResumeItem
                type={"approved"}
                number={5}
                total={11}
                role={"budgets"}
              />
              <DataResumeItem
                type={"awaiting"}
                number={3}
                total={11}
                role={"budgets"}
              />
              <DataResumeItem
                type={"rejected"}
                number={3}
                total={11}
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
  )
}

export default DashboardManager
