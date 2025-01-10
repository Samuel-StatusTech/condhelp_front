import * as S from "./styled"
import { getStore } from "../../store"

import { useCallback, useEffect, useState } from "react"
import PageRow from "../../components/_minimals/PageRow"
import { TProviderBudgetResume } from "../../utils/@types/data/budget"
import Card from "../../components/Card"

import Divider from "../../components/_minimals/Divider"
import { Api } from "../../api"
import ProviderBudgetDetails from "../Dashboard/rolePages/details/providerBudgetDetails"

type Props = {
  status: TProviderBudgetResume["status"]
}

const ProviderBudgets = ({ status }: Props) => {
  const { user, controllers } = getStore()

  /*
   *  Search control
   */

  const [loading, setLoading] = useState(true)

  // Engine

  const [budget, setBudget] = useState<TProviderBudgetResume | null>(null)
  const [budgets, setBudgets] = useState<TProviderBudgetResume[]>([])

  // Cards

  const renderCardsContent = () => {
    const content: JSX.Element[] = budgets.map((budget) => (
      <Card.ProviderBudgetResume
        data={budget}
        forGrid={true}
        k={2}
        onPickBudget={() => setBudget(budget)}
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
      const req = await Api.budgets.getByStatus({
        size: 300,
        providerId: user?.userAccountId as number,
        status: status,
      })

      if (req.ok) {
        setBudgets(
          req.data.content.sort((a, b) =>
            !a.endDate || !b.endDate
              ? 1
              : new Date(a.endDate).getTime() < new Date(b.endDate).getTime()
              ? -1
              : 1
          )
        )
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }, [status, user?.userAccountId])

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
    <S.Content>
      <S.SubContent>
        {!loading && budgets.length === 0 ? (
          <S.EmptyMessage>
            <span>Nenhum orçamento encontrado</span>
          </S.EmptyMessage>
        ) : !loading && budgets.length > 0 ? (
          <S.BlockArea className="falseSubContentWrapper">
            <S.BlockHeader>
              <S.BlockTitle $k={2}>
                <span>Seus orçamentos:</span>
              </S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            {renderCardsContent()}
          </S.BlockArea>
        ) : null}
      </S.SubContent>
    </S.Content>
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

export default ProviderBudgets
