import { TBlock, TForm } from "../../../../../utils/@types/components/Form"
import { FormField } from "../../../../../utils/@types/components/FormFields"
import { TAccess } from "../../../../../utils/@types/data/access"
import { TOption } from "../../../../../utils/@types/data/option"
import { TUser } from "../../../../../utils/@types/data/user"
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
}

export const basicProvider = ({
  form,
  options,
  personType,
  franchiseName,
}: Props): TBlock["groups"] => {
  const content: TBlock["groups"] = [
    {
      type: "fields",
      fields: [
        ...((personType === "FRANQUEADO"
          ? [
              {
                type: "readonly",
                label: "Franquia",
                field: "franchise",
                value: `${franchiseName} (Você)`,
                gridSizes: { big: 12 },
              } as FormField,
            ]
          : [
              {
                type: "select",
                label: "Franquia",
                placeholder: "Selecione a franquia",
                field: "franchise",
                value: form.franchise ?? "",
                options: options.franchise,
                gridSizes: { big: 12 },
                elevation: 10,
              },
            ]) as FormField[]),
      ],
    },
    {
      type: "fields",
      title: "Identidade do prestador",
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
            type: "input",
            field: "city",
            label: "Nome da cidade",
            value: form.address?.city ?? "",
            placeholder: "Digite aqui",
            gridSizes: { big: 6, small: 12 },
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
            field: "cep",
            label: "CEP",
            value: formatCep(form.address?.cep ?? ""),
            placeholder: "00000-000",
            gridSizes: { big: 4, small: 5 },
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
          },
          {
            type: "input",
            field: "website",
            label: "Website",
            value: form.website,
            placeholder: "Website",
            gridSizes: { big: 6, small: 12 },
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
          },
          {
            type: "input",
            field: "email",
            label: "Email",
            value: form.email,
            placeholder: "00 00000-0000",
            gridSizes: { big: 6, small: 12 },
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
          },
          {
            type: "input",
            field: "phone3",
            label: "Telefone 3",
            value: formatPhone(form.phone3),
            placeholder: "00 00000-0000",
            gridSizes: { big: 6, small: 12 },
          },
        ],
      ],
    },
  ]

  return content
}
