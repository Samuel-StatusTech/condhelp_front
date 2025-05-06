import { TBlock, TForm } from "../../../../../utils/@types/components/Form"
import { FormField } from "../../../../../utils/@types/components/FormFields"
import { TAccess } from "../../../../../utils/@types/data/access"
import { TOption } from "../../../../../utils/@types/data/option"
import { TCity } from "../../../../../utils/@types/data/region"
import { TUser } from "../../../../../utils/@types/data/user"
import { TErrorsCheck } from "../../../../../utils/@types/helpers/checkErrors"
import { formatCep } from "../../../../../utils/tb/format/cep"
import { formatPhone } from "../../../../../utils/tb/format/phone"

type Props = {
  form: any
  options: {
    [key: string]: TOption[]
  }
  handleField: TForm["handleField"]
  franchises?: TUser[]
  personType: TAccess
  franchiseName?: string
  handleSelectCity: (city: TCity) => void
  isEditing: boolean

  errors: TErrorsCheck
}

export const basicProvider = ({
  form,
  options,
  handleSelectCity,
  isEditing,
  errors,
}: Props): TBlock["groups"] => {
  const content: TBlock["groups"] = [
    {
      type: "fields",
      title: "Identidade do prestador",
      fields: [
        [
          {
            type: "logo",
            field: "photo",
            value: form.photo,
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

    // Tags
    {
      type: "fields",
      title: "Tags",
      fields: [
        {
          type: "toggler",
          label: "Possui tag",
          field: "isUserFlag",
          value: form.isUserFlag,
          hasTopSpace: true,
        },
        ...((form.isUserFlag
          ? [
              {
                type: "select",
                label: "Selecione a tag",
                field: "tagId",
                value: form.tagId,
                options: options.tags,
                gridSizes: { big: 12 },
                error: {
                  has: errors.fields.includes("tagId"),
                  message: "Escolha uma tag",
                },
              },
            ]
          : []) as FormField[]),
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
            big: true,
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

    // Responsable
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
          ...((isEditing
            ? [
                {
                  type: "readonly",
                  label: "Email",
                  field: "email",
                  value: form.email,
                  gridSizes: { big: 6, small: 12 },
                  error: {
                    has: false,
                    message: "Digite um email válido",
                  },
                },
              ]
            : [
                {
                  type: "input",
                  field: "email",
                  label: "Email",
                  value: form.email,
                  placeholder: "Digite aqui",
                  gridSizes: { big: 6, small: 12 },
                  error: {
                    has: errors.fields.includes("email"),
                    message: "Digite um email válido",
                  },
                },
              ]) as FormField[]),
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
      ],
    },
  ]

  return content
}
