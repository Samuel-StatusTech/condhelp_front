import { TBlock } from "../../../../../utils/@types/components/Form"
import { TOption } from "../../../../../utils/@types/data/option"
import { TCity, TState } from "../../../../../utils/@types/data/region"
import { formatCep } from "../../../../../utils/tb/format/cep"
import { formatPhone } from "../../../../../utils/tb/format/phone"

type Props = {
  form: any
  options: {
    [key: string]: TOption[]
  }
  states: TState[]
  handleSelectCity: (city: TCity) => void
}

export const basicBranch = ({
  form,
  options,
  states,
  handleSelectCity,
}: Props): TBlock["groups"] => {
  const content: TBlock["groups"] = [
    {
      type: "fields",
      fields: [
        [
          {
            type: "input",
            field: "name",
            label: "Nome da Filial",
            value: form.name,
            placeholder: "Digite aqui",
            gridSizes: { big: 12 },
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
          },
          {
            type: "select",
            label: "Estado",
            placeholder: "Estado",
            field: "state",
            value: form.address?.state ?? ("" as string),
            options: options.state,
            gridSizes: { big: 3, small: 6 },
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
          },
          {
            type: "input",
            field: "number",
            label: "Número",
            value: String(form.address?.number).replace(/\D/g, "") ?? "",
            placeholder: "0",
            gridSizes: { big: 4, small: 5 },
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
          },
          {
            type: "input",
            field: "zipCode",
            label: "CEP",
            value: formatCep(form.address?.zipCode ?? ""),
            placeholder: "00000-000",
            gridSizes: { big: 4, small: 5 },
          },
        ],
      ],
    },
    {
      type: "fields",
      fields: [
        {
          type: "input",
          field: "email",
          label: "Email",
          value: form.email,
          placeholder: "Digite aqui",
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
          },
          {
            type: "input",
            label: "Telefone 2",
            field: "phone2",
            value: formatPhone(form.phone2),
            placeholder: "00 00000-0000",
            gridSizes: { big: 6, small: 6 },
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
