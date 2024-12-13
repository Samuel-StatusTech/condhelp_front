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
  const [budgets, setBudgets] = useState<TProviderBudgetResume[]>([
    {
      id: 4,
      title: "Troca de lampadas",
      condominiumName: "Condomínio X",
      isUrgent: true,
      categoryName: "Contábil",
      subcategoryName: "Contabilidade",
      description: "Preciso de troca de lampadas",
      startDate: "2024-12-14T00:00:00",
      endDate: "2024-12-16T00:00:00",
      attachmentUrl: "",
      status: "AGUARDANDO_SINDICO",
      awaiting: 0,
      rejected: 0,
      accepted: 0,
    },
    {
      id: 4,
      title: "Troca de lampadas",
      condominiumName: "Condomínio X",
      isUrgent: false,
      categoryName: "Contábil",
      subcategoryName: "Contabilidade",
      description: "Preciso de troca de lampadas",
      startDate: "2024-12-14T00:00:00",
      endDate: "2024-12-16T00:00:00",
      attachmentUrl: "",
      status: "AGUARDANDO_SINDICO",
      awaiting: 0,
      rejected: 0,
      accepted: 0,
    },
    {
      id: 4,
      title: "Troca de lampadas",
      condominiumName: "Condomínio X",
      isUrgent: true,
      categoryName: "Contábil",
      subcategoryName: "Contabilidade",
      description: "Preciso de troca de lampadas",
      startDate: "2024-12-14T00:00:00",
      endDate: "2024-12-19T00:00:00",
      attachmentUrl: "",
      status: "AGUARDANDO_SINDICO",
      awaiting: 0,
      rejected: 0,
      accepted: 0,
    },
    {
      id: 4,
      title: "Troca de lampadas",
      condominiumName: "Condomínio X",
      isUrgent: true,
      categoryName: "Contábil",
      subcategoryName: "Contabilidade",
      description: "Preciso de troca de lampadas",
      startDate: "2024-12-14T00:00:00",
      endDate: "2024-12-16T00:00:00",
      attachmentUrl: "",
      status: "AGUARDANDO_SINDICO",
      awaiting: 0,
      rejected: 0,
      accepted: 0,
    },
    {
      id: 4,
      title: "Troca de lampadas",
      condominiumName: "Condomínio X",
      isUrgent: true,
      categoryName: "Contábil",
      subcategoryName: "Contabilidade",
      description: "Preciso de troca de lampadas",
      startDate: "2024-12-14T00:00:00",
      endDate: "2024-12-16T00:00:00",
      attachmentUrl: "",
      status: "AGUARDANDO_SINDICO",
      awaiting: 0,
      rejected: 0,
      accepted: 0,
    },
  ])

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
        providerId: user?.id as number,
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
  }, [status, user?.id])

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
        <S.BlockArea className="falseSubContentWrapper">
          <S.BlockHeader>
            <S.BlockTitle $k={2}>
              <span>Orçamentos em andamento:</span>
            </S.BlockTitle>
          </S.BlockHeader>

          <Divider />

          {renderCardsContent()}
        </S.BlockArea>
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
