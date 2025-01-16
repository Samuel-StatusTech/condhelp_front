import * as C from "./styled"
import * as S from "./contentStyles"

import BreadcrumbPageHeader from "../../components/PageHeader/types/breadcrumb"
import { TBudget } from "../../utils/@types/data/budget"
import Button from "../../components/Button"
import { Icons } from "../../assets/icons/icons"
import { getDateStr } from "../../utils/tb/format/date"
import Divider from "../../components/_minimals/Divider"
import { TUserTypes } from "../../utils/@types/data/user"
import Card from "../../components/Card"
import { getStore } from "../../store"
import { useCallback, useEffect, useState } from "react"
import { Api } from "../../api"
import ProviderDetails from "./provider"
import { TProviderOnBudget } from "../../utils/@types/data/_user/provider"
import { TBudgetStatus } from "../../utils/@types/data/status"
import { useNavigate, useParams } from "react-router-dom"

const DashboardManagerBudget = () => {
  const { controllers } = getStore()

  const params = useParams()
  const navigate = useNavigate()

  const [budgetData, setBudgetData] = useState<TBudget | null>(null)

  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState<TUserTypes["PRESTADOR"] | null>(null)

  const handleBack = () => {
    navigate(-1)
  }

  const handleCancel = useCallback((budgetId: number) => {
    return new Promise(async (resolve) => {
      try {
        setLoading(true)

        const req = await Api.budgets.cancel({ budgetId: budgetId })

        if (req.ok) {
          setLoading(false)
          setBudgetData(null)

          resolve(true)
        } else throw new Error()
      } catch (error) {
        setLoading(true)
        resolve(false)
      }
    })
  }, [])

  const handleEdit = useCallback(
    (budgetId: number) => {
      controllers.modal.open({
        role: "editBudget",
        visible: true,
        data: {
          id: budgetId,
        },
      })
    },
    [controllers.modal]
  )

  const handleReopen = useCallback(() => {
    if (budgetData) {
      controllers.modal.open({
        role: "reopenBudget",
        visible: true,
        data: {
          id: budgetData.id,
        },
      })
    }
  }, [controllers.modal, budgetData])

  const handleFinish = async () => {
    if (budgetData) {
      setLoading(true)

      try {
        const obj: any = {
          id: budgetData.id,
          title: budgetData.title,
          description: budgetData.description,
          startDate: getDateStr(budgetData.startDate, "javaDateTime"),
          finishDate: getDateStr(budgetData.endDate, "javaDateTime"),
          attachmentUrl: budgetData.attachmentUrl,
          urgent: budgetData.isUrgent,
          condominiumId: budgetData.condominiumId,
          serviceCategoryId: budgetData.categoryId,
          serviceSubcategoryId: budgetData.subcategoryId,
          userId: budgetData.userId as number,
          status: "FINALIZADO" as TBudgetStatus,
          providerIds: budgetData.providers.map((p) => p.id) as number[],
          // @ts-ignore
          franqId: budgetData.franqId,
        }

        const req = await Api.budgets.update({ budget: obj })

        if (req.ok) {
          controllers.feedback.setData({
            state: "success",
            message: "Orçamento finalizado com sucesso",
            visible: true,
          })

          navigate("/dashboard")
        } else throw new Error()
      } catch (error) {
        controllers.feedback.setData({
          state: "alert",
          message: "Não foi possível finalizar o orçamento.",
          visible: true,
        })
      }

      setLoading(false)
    }
  }

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
      if (budgetData) {
        const req = await Api.budgets.contract({
          budgetId: budgetData.id,
          providerId,
        })

        if (req.ok) {
          setBudgetData({
            ...budgetData,
            providers: budgetData.providers.map((p) => ({
              ...p,
              status:
                p.userId !== providerId ? "RECUSADO_SINDICO" : "CONTRATADO",
            })),
          })

          setLoading(false)
        } else throw new Error()
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
      if (budgetData) {
        if (status === "CONTRATADO") handleContract(providerId)
        else {
          setLoading(true)

          const req = await Api.budgets.interact({
            budgetId: budgetData.id,
            providerId: providerId,
            status: status,
          })

          if (req.ok) {
            setBudgetData({
              ...budgetData,
              providers: budgetData.providers.map((p) =>
                p.userId !== providerId
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
      } else throw new Error()
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

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setBudgetData(null)
      setProvider(null)

      if (params.budgetId && !Number.isNaN(+params.budgetId)) {
        await Api.budgets
          .getSingle({
            id: +params.budgetId,
          })
          .then((res) => {
            if (res.ok) setBudgetData(res.data)
            else throw new Error()
          })
      } else throw new Error()
    } catch (error) {
      navigate(-1)
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações do orçamento.",
        state: "alert",
        visible: true,
      })
    }

    setLoading(false)
  }, [controllers.feedback, navigate, params.budgetId])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  return !provider ? (
    <C.SubContent>
      <C.BlockArea className="falseSubContentWrapper">
        <BreadcrumbPageHeader from="panelBudget" handleAction={handleBack} />
      </C.BlockArea>

      <S.SubContent>
        <S.Column>
          <S.Block>
            <S.BlockHeader>
              <S.BlockTitle>Orçamento nº{budgetData?.id}</S.BlockTitle>
              {!(
                [
                  "FINALIZADO",
                  "CANCELADO_SINDICO",
                  "EXPIRADO",
                ] as TBudgetStatus[]
              ).includes(budgetData?.status as TBudgetStatus) && (
                <S.ButtonsHeader>
                  <Button
                    type="quaternary"
                    text="Cancelar orçamento"
                    action={() => handleCancel(Number(budgetData?.id))}
                    fit={true}
                  />

                  <Button
                    type="tertiary"
                    icon={<Icons.Edit />}
                    action={() => handleEdit(Number(budgetData?.id))}
                    fit={true}
                  />
                </S.ButtonsHeader>
              )}
            </S.BlockHeader>

            <Divider />

            <S.DetailsList>
              <S.DetailItem>
                <S.DetailName>Título:</S.DetailName>
                <S.DetailValue>
                  {budgetData?.title ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Condomínio:</S.DetailName>
                <S.DetailValue>
                  {budgetData?.condominiumName ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Urgente:</S.DetailName>
                <S.DetailValue>
                  {budgetData
                    ? budgetData.isUrgent
                      ? "Sim"
                      : "Não"
                    : "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Categoria:</S.DetailName>
                <S.DetailValue>
                  {budgetData?.categoryName ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Subcategoria:</S.DetailName>
                <S.DetailValue>
                  {budgetData?.subcategoryName ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Descrição:</S.DetailName>
                <S.DetailValue>
                  {budgetData?.description ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Data de início:</S.DetailName>
                <S.DetailValue>
                  {budgetData?.startDate
                    ? getDateStr(budgetData?.startDate, "dmy")
                    : "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Data fim:</S.DetailName>
                <S.DetailValue>
                  {budgetData?.endDate
                    ? getDateStr(budgetData?.endDate, "dmy")
                    : "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Anexo:</S.DetailName>
                <S.DetailValue>
                  {budgetData
                    ? !!budgetData?.attachmentUrl
                      ? "Baixar anexo"
                      : "-"
                    : "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
            </S.DetailsList>

            <Divider />

            <S.ButtonsArea>
              <Button
                type="green"
                text="REABRIR"
                action={handleReopen}
                disabled={
                  !(
                    [
                      "FINALIZADO",
                      "CANCELADO_SINDICO",
                      "EXPIRADO",
                    ] as TBudgetStatus[]
                  ).includes(budgetData?.status as TBudgetStatus)
                }
              />
              <Button
                type="main"
                text="FINALIZAR"
                icon={<Icons.CheckCircle />}
                action={handleFinish}
                disabled={
                  (
                    [
                      "FINALIZADO",
                      "CANCELADO_SINDICO",
                      "EXPIRADO",
                    ] as TBudgetStatus[]
                  ).includes(budgetData?.status as TBudgetStatus) ||
                  budgetData?.providers.some((p) => p.status === "CONTRATADO")
                }
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
          {budgetData && budgetData.providers.length > 0 ? (
            budgetData.providers.map((p, pk) => (
              <Card.ProviderResume
                key={pk}
                k={pk}
                data={p}
                onPick={handlePickProvider}
                budgetId={budgetData.id}
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
    <ProviderDetails
      data={provider}
      handleBack={() => setProvider(null)}
      interactionStatus={
        budgetData?.providers.find((p) => p.userId === provider.userAccountId)
          ?.status as TBudgetStatus
      }
    />
  )
}

export default DashboardManagerBudget
