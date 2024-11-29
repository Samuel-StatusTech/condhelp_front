import { List } from "../../../../../components/List"
import { TBlock } from "../../../../../utils/@types/components/Form"
import { systemOptions } from "../../../../../utils/system/options"
import { formatCpf } from "../../../../../utils/tb/format/cpf"
import { formatPhone } from "../../../../../utils/tb/format/phone"

export const extraManager = (
  form: any,
  formSubmitFields: TBlock["groups"][number]
): TBlock[] => {
  const content: TBlock[] = [
    {
      title: "Informações do perfil",
      groups: [
        {
          type: "fields",
          fields: [
            [
              {
                type: "input",
                label: "Telefone com DDD",
                field: "phone1",
                value: formatPhone(form.phone1),
                placeholder: "00 00000-0000",
                gridSizes: { big: 6, small: 6 },
              },
              {
                type: "input",
                label: "Celular com DDD",
                field: "phone2",
                value: formatPhone(form.phone2),
                placeholder: "00 00000-0000",
                gridSizes: { big: 6, small: 6 },
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
                label: "Documento",
                field: "documentType",
                value: "cpf",
                options: [{ key: "cpf", value: "CPF" }],
                gridSizes: { big: 3, small: 12 },
              },
              {
                type: "input",
                field: "documentRegister",
                label: "Nº do documento",
                value: formatCpf(form.document.register),
                placeholder: "000.000.000-00",
                gridSizes: { big: 6, small: 12 },
              },
              {
                type: "date",
                field: "documentDate",
                label: "Data de nascimento",
                value: form.document.date,
                gridSizes: { big: 3, small: 12 },
              },
            ],
          ],
        },
        {
          type: "fields",
          fields: [
            {
              type: "select",
              label: "Tempo na função como síndico",
              field: "experience",
              value: form.experience,
              options: systemOptions.managerTime,
              gridSizes: { big: 12 },
            },
          ],
        },
        {
          type: "custom",
          element: (
            <List.Condos
              title="Condomínios vinculados a este síndico"
              list={form.condos ?? []}
              handleAdd={() => {}}
              handleDelete={() => {}}
            />
          ),
        },

        formSubmitFields,
      ],
    },
  ]

  return content
}