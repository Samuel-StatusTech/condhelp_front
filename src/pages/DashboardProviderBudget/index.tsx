import * as C from "./styled"
import * as S from "./contentStyles"

import BreadcrumbPageHeader from "../../components/PageHeader/types/breadcrumb"
import { TBudget } from "../../utils/@types/data/budget"
import Button from "../../components/Button"
import { Icons } from "../../assets/icons/icons"
import { getDateStr } from "../../utils/tb/format/date"
import Divider from "../../components/_minimals/Divider"

import { getStore } from "../../store"
import { useCallback, useEffect, useState } from "react"
import { Api } from "../../api"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const DashboardProviderBudget = () => {
  const { user, controllers } = getStore()

  const location = useLocation()

  const extraInfo = location.state

  const params = useParams()
  const navigate = useNavigate()

  const [budget, setBudgetData] = useState<TBudget | null>(null)

  const [loading, setLoading] = useState(false)

  const handleReject = async () => {
    setLoading(true)

    try {
      const req = await Api.budgets.interact({
        budgetId: +(params.id as string),
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

  return (
    <C.SubContent>
      <C.BlockArea className="falseSubContentWrapper">
        <BreadcrumbPageHeader from="panelBudget" handleAction={handleBack} />
      </C.BlockArea>

      <S.SubContent>
        <S.Column>
          <S.Block>
            <S.BlockHeader>
              <S.BlockTitle>
                Orçamento nº{params?.id as string} - prestador
              </S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            <S.DetailsList>
              <S.DetailItem>
                <S.DetailName>Título:</S.DetailName>
                <S.DetailValue>{budget?.titulo}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Condomínio:</S.DetailName>
                <S.DetailValue>{budget?.nomeCondominio}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Urgente:</S.DetailName>
                <S.DetailValue>
                  {budget?.isUrgent ? "Sim" : "Não"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Categoria:</S.DetailName>
                <S.DetailValue>{budget?.nomeCategoria}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Subcategoria:</S.DetailName>
                <S.DetailValue>{budget?.nomeSubcategoria}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Descrição:</S.DetailName>
                <S.DetailValue>{budget?.descricao}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Data de início:</S.DetailName>
                <S.DetailValue>
                  {budget?.dataInicio
                    ? getDateStr(budget?.dataInicio, "dmy")
                    : "-"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Data fim:</S.DetailName>
                <S.DetailValue>
                  {budget?.dataFim ? getDateStr(budget?.dataFim, "dmy") : "-"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Anexo:</S.DetailName>
                <S.DetailValue>
                  {!!budget?.urlAnexo ? "Baixar anexo" : "-"}
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
              <S.BlockTitle>{budget?.nomeCondominio}</S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            <S.DetailsList>
              <S.DetailItem>
                <S.DetailName>Síndico:</S.DetailName>
                <S.DetailValue>{extraInfo?.condominiumManager}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Unidades:</S.DetailName>
                <S.DetailValue>{extraInfo?.condominiumUnities}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>CNPJ:</S.DetailName>
                <S.DetailValue>{extraInfo?.condominiumCnpj}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Endereço:</S.DetailName>
                <S.DetailValue>{extraInfo?.condominiumAddress}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Bairro:</S.DetailName>
                <S.DetailValue>{"-"}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>CEP:</S.DetailName>
                <S.DetailValue>{extraInfo?.condominiumZipcode}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Cidade:</S.DetailName>
                <S.DetailValue>{extraInfo?.condominiumCity}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Estado:</S.DetailName>
                <S.DetailValue>{extraInfo?.condominiumState}</S.DetailValue>
              </S.DetailItem>
            </S.DetailsList>
          </S.Block>
        </S.Column>
      </S.SubContent>
    </C.SubContent>
  )
}

export default DashboardProviderBudget
