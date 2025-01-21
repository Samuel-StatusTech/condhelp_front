import { useCallback, useEffect, useState } from "react"
import * as S from "./styled"

import { TOption } from "../../../utils/@types/data/option"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"

import Card from "../../../components/Card"

import BudgetResumeBlock from "./_budgetResume"
import NewContactBlock from "./_newContact"
import { List } from "../../../components/List"
import { getStore } from "../../../store"
import { Api } from "../../../api"
import { useNavigate } from "react-router-dom"
import {
  TMonitorItem,
  TMonitorItemDetails,
} from "../../../utils/@types/data/monitoring"

const MonitoringPage = () => {
  const { controllers } = getStore()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const [openeds, setOpeneds] = useState<TMonitorItem[]>([])
  const [running, setRunning] = useState<TMonitorItem[]>([])

  const [contacting] = useState(false)

  const [budget, setBudget] = useState<TMonitorItemDetails | null>(null)
  const [provider, setProvider] = useState<
    TMonitorItemDetails["providers"][number] | null
  >(null)
  const [, setActualProviders] = useState<TMonitorItemDetails["providers"][]>(
    []
  )

  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    category: parseOptionList([], "id", "name"),
    PRESTADOR: [],
  })
  const [newContact, setNewContact] = useState<{
    category: string
    provider: any
    description: string
  }>({
    category: "",
    provider: null,
    description: "",
  })

  const updateList = async () => {
    await loadData()
  }

  const handlePick = async (
    selectedBudget: TMonitorItem | { budgetId: number }
  ) => {
    setLoading(true)

    try {
      const budgetReq = await Api.monitoring.getSingle({
        id: selectedBudget.budgetId,
      })
      if (budgetReq.ok) {
        setBudget(budgetReq.data)
      } else {
        controllers.feedback.setData({
          visible: true,
          state: "alert",
          message: budgetReq.error,
        })
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const handleField = (field: string, value: string) => {
    setNewContact((bdg) => ({
      ...bdg,
      [field]: value,
    }))
  }

  const handleContact = async () => {
    if (budget && provider && newContact) {
      setLoading(true)

      const req = await Api.monitoring.registerRequest({
        budgetId: budget.budgetId,
        description: newContact.description,
        providerId: provider.id ?? 104,
        providerName: provider.name,
      })

      if (req.ok) {
        controllers.feedback.setData({
          state: "success",
          visible: true,
          message: "Contato registrado com sucesso.",
        })

        setProvider(null)
        setNewContact({
          category: "",
          provider: "none",
          description: "",
        })
        await updateList()
        handlePick({ budgetId: budget.budgetId })
      }
    }
    setLoading(false)
  }

  // Provider info on contact
  useEffect(() => {
    const pv = budget?.providers.find((p) => p.id === newContact.provider)

    if (pv) {
      setProvider(pv)
    } else {
      setProvider(null)
    }
  }, [budget?.providers, newContact.provider])

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.monitoring.getList({ size: 1000 })

      if (req.ok) {
        setRunning(req.data.inService)
        setOpeneds(req.data.openRequests)
      } else {
        controllers.feedback.setData({
          visible: true,
          state: "error",
          message: req.error,
        })

        setLoading(false)

        navigate(-1)
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [controllers.feedback, navigate])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    setNewContact((nct) => ({ ...nct, provider: "none" }))

    const providersList: any[] = [] //  category's providers

    setActualProviders(providersList)

    setOptions((opts) => ({
      ...opts,
      provider: parseOptionList(providersList, "id", "name"),
    }))
  }, [newContact.category])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  return (
    <S.Page className="falseSubContentWrapper">
      <S.Column $small={true}>
        <S.Block>
          <S.BlockTitle>Em aberto</S.BlockTitle>
          {openeds.map((i, k) => (
            <Card.Budget
              k={k}
              key={k}
              data={i}
              onPick={handlePick}
              selected={budget?.budgetId === i.budgetId}
            />
          ))}
        </S.Block>
      </S.Column>
      <S.Column $small={true}>
        <S.Block>
          <S.BlockTitle>Em atendimento</S.BlockTitle>
          {running.map((i, k) => (
            <Card.Budget
              k={k}
              key={k}
              data={i}
              onPick={handlePick}
              selected={budget?.budgetId === i.budgetId}
            />
          ))}
        </S.Block>
      </S.Column>

      {budget ? (
        <S.Column>
          <BudgetResumeBlock budget={budget} />

          {running.some((b) => b.budgetId === budget.budgetId) && (
            <>
              <NewContactBlock
                data={budget}
                provider={provider}
                newContact={newContact}
                options={options}
                handleField={handleField}
                handleContact={handleContact}
                contacting={contacting}
              />

              <S.Block>
                <S.BlockTitle>Contatos realizados</S.BlockTitle>
                <List.BudgetContact
                  list={budget.performedContacts}
                  subCategoryName={budget.subCategoryName}
                  budgetId={budget.budgetId}
                  providerId={budget.providerId}
                  onUpdateContact={() =>
                    handlePick({ budgetId: budget.budgetId })
                  }
                />
              </S.Block>
            </>
          )}
        </S.Column>
      ) : (
        <S.EmptyMessage>
          <span>Selecione um orçamento</span>
        </S.EmptyMessage>
      )}
    </S.Page>
  )
}

export default MonitoringPage
