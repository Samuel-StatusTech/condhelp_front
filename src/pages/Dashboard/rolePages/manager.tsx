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
import { TFinishedBudgets } from "../../../utils/@types/data/budget/finished"
import { getDateStr } from "../../../utils/tb/format/date"
import { matchSearch } from "../../../utils/tb/helpers/matchSearch"
import { useNavigate } from "react-router-dom"
import { TManagerStatistics } from "../../../utils/@types/data/dashboards/statistics"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Scrollbar, A11y } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

const DashboardManager = ({ canLoadData }: { canLoadData: boolean }) => {
  const { user, controllers } = getStore((store) => ({
    controllers: store.controllers,
    user: store.user as TUserTypes["SINDICO"],
  }))

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

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
  const [finishedBudgets, setFinishedBudgets] = useState<TFinishedBudgets[]>([])

  const [statistics, setStatistics] = useState<TManagerStatistics>({
    total: 0,
    completed: 0,
    inProgress: 0,
    canceled: 0,
    recused: 0,
    completedPercentage: 0,
    inProgressPercentage: 0,
    canceledPercentage: 0,
    recusedPercentage: 0,
  })

  const handlePickBudget = async (id: number) => {
    navigate(`/dashboard/budget/${id}`)
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
        {/* Desktop */}
        <S.BudgetsArea className="desktopBudgetsArea">{content}</S.BudgetsArea>

        {/* Mobile */}
        <div className="mobileBudgetsArea">
          <Swiper
            slidesPerView={1}
            spaceBetween={48}
            style={{
              maxWidth: "100%",
            }}
            modules={[Pagination, Scrollbar, A11y]}
            // navigation
            pagination={{ clickable: true }}
            allowTouchMove={true}
          >
            {budgets.map((b, bKey) => (
              <SwiperSlide key={bKey}>
                {/* <span>Slide {bKey}</span> */}
                <Card.ManagerBudgetResume
                  data={b}
                  k={2}
                  resume={{
                    approved: b.accepted,
                    awaiting: b.awaiting,
                    rejected: b.rejected,
                  }}
                  handlePick={handlePickBudget}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </PageRow>
    )
  }

  const handleCancelBudget = useCallback((budgetId: number) => {
    return new Promise(async (resolve) => {
      try {
        setLoading(true)

        const req = await Api.budgets.cancel({ budgetId: budgetId })

        if (req.ok) {
          setLoading(false)
          setBudget(null)

          resolve(true)
        } else throw new Error()
      } catch (error) {
        setLoading(true)
        resolve(false)
      }
    })
  }, [])

  const handleRefreshBudgetData = useCallback((budgetId: number) => {
    handlePickBudget(budgetId)
  }, [])

  const handleRedirect = useCallback((budgetId: number) => {
    navigate(`/dashboard/budget/${budgetId}`)
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      setOptions((opts) => ({
        ...opts,
        condos: [
          { key: "all", value: "Todos" },
          ...parseOptionList(
            user?.condominiums.filter((c) => c.status === "ACTIVE"),
            "id",
            "name"
          ),
        ],
      }))

      // Budgets
      const budgetsReq = await Api.budgets.listManagerBudgets({
        size: 300,
        managerId: user?.userId,
        condominiumId:
          specificCondo !== "all" &&
          !Number.isNaN(specificCondo) &&
          +specificCondo !== 0
            ? +specificCondo
            : undefined,
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

        /*
         * Statistics
         */

        const statisticsReq = await Api.dashboards.managerStatistics({
          managerId: user?.userId,
        })

        if (statisticsReq.ok) {
          setStatistics(statisticsReq.data)
        } else throw new Error()

        /*
         * Finished table content
         */

        const finishedsReq = await Api.budgets.finished.manager({
          size: 300,
          id: user?.userId,
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
    if (canLoadData) loadData()
  }, [loadData, canLoadData])

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
              <span>{statistics.total}</span> orçamentos:
            </S.MBRMessage>
            <S.MBRDataArea>
              <DataResumeItem
                type={"approved"}
                number={statistics.completed}
                total={statistics.total}
                role={"budgets"}
              />
              <DataResumeItem
                type={"awaiting"}
                number={statistics.inProgress}
                total={statistics.total}
                role={"budgets"}
              />
              <DataResumeItem
                type={"rejected"}
                number={statistics.canceled}
                total={statistics.total}
                role={"budgets"}
              />
              <DataResumeItem
                type={"recused"}
                number={statistics.recused}
                total={statistics.total}
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
          config={tableConfig.finishedBudgetsResume}
          actions={{
            redirect: handleRedirect,
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

            statusOk = !!finishedBudgetsSearch
              ? fields.some((val) => matchSearch(val, finishedBudgetsSearch))
              : filters.status && filters.status !== "all"
              ? i.status === filters.status
              : true

            ok = searchOk && statusOk

            return ok
          })}
        />
      </S.BlockArea>
    </S.SubContent>
  ) : (
    <BudgetDetails
      budget={budget}
      handleBack={() => setBudget(null)}
      handleCancel={handleCancelBudget}
      handleRefresh={handleRefreshBudgetData}
    />
  )
}

export default DashboardManager
