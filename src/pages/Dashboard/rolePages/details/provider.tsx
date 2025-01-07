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
import { Icons } from "../../../../assets/icons/icons"
import { formatPhone } from "../../../../utils/tb/format/phone"
import ProviderLegalization from "../../../../components/ProviderLegalization"

type Props = {
  data: TUserTypes["PRESTADOR"]
  handleBack: () => void
}

const ProviderDetails = ({ data, handleBack }: Props) => {
  const { controllers } = getStore()

  const [loading] = useState(false)

  const renderAddress = () => {
    let str = ""

    str += `${data.address.street}`
    str += ` ${data.address.number}`
    str += data.address.complement ? `, ${data.address.complement}` : ""
    str += `. ${data.address.city}`
    str += ` - ${data.address.state}`
    str += `,  ${data.address.country}`

    return str
  }

  const renderStatusIndicator = () => {
    let content: any = null

    switch (data.status) {
      case "AGUARDANDO":
        content = (
          <S.StatusArea $status={data.status}>
            <Icons.Alert />
            <span>Aguardando Síndico</span>
          </S.StatusArea>
        )
        break
      case "ATIVO":
        content = (
          <S.StatusArea $status={data.status}>
            <Icons.CheckFill />
            <span>PARTICIPANDO</span>
          </S.StatusArea>
        )
        break
      case "INATIVO":
        content = (
          <S.StatusArea $status={data.status}>
            <Icons.Close />
            <span>RECUSADO</span>
          </S.StatusArea>
        )
        break
    }

    return content
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
        <BreadcrumbPageHeader from="panelProvider" handleAction={handleBack} />
      </C.BlockArea>

      <S.SubContent>
        <S.Column>
          <S.Block>
            <S.BlockHeader>
              <S.BlockTitle>{data.name}</S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            <S.ProviderBrand>
              <S.LogoArea>
                <span>Sem logo</span>
              </S.LogoArea>
              <S.ContactInfos>
                <S.Contact>
                  <Icons.Phone />
                  <span>{formatPhone(data.phone1)}</span>
                </S.Contact>
                <S.Contact>
                  <Icons.Mail />
                  <span>{data.email}</span>
                </S.Contact>
                <S.Contact>
                  <Icons.Web />
                  <span>{data.website}</span>
                </S.Contact>
              </S.ContactInfos>
            </S.ProviderBrand>

            <Divider />

            <S.DetailsList>
              <S.DetailItem>
                <S.DetailName>Razão Social:</S.DetailName>
                <S.DetailValue>{data.socialRole}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>CNPJ:</S.DetailName>
                <S.DetailValue>
                  {/* @ts-ignore */}
                  {data.document.register
                    ? formatCNPJ(data.document.register)
                    : "-"}
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
                <S.DetailValue>{data.stateRegistration}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>IM:</S.DetailName>
                <S.DetailValue>{data.municipalRegistration}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Responsável:</S.DetailName>
                <S.DetailValue>{data.responsable}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>Endereço:</S.DetailName>
                <S.DetailValue>{renderAddress()}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailName>CEP:</S.DetailName>
                <S.DetailValue>{formatCep(data.address.cep)}</S.DetailValue>
              </S.DetailItem>
            </S.DetailsList>
          </S.Block>
        </S.Column>
        <S.Column>
          <S.Block>
            <S.BlockHeader>
              <S.BlockTitle>Certificados</S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 320,
              }}
            >
              <ProviderLegalization
                label={"CND Federal"}
                value={data.pendencies.federalCnd}
              />
              <ProviderLegalization
                label={"CND Estadual"}
                value={data.pendencies.stateCnd}
              />
              <ProviderLegalization
                label={"CND Municipal"}
                value={data.pendencies.cityCnd}
              />
              <ProviderLegalization
                label={"FGTS"}
                value={data.pendencies.fgts}
              />
            </div>
          </S.Block>

          <S.Block>
            <S.BlockHeader>
              <S.BlockTitle>Participação no orçamento</S.BlockTitle>
            </S.BlockHeader>

            <Divider />

            {renderStatusIndicator()}
          </S.Block>
        </S.Column>
      </S.SubContent>
    </C.SubContent>
  )
}

export default ProviderDetails
