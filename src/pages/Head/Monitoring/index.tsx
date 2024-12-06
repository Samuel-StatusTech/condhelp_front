import { useCallback, useEffect, useState } from "react"
import * as S from "./styled"

import { TOption } from "../../../utils/@types/data/option"
import { TUserTypes } from "../../../utils/@types/data/user"
import { TBudgetResume } from "../../../utils/@types/data/budget"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"

import Card from "../../../components/Card"

import BudgetResumeBlock from "./_budgetResume"
import NewContactBlock from "./_newContact"
import { List } from "../../../components/List"
import { getStore } from "../../../store"
import { Api } from "../../../api"
import { useNavigate } from "react-router-dom"

const MonitoringPage = () => {
  const { controllers } = getStore()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const [openeds, setOpeneds] = useState<TBudgetResume[]>([])
  const [running, setRunning] = useState<TBudgetResume[]>([])

  const [contacting, setContacting] = useState(false)

  const [budget, setBudget] = useState<any>(null)
  const [provider, setProvider] = useState<TUserTypes["PRESTADOR"] | null>(null)
  const [actualProviders, setActualProviders] = useState<
    TUserTypes["PRESTADOR"][]
  >([])

  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    category: parseOptionList([], "id", "name"),
    PRESTADOR: [],
  })
  const [newContact, setNewContact] = useState({
    category: "",
    provider: "",
    description: "",
  })

  const handlePick = async (selectedBudget: TBudgetResume) => {
    setLoading(true)

    try {
      const budgetReq = await Api.budgets.getSingle({ id: selectedBudget.id })
      if (budgetReq.ok) {
        setBudget({
          ...budgetReq.data,
          id: selectedBudget.id
        })
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
    setContacting(true)
    setTimeout(() => {
      setContacting(false)
    }, 1000)
  }

  useEffect(() => {
    const pv = actualProviders.find((p) => p.id === Number(newContact.provider))

    if (pv) {
      setProvider(pv)
    } else {
      setProvider(null)
    }
  }, [actualProviders, newContact.provider])

  useEffect(() => {
    setNewContact((nct) => ({ ...nct, provider: "" }))

    const providersList: any[] = [] //  category's providers

    setActualProviders(providersList)

    setOptions((opts) => ({
      ...opts,
      provider: parseOptionList(providersList, "id", "name"),
    }))
  }, [newContact.category])

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.budgets.listAll({ size: 1000 })

      if (req.ok) {
        let openedsList: TBudgetResume[] = []
        let runningList: TBudgetResume[] = []

        req.data.content.forEach((b) => {
          const interactions = b.accepted + b.awaiting + b.rejected

          if (interactions > 0) runningList.push(b)
          else openedsList.push(b)
        })

        setOpeneds(openedsList)
        setRunning(runningList)
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
    setNewContact((nct) => ({ ...nct, provider: "" }))

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
            <Card.Budget k={k} key={k} data={i} onPick={handlePick} />
          ))}
        </S.Block>
      </S.Column>
      <S.Column $small={true}>
        <S.Block>
          <S.BlockTitle>Em atendimento</S.BlockTitle>
          {running.map((i, k) => (
            <Card.Budget k={k} key={k} data={i} onPick={handlePick} />
          ))}
        </S.Block>
      </S.Column>

      {budget ? (
        <S.Column>
          <BudgetResumeBlock budget={budget} />

          <NewContactBlock
            provider={provider}
            newContact={newContact}
            options={options}
            handleField={handleField}
            handleContact={handleContact}
            contacting={contacting}
          />

          <S.Block>
            <S.BlockTitle>Contatos realizados</S.BlockTitle>
            <List.BudgetContact list={[]} />
          </S.Block>
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
