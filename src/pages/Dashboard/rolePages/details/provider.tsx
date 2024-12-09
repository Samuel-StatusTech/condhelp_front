import * as C from "../../styled"
import * as S from "./styled"

import BreadcrumbPageHeader from "../../../../components/PageHeader/types/breadcrumb"
import { getDateStr } from "../../../../utils/tb/format/date"
import Divider from "../../../../components/_minimals/Divider"
import { TUserTypes } from "../../../../utils/@types/data/user"
import { getStore } from "../../../../store"
import { useEffect, useState } from "react"

import { formatCNPJ } from "../../../../utils/tb/format/cnpj"
import { formatCep } from "../../../../utils/tb/format/cep"

type Props = {
  data: TUserTypes["PRESTADOR"]
  handleBack: () => void
}

const ProviderDetails = ({ data, handleBack }: Props) => {
  const { controllers } = getStore()

  const [loading] = useState(false)

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
              <S.BlockTitle>{data.name}</S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            <S.DetailsList>
              <S.DetailItem>
                <S.DetailName>Razão Social:</S.DetailName>
                <S.DetailValue>{data.companyName}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>CNPJ:</S.DetailName>
                <S.DetailValue>
                  {/* @ts-ignore */}
                  {data.cnpj ? formatCNPJ(data.cnpj) : "-"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Cartão CNPJ:</S.DetailName>
                <S.DetailValue>
                  {!!data.cnpjCard ? "Baixar anexo" : "-"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Abertura:</S.DetailName>
                <S.DetailValue>
                  {data.openingDate ? getDateStr(data.openingDate, "dmy") : "-"}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>IE:</S.DetailName>
                <S.DetailValue>{data.stateRegistration ?? "-"}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>IM:</S.DetailName>
                <S.DetailValue>{data.municipalRegistration ?? "-"}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Responsável:</S.DetailName>
                <S.DetailValue>{data.responsibleName}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Endereço:</S.DetailName>
                <S.DetailValue>{data.address.street}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>CEP:</S.DetailName>
                <S.DetailValue>{formatCep(data.address.cep)}</S.DetailValue>
              </S.DetailItem>
            </S.DetailsList>
          </S.Block>
        </S.Column>
        <S.Column></S.Column>
      </S.SubContent>
    </C.SubContent>
  )
}

export default ProviderDetails
