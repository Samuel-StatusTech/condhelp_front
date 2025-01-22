import { TBlock } from "../../../../../utils/@types/components/Form"
import { FormField } from "../../../../../utils/@types/components/FormFields"
import { TAccess } from "../../../../../utils/@types/data/access"
import { TOption } from "../../../../../utils/@types/data/option"
import { TCity } from "../../../../../utils/@types/data/region"
import { formatCep } from "../../../../../utils/tb/format/cep"
import { formatPhone } from "../../../../../utils/tb/format/phone"

type Props = {
  userProfile: TAccess
  form: any
  options: { [key: string]: TOption[] }
  handleSelectCity: (city: TCity) => void
  isEditing: boolean
}

export const basicFranchise = ({
  userProfile,
  form,
  options,
  handleSelectCity,
  isEditing,
}: Props): TBlock["groups"] => {
  const content: TBlock["groups"] = [
    {
      type: "fields",
      // @ts-ignore
      fields: [
        ...(userProfile === "FILIAL"
          ? [
              {
                type: "input",
                label: "Nome da franquia",
                field: "name",
                value: form.name,
                placeholder: "Nome da franquia",
                gridSizes: { big: 12 },
              },
            ]
          : [
              [
                ...(isEditing
                  ? [
                      {
                        type: "readonly",
                        label: "Filial",
                        field: "branchId",
                        value:
                          options.branch.find((b) => b.key === form.branchId)
                            ?.value ?? "",
                        gridSizes: { big: 6, small: 12 },
                      },
                    ]
                  : [
                      {
                        type: "select",
                        label: "Filial",
                        placeholder: "Filial",
                        field: "branchId",
                        value: form.branchId ?? "",
                        options: options.branch,
                        gridSizes: { big: 6, small: 12 },
                        elevation: 10,
                      },
                    ]),
                {
                  type: "input",
                  label: "Nome da franquia",
                  field: "name",
                  value: form.name,
                  placeholder: "Nome da franquia",
                  gridSizes: { big: 6, small: 12 },
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
            value: form.address?.number ?? "",
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
            field: "phone2",
            label: "Telefone 2",
            value: formatPhone(form.phone2),
            placeholder: "00 00000-0000",
            gridSizes: { big: 6, small: 12 },
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
              },
            ]) as FormField[]),
      ],
    },
  ]

  return content
}
