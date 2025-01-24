import * as C from "./styled"
import * as S from "./contentStyles"

import BreadcrumbPageHeader from "../../components/PageHeader/types/breadcrumb"
import { TBudget } from "../../utils/@types/data/budget"
import { Icons } from "../../assets/icons/icons"
import { getDateStr } from "../../utils/tb/format/date"
import Divider from "../../components/_minimals/Divider"

import { getStore } from "../../store"
import { useCallback, useEffect, useState } from "react"
import { Api } from "../../api"
import { useNavigate, useParams } from "react-router-dom"
import { formatCNPJ } from "../../utils/tb/format/cnpj"
import Card from "../../components/Card"
import { TProviderOnBudget } from "../../utils/@types/data/_user/provider"
import { TUserTypes } from "../../utils/@types/data/user"
import { TBudgetStatus } from "../../utils/@types/data/status"
import ProviderDetails from "./provider"

const DashboardBudgetsBudget = () => {
  const { controllers } = getStore()

  const params = useParams()
  const navigate = useNavigate()

  const [budget, setBudgetData] = useState<TBudget | null>(null)
  const [provider, setProvider] = useState<TUserTypes["PRESTADOR"] | null>(null)

  const [loading, setLoading] = useState(false)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setBudgetData(null)

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

  const handleBack = () => {
    navigate(-1)
  }

  /*
   *  Interactions
   */

  const handlePickProvider = async (prov: TProviderOnBudget) => {
    if (prov.userId) {
      setLoading(true)

      try {
        const req = await Api.persons.getSingle({ id: prov.userId })

        if (req.ok) {
          let info = req.data as TUserTypes["PRESTADOR"]

          const stateReq = await Api.states.getSingle({
            id: +info.address.state,
          })

          if (stateReq.ok) {
            info.address.state = stateReq.data.name
            info.address.country = stateReq.data.country.name
          } else {
            info.address.state = ""
            info.address.country = ""
          }

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
      if (budget) {
        const req = await Api.budgets.contract({
          budgetId: budget.id,
          providerId,
        })

        if (req.ok) window.location.reload()
        else throw new Error()
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
      if (budget) {
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

  return !provider ? (
    <C.SubContent>
      <C.BlockArea className="falseSubContentWrapper">
        <BreadcrumbPageHeader from="panelBudget" handleAction={handleBack} />
      </C.BlockArea>

      <S.SubContent>
        <S.Column>
          <S.Block>
            <S.BlockHeader>
              <S.BlockTitle>
                Orçamento nº{params?.budgetId as string}
              </S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            <S.DetailsList>
              <S.DetailItem>
                <S.DetailName>Título:</S.DetailName>
                <S.DetailValue>
                  {budget?.title ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Condomínio:</S.DetailName>
                <S.DetailValue>
                  {budget?.condominiumName ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Urgente:</S.DetailName>
                <S.DetailValue>
                  {budget ? (budget.isUrgent ? "Sim" : "Não") : "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Categoria:</S.DetailName>
                <S.DetailValue>
                  {budget?.categoryName ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Subcategoria:</S.DetailName>
                <S.DetailValue>
                  {budget?.subcategoryName ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Descrição:</S.DetailName>
                <S.DetailValue>
                  {budget?.description ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Data de início:</S.DetailName>
                <S.DetailValue>
                  {budget?.startDate
                    ? getDateStr(budget?.startDate, "dmy")
                    : "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Data fim:</S.DetailName>
                <S.DetailValue>
                  {budget?.endDate
                    ? getDateStr(budget?.endDate, "dmy")
                    : "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Anexo:</S.DetailName>
                <S.DetailValue>
                  {budget
                    ? !!budget?.attachmentUrl
                      ? "Baixar anexo"
                      : "-"
                    : "Carregando..."}
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
          </S.Block>

          <S.Block>
            <S.BlockHeader>
              <S.BlockTitle>{budget?.condominiumName}</S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            <S.DetailsList>
              <S.DetailItem>
                <S.DetailName>Síndico:</S.DetailName>
                <S.DetailValue>
                  {budget?.condominiumManager ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Telefone:</S.DetailName>
                <S.DetailValue>
                  {budget?.phone ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Email:</S.DetailName>
                <S.DetailValue>
                  {budget?.email ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Unidades:</S.DetailName>
                <S.DetailValue>
                  {budget ? budget?.condominiumUnities ?? 0 : "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>CNPJ:</S.DetailName>
                <S.DetailValue>
                  {budget
                    ? formatCNPJ(budget?.condominiumCnpj ?? "")
                    : "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Endereço:</S.DetailName>
                <S.DetailValue>
                  {budget?.condominiumAddress ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Bairro:</S.DetailName>
                <S.DetailValue>
                  {budget?.neighborhood ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>CEP:</S.DetailName>
                <S.DetailValue>
                  {budget?.condominiumZipcode ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Cidade:</S.DetailName>
                <S.DetailValue>
                  {budget?.condominiumCity ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Estado:</S.DetailName>
                <S.DetailValue>
                  {budget?.condominiumState ?? "Carregando..."}
                </S.DetailValue>
              </S.DetailItem>
            </S.DetailsList>
          </S.Block>
        </S.Column>
        <S.Column>
          {budget && budget.providers.length > 0 ? (
            budget.providers.map((p, pk) => (
              <Card.ProviderResume
                key={pk}
                k={pk}
                data={p}
                onPick={handlePickProvider}
                budgetId={budget.id}
                handleResponseProvider={handleResponseProvider}
                budgetStatus={budget.status}
                forHigherView={true}
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
        budget?.providers.find((p) => p.userId === provider.userAccountId)
          ?.status as TBudgetStatus
      }
    />
  )
}

export default DashboardBudgetsBudget
