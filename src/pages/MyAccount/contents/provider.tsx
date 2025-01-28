import * as C from "../styled"

import Form from "../../../components/Form"
import PageHeader from "../../../components/PageHeader"
import { TBlock } from "../../../utils/@types/components/Form"
import { formatPhone } from "../../../utils/tb/format/phone"
import { formatCep } from "../../../utils/tb/format/cep"
import { TOption } from "../../../utils/@types/data/option"
import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"
import { TCity } from "../../../utils/@types/data/region"
import { formatCNPJ } from "../../../utils/tb/format/cnpj"

type Props = {
  handleField: (field: string, value: any) => void
  handleCancel: (params?: any) => void
  handleSave: (form: any) => Promise<void>
  form: any
  formSubmitFields: TBlock["groups"][number]

  handleSelectCity: (city: TCity) => void

  options: {
    [key: string]: TOption[]
  }
  errors: TErrorsCheck
}

const MyAccountProvider = (props: Props) => {
  const {
    handleField,
    handleCancel,
    handleSave,

    form,
    formSubmitFields,

    handleSelectCity,

    options,
    errors,
  } = props

  return (
    <C.Content className="falseSubContentWrapper">
      <PageHeader type={"breadcrumb"} from={"myaccount"} forForm={true} />

      <Form
        handleField={handleField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        columns={[
          {
            blocks: [
              {
                title: "Informações básicas",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      [
                        {
                          type: "logo",
                          field: "image",
                          value: form.image,
                          gridSizes: { big: 3, small: 12 },
                        },
                        {
                          type: "input",
                          label: "Nome fantasia",
                          field: "name",
                          value: form.name,
                          placeholder: "Informe o nome fantasia",
                          gridSizes: { big: 9, small: 12 },
                          error: {
                            has: errors.fields.includes("name"),
                            message: "Digite um nome",
                          },
                        },
                      ],
                    ],
                  },

                  // Address
                  {
                    type: "fields",
                    fields: [
                      [
                        {
                          type: "select",
                          label: "País",
                          placeholder: "País",
                          field: "country",
                          value: form.address?.country ?? "",
                          options: options.country,
                          gridSizes: { big: 3, small: 6 },
                          elevation: 10,
                          error: {
                            has: errors.fields.includes("country"),
                            message: "Selecione um país",
                          },
                        },
                        {
                          type: "select",
                          label: "Estado",
                          placeholder: "Estado",
                          field: "state",
                          value: form.address?.state ?? ("" as string),
                          options: options.state,
                          gridSizes: { big: 3, small: 6 },
                          error: {
                            has: errors.fields.includes("state"),
                            message: "Selecione um estado",
                          },
                        },
                        {
                          type: "cityInput",
                          label: "Cidade",
                          field: "city",
                          placeholder: "Digite aqui",
                          value: form.address.city,
                          gridSizes: { big: 6, small: 12 },
                          stateId: form.address.state,
                          onSelectCity: handleSelectCity,
                          error: {
                            has: errors.fields.includes("city"),
                            message: "Selecione uma cidade",
                          },
                        },
                      ],
                      [
                        {
                          type: "input",
                          field: "street",
                          label: "Endereço",
                          value: form.address?.street ?? "",
                          placeholder: "Digite aqui",
                          gridSizes: { big: 8, small: 7 },
                          error: {
                            has: errors.fields.includes("street"),
                            message: "Digite o nome da rua",
                          },
                        },
                        {
                          type: "input",
                          field: "number",
                          label: "Número",
                          value:
                            String(form.address?.number).replace(/\D/g, "") ??
                            "",
                          placeholder: "0",
                          gridSizes: { big: 4, small: 5 },
                          error: {
                            has: errors.fields.includes("number"),
                            message: "Digite o número da rua",
                          },
                        },
                      ],
                      [
                        {
                          type: "input",
                          field: "complement",
                          label: "Complemento",
                          value: form.address?.complement ?? "",
                          placeholder: "Digite aqui",
                          gridSizes: { big: 8, small: 7 },
                          error: {
                            has: false,
                            message: "Digite um complemento",
                          },
                        },
                        {
                          type: "input",
                          field: "zipCode",
                          label: "CEP",
                          value: formatCep(form.address?.zipCode ?? ""),
                          placeholder: "00000-000",
                          gridSizes: { big: 4, small: 5 },
                          error: {
                            has: errors.fields.includes("zipCode"),
                            message: "Digite o CEP",
                          },
                        },
                      ],
                    ],
                  },

                  {
                    type: "fields",
                    fields: [
                      {
                        type: "profile",
                        label: "Imagem de perfil",
                        field: "image",
                        value: form.image,
                        gridSizes: { big: 6, small: 12 },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            blocks: [
              {
                title: "Informações Comerciais",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      {
                        type: "input",
                        field: "socialRole",
                        label: "Razão social",
                        value: form.socialRole,
                        placeholder: "Informe a razão social",
                        gridSizes: { big: 12 },
                        error: {
                          has: errors.fields.includes("socialRole"),
                          message: "Digite a razão social",
                        },
                      },
                      [
                        {
                          type: "readonly",
                          field: "documentRegister",
                          label: "CNPJ",
                          value: formatCNPJ(form.document.register),
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: false,
                            message: "Digite um documento válido",
                          },
                        },
                        {
                          type: "date",
                          field: "documentDate",
                          label: "Data de abertura da empresa",
                          value: form.document.date,
                          gridSizes: { big: 6, small: 12 },
                          maxDate: new Date(),
                          error: {
                            has: errors.fields.includes("documentDate"),
                            message: "Selecione uma data",
                          },
                        },
                      ],
                      {
                        type: "file",
                        field: "cnpjCard",
                        label: "Cartão CNPJ",
                        value: form.cnpjCard,
                        gridSizes: { big: 12, small: 12 },
                        allowsPdf: true,
                      },
                    ],
                  },
                  {
                    type: "fields",
                    fields: [
                      {
                        type: "multipleSelect",
                        label: "Categorias de serviço prestado",
                        placeholder: "Selecione as categorias",
                        field: "categories",
                        value: form.categories,
                        selecteds: options.category
                          .filter((c) => form.categories.includes(c.key))
                          .map((c) => c.value),
                        options: options.category,
                        gridSizes: { big: 12 },
                        error: {
                          has: errors.fields.includes("categories"),
                          message: "Selecione pelo menos 1 categoria",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                title: "Informações de contato",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      [
                        {
                          type: "input",
                          field: "responsable",
                          label: "Nome do responsável",
                          value: form.responsable,
                          placeholder: "Nome do responsável",
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: errors.fields.includes("responsable"),
                            message: "Digite o nome do(a) responsável",
                          },
                        },
                        {
                          type: "input",
                          field: "website",
                          label: "Website",
                          value: form.website,
                          placeholder: "Website",
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: false,
                            message: "Digite o website",
                          },
                        },
                      ],
                      [
                        {
                          type: "input",
                          field: "phone1",
                          label: "Telefone principal com DDD",
                          value: formatPhone(form.phone1),
                          placeholder: "00 00000-0000",
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: errors.fields.includes("phone1"),
                            message: "Telefone principal obrigatório",
                          },
                        },
                      ],
                      [
                        {
                          type: "input",
                          field: "phone2",
                          label: "Telefone 2",
                          value: formatPhone(form.phone2),
                          placeholder: "00 00000-0000",
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: errors.fields.includes("phone2"),
                            message: "Digite um telefone válido",
                          },
                        },
                        {
                          type: "input",
                          field: "phone3",
                          label: "Telefone 3",
                          value: formatPhone(form.phone3),
                          placeholder: "00 00000-0000",
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: errors.fields.includes("phone3"),
                            message: "Digite um telefone válido",
                          },
                        },
                      ],
                      [
                        {
                          type: "readonly",
                          label: "Email",
                          field: "email",
                          value: form.email,
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
                    ],
                  },
                  formSubmitFields,
                ],
              },
            ],
          },
        ]}
      />
    </C.Content>
  )
}

export default MyAccountProvider
