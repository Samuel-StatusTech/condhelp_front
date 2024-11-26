import * as S from "./styled"
import { Icons } from "../../../assets/icons/icons"
import { TOption } from "../../../utils/@types/data/option"
import { TUserTypes } from "../../../utils/@types/data/user"

import ProviderLegalization from "../../../components/ProviderLegalization"
import Divider from "../../../components/_minimals/Divider"
import Button from "../../../components/Button"
import Input from "../../../components/Input"

type Props = {
  provider: TUserTypes["PRESTADOR"] | null
  newContact: {
    category: string
    provider: string
    description: string
  }
  options: { [key: string]: TOption[] }
  handleField: (field: string, value: string) => void
  handleContact: () => Promise<void>
  contacting: boolean
}

const NewContactBlock = ({
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
        <Input.Select
          field="category"
          value={newContact.category}
          options={options.category}
          onChange={handleField}
          gridSizes={{ big: 2, small: 4 }}
          label="Categoria"
        />

        <Input.Select
          field="provider"
          value={newContact.provider}
          options={options.provider}
          onChange={handleField}
          gridSizes={{ big: 2, small: 4 }}
          label="Prestador"
        />
      </S.BlockRow>

      <Divider />

      <S.DataResumeArea>
        <S.ContactInfoArea>
          <S.ContactInfo>
            <Icons.Telephone />
            <span className="label">Principal:</span>
            <span>48 9999-9999</span>
          </S.ContactInfo>
          <S.ContactInfo>
            <Icons.Telephone />
            <span className="label">Comercial:</span>
            <span>48 9999-9999</span>
          </S.ContactInfo>
          <S.ContactInfo>
            <Icons.Telephone />
            <span className="label">Contato:</span>
            <span>48 9999-9999</span>
          </S.ContactInfo>
          <S.ContactInfo>
            <Icons.Web />
            <span>www.superjardins.com.br</span>
          </S.ContactInfo>
          <S.ContactInfo>
            <Icons.Mail />
            <span>comercial@superjardins.com.br</span>
          </S.ContactInfo>
        </S.ContactInfoArea>

        <S.ContactInfoArea>
          <ProviderLegalization
            label={"CND Federal"}
            value={provider?.pendencies.federalCnd ?? "free"}
          />
          <ProviderLegalization
            label={"CND Estadual"}
            value={provider?.pendencies.stateCnd ?? "free"}
          />
          <ProviderLegalization
            label={"CND Municipal"}
            value={provider?.pendencies.cityCnd ?? "free"}
          />
          <ProviderLegalization
            label={"FGTS"}
            value={provider?.pendencies.fgts ?? "free"}
          />
        </S.ContactInfoArea>
      </S.DataResumeArea>

      <Divider />

      <S.ContactDescriptionArea>
        <Input.TextArea
          field="description"
          label="Informações do contato realizado:"
          onChange={handleField}
          value={newContact.description}
          gridSizes={{ big: 3, small: 4 }}
        />
        <div>
          <Button
            type="main"
            action={handleContact}
            text={contacting ? "Registrando..." : "Registrar contato"}
          />
        </div>
      </S.ContactDescriptionArea>
    </S.Block>
  )
}

export default NewContactBlock
