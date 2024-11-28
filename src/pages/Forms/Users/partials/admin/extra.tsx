import { TBlock } from "../../../../../utils/@types/components/Form"
import { formatCpf } from "../../../../../utils/tb/format/cpf"

export const extraAdmin = (
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

        formSubmitFields,
      ],
    },
  ]

  return content
}
