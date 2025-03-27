import * as C from "../../styled"
import * as S from "./styled"

import BreadcrumbPageHeader from "../../../../components/PageHeader/types/breadcrumb"
import { TBudget } from "../../../../utils/@types/data/budget"
import Button from "../../../../components/Button"
import { Icons } from "../../../../assets/icons/icons"
import { getDateStr } from "../../../../utils/tb/format/date"
import Divider from "../../../../components/_minimals/Divider"
import { TUserTypes } from "../../../../utils/@types/data/user"
import Card from "../../../../components/Card"
import { getStore } from "../../../../store"
import { useEffect, useState } from "react"
import { Api } from "../../../../api"
import ProviderDetails from "./provider"
import { TProviderOnBudget } from "../../../../utils/@types/data/_user/provider"
import { TBudgetStatus } from "../../../../utils/@types/data/status"

type Props = {
  budget: TBudget
  handleBack: () => void
  handleCancel: (budgetId: number) => void
  handleRefresh: (budgetId: number) => void
}

const BudgetDetails = ({
  budget,
  handleBack,
  handleCancel,
  handleRefresh,
}: Props) => {
  const { controllers } = getStore()

  const [budgetData, setBudgetData] = useState<TBudget>(budget)

  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState<TUserTypes["PRESTADOR"] | null>(null)

  const handlePickProvider = async (prov: TProviderOnBudget) => {
    if (prov.userId) {
      setLoading(true)

      try {
        const req = await Api.persons.getSingle({ id: prov.userId })

        if (req.ok) {
          let info = req.data as TUserTypes["PRESTADOR"]

          info.address.state = +info.address.state as any
          info.address.country = +info.address.country as any

          setProvider(info as TUserTypes["PRESTADOR"])
        } else throw new Error()
      } catch (error) {
        controllers.feedback.setData({
          state: "alert",
          message: "Não foi possível carregar as informações do prestador.",
          visible: true,
        })
      }

      setLoading(false)
    }
  }

  const handleContract = async (providerId: number) => {
    setLoading(true)

    try {
      const req = await Api.budgets.contract({
        budgetId: budget.id,
        providerId,
      })

      if (req.ok) {
        setBudgetData({
          ...budget,
          providers: budget.providers.map((p) => ({
            ...p,
            status: p.id !== providerId ? "RECUSADO_SINDICO" : "CONTRATADO",
          })),
        })

        setLoading(false)
      } else throw new Error()
    } catch (error) {
      setLoading(false)

      controllers.feedback.setData({
        state: "error",
        message:
          "Não foi possível realizar o contrato. Tente novamente mais tarde.",
        visible: true,
      })
    }
  }

  const handleResponseProvider = async (
    providerId: number,
    status: TBudgetStatus
  ) => {
    try {
      if (status === "CONTRATADO") handleContract(providerId)
      else {
        setLoading(true)

        const req = await Api.budgets.interact({
          budgetId: budget.id,
          providerId: providerId,
          status: status,
        })

        if (req.ok) {
          setBudgetData({
            ...budget,
            providers: budget.providers.map((p) =>
              p.id !== providerId
                ? p
                : {
                    ...p,
                    status: status,
                  }
            ),
          })

          setLoading(false)

          controllers.feedback.setData({
            state: "success",
            message: "Resposta enviada ao prestador.",
            visible: true,
          })
        } else throw new Error()
      }
    } catch (error) {
      setLoading(false)

      controllers.feedback.setData({
        state: "alert",
        message:
          "Não foi possível responder o prestador no momento. Tente novamente mais tarde.",
        visible: true,
      })
    }
  }

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading, budget])

  return !provider ? (
    <C.SubContent>
      <C.BlockArea className="falseSubContentWrapper">
        <BreadcrumbPageHeader from="panelBudget" handleAction={handleBack} />
      </C.BlockArea>

      <S.SubContent>
        <S.Column>
          <S.Block>
            <S.BlockHeader>
              <S.BlockTitle>Orçamento nº{budget.id}</S.BlockTitle>
              <Button
                type="quaternary"
                text="Cancelar orçamento"
                action={() => handleCancel(Number(budget.id))}
                fit={true}
              />
            </S.BlockHeader>

            <Divider />

            <S.DetailsList>
              <S.DetailItem>
                <S.DetailName>Título:</S.DetailName>
                <S.DetailValue>{budgetData?.title}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Condomínio:</S.DetailName>
                <S.DetailValue>{budgetData?.condominiumName}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Urgente:</S.DetailName>
                <S.DetailValue>
                  {budgetData?.isUrgent ? "Sim" : "Não"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Categoria:</S.DetailName>
                <S.DetailValue>{budgetData?.categoryName}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Subcategoria:</S.DetailName>
                <S.DetailValue>{budgetData?.subcategoryName}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Descrição:</S.DetailName>
                <S.DetailValue>{budgetData?.description}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Data de início:</S.DetailName>
                <S.DetailValue>
                  {budgetData?.startDate
                    ? getDateStr(budgetData?.startDate, "dmy")
                    : "-"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Data fim:</S.DetailName>
                <S.DetailValue>
                  {budgetData?.endDate
                    ? getDateStr(budgetData?.endDate, "dmy")
                    : "-"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Anexo:</S.DetailName>
                {!!budgetData?.attachmentUrl ? (
                  <S.AttachmentLink
                    href={budgetData.attachmentUrl}
                    download={budgetData.attachmentUrl}
                  >
                    Baixar anexo
                  </S.AttachmentLink>
                ) : (
                  <S.DetailValue>-</S.DetailValue>
                )}
              </S.DetailItem>
            </S.DetailsList>

            <Divider />

            <S.ButtonsArea>
              <Button
                type="green"
                text="REABRIR"
                action={() => {}}
                disabled={budget.providers.every(
                  (p) => p.status !== "CONTRATADO"
                )}
              />
              <Button
                type="main"
                text="FINALIZAR"
                icon={<Icons.CheckCircle />}
                action={() => {}}
                disabled={budget.providers.some(
                  (p) => p.status === "CONTRATADO"
                )}
              />
            </S.ButtonsArea>

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
          </S.Block>
        </S.Column>
        <S.Column>
          {budgetData.providers.length > 0 ? (
            budgetData.providers.map((p, pk) => (
              <Card.ProviderResume
                key={pk}
                k={pk}
                data={p}
                onPick={handlePickProvider}
                budgetId={budget.id}
                handleResponseProvider={handleResponseProvider}
              />
            ))
          ) : (
            <S.EmptyMessage>
              <Icons.Clock />
              <span style={{ marginTop: 12, fontWeight: 500 }}>
                Aguardando participantes...
              </span>
            </S.EmptyMessage>
          )}
        </S.Column>
      </S.SubContent>
    </C.SubContent>
  ) : (
    <ProviderDetails data={provider} handleBack={() => setProvider(null)} />
  )
}

export default BudgetDetails
