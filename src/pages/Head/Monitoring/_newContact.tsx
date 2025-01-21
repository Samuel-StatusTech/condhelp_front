import * as S from "./styled"
import { Icons } from "../../../assets/icons/icons"
import { TOption } from "../../../utils/@types/data/option"

import ProviderLegalization from "../../../components/ProviderLegalization"
import Divider from "../../../components/_minimals/Divider"
import Button from "../../../components/Button"
import Input from "../../../components/Input"
import { TMonitorItemDetails } from "../../../utils/@types/data/monitoring"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import { checkProviderPendencyStatus } from "../../../utils/tb/helpers/checkProviderPendencyStatus"

type Props = {
  data: TMonitorItemDetails
  provider: TMonitorItemDetails["providers"][number] | null
  newContact: {
    category: string
    provider: number | null
    description: string
  }
  options: { [key: string]: TOption[] }
  handleField: (field: string, value: string) => void
  handleContact: () => Promise<void>
  contacting: boolean
}

const NewContactBlock = ({
  data,
  provider,
  newContact,
  options,
  handleField,
  handleContact,
  contacting,
}: Props) => {
  return (
    <S.Block>
      <S.BlockTitle>Novo contato</S.BlockTitle>

      <Divider />

      <S.BlockRow>
        <Input.ReadonlyField
          field="category"
          value={data.categoryName}
          onChange={handleField}
          gridSizes={{ big: 2, small: 4 }}
          label="Categoria"
        />

        <Input.Select
          field="provider"
          // @ts-ignore
          value={newContact.provider ? newContact.provider : ""}
          options={parseOptionList(data.providers, "id", "name")}
          onChange={handleField}
          gridSizes={{ big: 2, small: 4 }}
          label="Prestador"
        />
      </S.BlockRow>

      <Divider />

      {provider && (
        <S.DataResumeArea>
          <S.ContactInfoArea>
            <S.ContactInfo>
              <Icons.Telephone />
              <span className="label">Principal:</span>
              <span>{provider?.phone1 ?? "-"}</span>
            </S.ContactInfo>
            <S.ContactInfo>
              <Icons.Telephone />
              <span className="label">Comercial:</span>
              <span>{provider?.phone2 ?? "-"}</span>
            </S.ContactInfo>
            <S.ContactInfo>
              <Icons.Telephone />
              <span className="label">Contato:</span>
              <span>{provider?.phone3 ?? "-"}</span>
            </S.ContactInfo>
            <S.ContactInfo>
              <Icons.Web />
              <span>{provider?.site}</span>
            </S.ContactInfo>
            <S.ContactInfo>
              <Icons.Mail />
              <span>{provider?.email}</span>
            </S.ContactInfo>
          </S.ContactInfoArea>

          <S.ContactInfoArea>
            <ProviderLegalization
              label={"CND Federal"}
              value={
                checkProviderPendencyStatus({
                  isent: provider?.federalCndFree,
                  register: provider?.federalCnd,
                  end: provider?.federalCndEnd,
                  start: provider?.federalCndStart,
                }) ?? "free"
              }
            />
            <ProviderLegalization
              label={"CND Estadual"}
              value={
                checkProviderPendencyStatus({
                  isent: provider?.stateCndFree,
                  register: provider?.stateCnd,
                  end: provider?.stateCndEnd,
                  start: provider?.stateCndStart,
                }) ?? "free"
              }
            />
            <ProviderLegalization
              label={"CND Municipal"}
              value={
                checkProviderPendencyStatus({
                  isent: provider?.cityCndFree,
                  register: provider?.cityCnd,
                  end: provider?.cityCndEnd,
                  start: provider?.cityCndStart,
                }) ?? "free"
              }
            />
            <ProviderLegalization
              label={"FGTS"}
              value={
                checkProviderPendencyStatus({
                  isent: provider?.fgtsCndFree,
                  register: provider?.fgtsCnd,
                  end: provider?.fgtsCndEnd,
                  start: provider?.fgtsCndStart,
                }) ?? "free"
              }
            />
          </S.ContactInfoArea>
        </S.DataResumeArea>
      )}

      {provider && <Divider />}

      {provider && (
        <S.ContactDescriptionArea>
          <Input.TextArea
            field="description"
            label="Informações do contato realizado:"
            onChange={handleField}
            value={newContact.description}
            gridSizes={{ big: 6, small: 4 }}
          />
          <div>
            <Button
              type="main"
              action={handleContact}
              text={contacting ? "Registrando..." : "Registrar contato"}
            />
          </div>
        </S.ContactDescriptionArea>
      )}
    </S.Block>
  )
}

export default NewContactBlock
