import { TBlock } from "../../../../../utils/@types/components/Form"
import { FormField } from "../../../../../utils/@types/components/FormFields"
import { TOption } from "../../../../../utils/@types/data/option"
import { TCity, TState } from "../../../../../utils/@types/data/region"
import { TErrorsCheck } from "../../../../../utils/@types/helpers/checkErrors"
import { formatCep } from "../../../../../utils/tb/format/cep"
import { formatPhone } from "../../../../../utils/tb/format/phone"

type Props = {
  form: any
  options: {
    [key: string]: TOption[]
  }
  states: TState[]
  handleSelectCity: (city: TCity) => void
  isEditing: boolean

  errors: TErrorsCheck
}

export const basicBranch = ({
  form,
  options,
  states,
  handleSelectCity,
  isEditing,
  errors,
}: Props): TBlock["groups"] => {
  const content: TBlock["groups"] = [
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
            gridSizes: { big: 12 },
            error: {
              has: errors.fields.includes("name"),
              message: "Digite um nome",
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
  ]

  return content
}
