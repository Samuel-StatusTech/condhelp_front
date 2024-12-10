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

type Props = {
  budget: TBudget
  handleBack: () => void
}

const BudgetDetails = ({ budget, handleBack }: Props) => {
  const { controllers } = getStore()

  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState<TUserTypes["PRESTADOR"] | null>(null)

  budget.prestadores = [
    {
      name: "Nome do prestador",
      phone1: "47988889988",
      email: "julio.ferramentas@gmail.com",
      id: 64,
      status: "AGUARDANDO",
    },
    {
      name: "Nome do prestador",
      phone1: "47988889988",
      email: "julio.ferramentas@gmail.com",
      id: 64,
      status: "ATIVO",
    },
    {
      name: "Nome do prestador",
      phone1: "47988889988",
      email: "julio.ferramentas@gmail.com",
      id: 64,
      status: "INATIVO",
    },
  ] as Partial<TUserTypes["PRESTADOR"]>[]

  const handlePickProvider = async (prov: Partial<TUserTypes["PRESTADOR"]>) => {
    if (prov.id) {
      setLoading(true)

      try {
        const req = await Api.persons.getSingle({ id: prov.id })

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
              <S.BlockTitle>Orçamento nº{budget.id}</S.BlockTitle>
              <Button
                type="quaternary"
                text="Cancelar orçamento"
                action={() => {}}
                fit={true}
              />
            </S.BlockHeader>

            <Divider />

            <S.DetailsList>
              <S.DetailItem>
                <S.DetailName>Título:</S.DetailName>
                <S.DetailValue>{budget.titulo}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Condomínio:</S.DetailName>
                <S.DetailValue>{budget.nomeCondominio}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Urgente:</S.DetailName>
                <S.DetailValue>
                  {budget.isUrgente ? "Sim" : "Não"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Categoria:</S.DetailName>
                <S.DetailValue>{budget.nomeCategoria}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Subcategoria:</S.DetailName>
                <S.DetailValue>{budget.nomeSubcategoria}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Descrição:</S.DetailName>
                <S.DetailValue>{budget.descricao}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Data de início:</S.DetailName>
                <S.DetailValue>
                  {budget.dataInicio
                    ? getDateStr(budget.dataInicio, "dmy")
                    : "-"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Data fim:</S.DetailName>
                <S.DetailValue>
                  {budget.dataFim ? getDateStr(budget.dataFim, "dmy") : "-"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Anexo:</S.DetailName>
                <S.DetailValue>
                  {!!budget.urlAnexo ? "Baixar anexo" : "-"}
                </S.DetailValue>
              </S.DetailItem>
            </S.DetailsList>

            <Divider />

            <S.ButtonsArea>
              <Button
                type="green"
                text="REABRIR"
                action={() => {}}
                disabled={true}
              />
              <Button
                type="main"
                text="FINALIZAR"
                icon={<Icons.CheckCircle />}
                action={() => {}}
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
          {budget.prestadores.length > 0 ? (
            budget.prestadores.map((p, pk) => (
              <Card.ProviderResume
                key={pk}
                k={pk}
                data={p}
                onPick={() => handlePickProvider(p)}
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
