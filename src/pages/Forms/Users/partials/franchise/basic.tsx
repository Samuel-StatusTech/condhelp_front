import { TBlock } from "../../../../../utils/@types/components/Form"
import { FormField } from "../../../../../utils/@types/components/FormFields"
import { TAccess } from "../../../../../utils/@types/data/access"
import { TOption } from "../../../../../utils/@types/data/option"
import { TCity } from "../../../../../utils/@types/data/region"
import { TErrorsCheck } from "../../../../../utils/@types/helpers/checkErrors"
import { formatCep } from "../../../../../utils/tb/format/cep"
import { formatPhone } from "../../../../../utils/tb/format/phone"

type Props = {
  userProfile: TAccess
  form: any
  options: { [key: string]: TOption[] }
  handleSelectCity: (city: TCity) => void
  isEditing: boolean

  errors: TErrorsCheck
}

export const basicFranchise = ({
  userProfile,
  form,
  options,
  handleSelectCity,
  isEditing,
  errors,
}: Props): TBlock["groups"] => {
  const content: TBlock["groups"] = [
    {
      type: "fields",
      // @ts-ignore
      fields: [
        ...(userProfile === "REDE"
          ? [
              {
                type: "input",
                label: "Nome da loja",
                field: "name",
                value: form.name,
                placeholder: "Nome da loja",
                gridSizes: { big: 12 },
                error: {
                  has: errors.fields.includes("name"),
                  message: "Digite um nome",
                },
              },
            ]
          : [
              [
                ...(isEditing
                  ? [
                      {
                        type: "readonly",
                        label: "Rede",
                        field: "branchId",
                        value:
                          options.branch.find((b) => b.key === form.branchId)
                            ?.value ?? "",
                        gridSizes: { big: 6, small: 12 },
                        error: {
                          has: false,
                          message: "Escolha a rede",
                        },
                      },
                    ]
                  : [
                      {
                        type: "select",
                        label: "Rede",
                        placeholder: "Rede",
                        field: "branchId",
                        value: form.branchId ?? "",
                        options: options.branch,
                        gridSizes: { big: 6, small: 12 },
                        elevation: 10,
                        error: {
                          has: errors.fields.includes("branchId"),
                          message: "Selecione uma rede",
                        },
                      },
                    ]),
                {
                  type: "input",
                  label: "Nome da loja",
                  field: "name",
                  value: form.name,
                  placeholder: "Nome da loja",
                  gridSizes: { big: 6, small: 12 },
                  error: {
                    has: errors.fields.includes("name"),
                    message: "Digite um nome",
                  },
                },
              ],
            ]),
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
            value: String(form.address?.number).replace(/\D/g, "") ?? "",
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
        ],
        ...((isEditing
          ? [
              {
                type: "readonly",
                label: "Email",
                field: "email",
                value: form.email,
                gridSizes: { big: 12 },
              },
            ]
          : [
              {
                type: "input",
                field: "email",
                label: "Email",
                value: form.email,
                placeholder: "Digite aqui",
                gridSizes: { big: 12 },
                error: {
                  has: errors.fields.includes("email"),
                  message: "Digite o email",
                },
              },
            ]) as FormField[]),
      ],
    },
  ]

  return content
}
