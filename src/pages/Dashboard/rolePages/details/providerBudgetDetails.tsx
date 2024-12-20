import * as C from "../../styled"
import * as S from "./styled"

import BreadcrumbPageHeader from "../../../../components/PageHeader/types/breadcrumb"
import { TProviderBudgetResume } from "../../../../utils/@types/data/budget"
import Button from "../../../../components/Button"
import { Icons } from "../../../../assets/icons/icons"
import { getDateStr } from "../../../../utils/tb/format/date"
import Divider from "../../../../components/_minimals/Divider"

import { getStore } from "../../../../store"
import { useEffect, useState } from "react"
import { Api } from "../../../../api"

type Props = {
  budget: TProviderBudgetResume
  handleBack: () => void
}

const ProviderBudgetDetails = ({ budget, handleBack }: Props) => {
  const { user, controllers } = getStore()

  const [loading, setLoading] = useState(false)

  const handleReject = async () => {
    setLoading(true)

    try {
      const req = await Api.budgets.interact({
        budgetId: +budget.id,
        providerId: user?.id as number,
        status: "CANCELADO_PRESTADOR",
      })

      if (req.ok) handleBack()
      else throw new Error()
    } catch {
      controllers.feedback.setData({
        state: "error",
        message:
          "Não foi possível recusar sua participação. Tente novamente mais tarde.",
        visible: true,
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  return (
    <C.SubContent>
      <C.BlockArea className="falseSubContentWrapper">
        <BreadcrumbPageHeader from="panelBudget" handleAction={handleBack} />
      </C.BlockArea>

      <S.SubContent>
        <S.Column>
          <S.Block>
            <S.BlockHeader>
              <S.BlockTitle>Orçamento nº{budget.id} - prestador</S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            <S.DetailsList>
              <S.DetailItem>
                <S.DetailName>Título:</S.DetailName>
                <S.DetailValue>{budget.title}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Condomínio:</S.DetailName>
                <S.DetailValue>{budget.condominiumName}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Urgente:</S.DetailName>
                <S.DetailValue>{budget.isUrgent ? "Sim" : "Não"}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Categoria:</S.DetailName>
                <S.DetailValue>{budget.categoryName}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Subcategoria:</S.DetailName>
                <S.DetailValue>{budget.subcategoryName}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Descrição:</S.DetailName>
                <S.DetailValue>{budget.description}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Data de início:</S.DetailName>
                <S.DetailValue>
                  {budget.startDate ? getDateStr(budget.startDate, "dmy") : "-"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Data fim:</S.DetailName>
                <S.DetailValue>
                  {budget.endDate ? getDateStr(budget.endDate, "dmy") : "-"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Anexo:</S.DetailName>
                <S.DetailValue>
                  {!!budget.attachmentUrl ? "Baixar anexo" : "-"}
                </S.DetailValue>
              </S.DetailItem>
            </S.DetailsList>

            <Divider />

            <S.PrintArea>
              <S.PrintMessage>
                <Icons.Globe />
                <span>
                  Imprima com consciência: Todos os detalhes, valores e
                  mensagens enviadas dos prestadores serão informados em um
                  único documento.{" "}
                </span>
              </S.PrintMessage>

              <S.RoundButton>
                <Icons.Printer />
              </S.RoundButton>
              <S.RoundButton>
                <Icons.Share />
              </S.RoundButton>
            </S.PrintArea>

            <Divider />

            <S.ButtonsArea>
              <Button
                type="quaternary"
                text={"Cancelar Participação"}
                action={handleReject}
                fit={true}
                red={true}
              />
            </S.ButtonsArea>
          </S.Block>
        </S.Column>
        <S.Column>
          <S.Block>
            <S.BlockHeader>
              <S.BlockTitle>{budget.condominiumName}</S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            <S.DetailsList>
              <S.DetailItem>
                <S.DetailName>Síndico:</S.DetailName>
                <S.DetailValue>{"-"}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Unidades:</S.DetailName>
                <S.DetailValue>{"-"}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>CNPJ:</S.DetailName>
                <S.DetailValue>{"-"}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Endereço:</S.DetailName>
                <S.DetailValue>{"-"}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Bairro:</S.DetailName>
                <S.DetailValue>{"-"}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>CEP:</S.DetailName>
                <S.DetailValue>{"-"}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Cidade:</S.DetailName>
                <S.DetailValue>{"-"}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Estado:</S.DetailName>
                <S.DetailValue>{"-"}</S.DetailValue>
              </S.DetailItem>
            </S.DetailsList>
          </S.Block>
        </S.Column>
      </S.SubContent>
    </C.SubContent>
  )
}

export default ProviderBudgetDetails
