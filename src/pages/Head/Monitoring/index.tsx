import { useEffect, useState } from "react"
import * as S from "./styled"

import { TOption } from "../../../utils/@types/data/option"
import { TUserTypes } from "../../../utils/@types/data/user"
import { TBudget } from "../../../utils/@types/data/budget"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import { fdata } from "../../../utils/_dev/falseData"

import Card from "../../../components/Card"

import BudgetResumeBlock from "./_budgetResume"
import NewContactBlock from "./_newContact"
import { List } from "../../../components/List"

const MonitoringPage = () => {
  const [openeds] = useState<TBudget[]>(fdata.managerBudgets)

  const [contacting, setContacting] = useState(false)

  const [budget, setBudget] = useState<TBudget | null>(null)
  const [provider, setProvider] = useState<TUserTypes["provider"] | null>(null)
  const [actualProviders, setActualProviders] = useState<
    TUserTypes["provider"][]
  >([])

  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    category: parseOptionList(fdata.categories, "id", "name"),
    provider: [],
  })
  const [newContact, setNewContact] = useState({
    category: "",
    provider: "",
    description: "",
  })

  const handlePick = (selectedBudget: TBudget) => {
    setBudget(selectedBudget)
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
    const pv = actualProviders.find((p) => p.id === newContact.provider)

    if (pv) {
      setProvider(pv)
    } else {
      setProvider(null)
    }
  }, [actualProviders, newContact.provider])

  useEffect(() => {
    setNewContact((nct) => ({ ...nct, provider: "" }))

    const providersList = fdata.people.filter(
      (p) => p.profile === "provider" && p.category === newContact.category
    ) as TUserTypes["provider"][]

    setActualProviders(providersList)

    setOptions((opts) => ({
      ...opts,
      provider: parseOptionList(providersList, "id", "name"),
    }))
  }, [newContact.category])

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
          {openeds.map((i, k) => (
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
            <List.BudgetContact list={budget.contacts ?? []} />
          </S.Block>
        </S.Column>
      ) : (
        <span>Selecione um orçamento</span>
      )}
    </S.Page>
  )
}

export default MonitoringPage
