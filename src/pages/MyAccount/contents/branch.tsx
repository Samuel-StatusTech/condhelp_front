import * as C from "../styled"

import Form from "../../../components/Form"
import PageHeader from "../../../components/PageHeader"
import { TBlock } from "../../../utils/@types/components/Form"
import { formatPhone } from "../../../utils/tb/format/phone"
import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"
import { formatCep } from "../../../utils/tb/format/cep"
import { TCity } from "../../../utils/@types/data/region"
import { TOption } from "../../../components/Input/condosSelect"
import { formatCNPJ } from "../../../utils/tb/format/cnpj"
import {
  formatCityInscription,
  formatStateInscription,
} from "../../../utils/tb/format/inscription"
import { formatCpf } from "../../../utils/tb/format/cpf"

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

const MyAccountBranch = (props: Props) => {
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
                          type: "input",
                          field: "name",
                          label: "Nome da Rede",
                          value: form.name,
                          placeholder: "Digite aqui",
                          gridSizes: { big: 3, small: 12 },
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
                        type: "readonly",
                        label: "Email",
                        field: "email",
                        value: form.email,
                        gridSizes: { big: 12 },
                      },
                    ],
                  },

                  {
                    type: "fields",
                    fields: [
                      [
                        {
                          type: "input",
                          label: "Telefone 1",
                          field: "phone1",
                          value: formatPhone(form.phone1),
                          placeholder: "00 00000-0000",
                          gridSizes: { big: 6, small: 6 },
                          error: {
                            has: errors.fields.includes("phone1"),
                            message: "Telefone 1 obrigatório",
                          },
                        },
                        {
                          type: "input",
                          label: "Telefone 2",
                          field: "phone2",
                          value: formatPhone(form.phone2),
                          placeholder: "00 00000-0000",
                          gridSizes: { big: 6, small: 6 },
                          error: {
                            has: errors.fields.includes("phone2"),
                            message: "Digite um telefone válido",
                          },
                        },
                      ],
                      {
                        type: "profile",
                        label: "Imagem de perfil",
                        field: "image",
                        value: form.image,
                        gridSizes: { big: 12 },
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
                title: "Informações do perfil",
                groups: [
                  {
                    type: "fields",
                    // @ts-ignore
                    fields: form.responsible
                      ? [
                          {
                            type: "radio",
                            field: "responsableResponsibleType",
                            value: form.responsible.responsibleType,
                            gridSizes: { big: 12 },
                            options: [
                              { key: "CNPJ", value: "Pessoa Jurídica" },
                              { key: "CPF", value: "Pessoa Física" },
                            ],
                          },
                          ...(form.responsible.responsibleType === "CNPJ"
                            ? [
                                {
                                  type: "input",
                                  field: "responsableCompanyName",
                                  label: "Pessoa Jurídica responsável",
                                  value: form.responsible.companyName,
                                  placeholder: "Informe a razão social",
                                  gridSizes: { big: 12 },
                                  error: {
                                    has: errors.fields.includes(
                                      "responsableCompanyName"
                                    ),
                                    message: "Digite a razão social",
                                  },
                                },
                                [
                                  {
                                    type: "input",
                                    field: "responsableFantasyName",
                                    label: "Nome fantasia",
                                    value: form.responsible.fantasyName,
                                    placeholder: "Informe o nome fantasia",
                                    gridSizes: { big: 6, small: 12 },
                                    error: {
                                      has: errors.fields.includes(
                                        "responsableFantasyName"
                                      ),
                                      message: "Digite o nome fantasia",
                                    },
                                  },
                                  {
                                    type: "input",
                                    field: "responsableCnpj",
                                    label: "CNPJ",
                                    value: formatCNPJ(form.responsible.cnpj),
                                    placeholder: "00.000.000/0001-00",
                                    gridSizes: { big: 6, small: 12 },
                                    error: {
                                      has: errors.fields.includes(
                                        "responsableCnpj"
                                      ),
                                      message: "Digite o CNPJ",
                                    },
                                  },
                                ],
                                [
                                  {
                                    type: "input",
                                    field: "responsableStateRegistration",
                                    label: "Inscrição estadual",
                                    value: formatStateInscription(
                                      form.responsible.stateRegistration
                                    ),
                                    placeholder: "Apenas números",
                                    gridSizes: { big: 6, small: 12 },
                                  },
                                  {
                                    type: "input",
                                    field: "responsableMunicipalRegistration",
                                    label: "Inscrição municipal",
                                    value: formatCityInscription(
                                      form.responsible.municipalRegistration
                                    ),
                                    placeholder: "Apenas números",
                                    gridSizes: { big: 6, small: 12 },
                                  },
                                ],
                              ]
                            : [
                                [
                                  {
                                    type: "input",
                                    field: "responsablePersonName",
                                    label: "Pessoa responsável",
                                    value: form.responsible.personName,
                                    placeholder: "Informe o nome da pessoa",
                                    gridSizes: { big: 6, small: 12 },
                                    error: {
                                      has: errors.fields.includes(
                                        "responsablePersonName"
                                      ),
                                      message:
                                        "Digite o nome do(a) responsável",
                                    },
                                  },
                                  {
                                    type: "input",
                                    field: "responsableCpf",
                                    label: "CPF",
                                    placeholder: "123.456.789-10",
                                    value: formatCpf(form.responsible.cpf),
                                    gridSizes: { big: 6, small: 12 },
                                    error: {
                                      has: errors.fields.includes(
                                        "responsableCpf"
                                      ),
                                      message: "Digite o cpf do(a) responsável",
                                    },
                                  },
                                ],
                              ]),
                        ]
                      : [],
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

export default MyAccountBranch
