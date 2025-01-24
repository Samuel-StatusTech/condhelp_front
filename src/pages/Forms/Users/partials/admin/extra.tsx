import { TBlock } from "../../../../../utils/@types/components/Form"
import { TErrorsCheck } from "../../../../../utils/@types/helpers/checkErrors"
import { formatCpf } from "../../../../../utils/tb/format/cpf"
import { getMajorityDate } from "../../../../../utils/tb/helpers/getMajorityDate"

export const extraAdmin = (
  form: any,
  formSubmitFields: TBlock["groups"][number],
  errors: TErrorsCheck
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
                error: {
                  has: false,
                  message: "Escolha um documento",
                },
              },
              {
                type: "input",
                field: "documentRegister",
                label: "Nº do documento",
                value: formatCpf(form.document.register),
                placeholder: "000.000.000-00",
                gridSizes: { big: 6, small: 12 },
                error: {
                  has: errors.fields.includes("documentRegister"),
                  message: "Digite um documento válido",
                },
              },
              {
                type: "date",
                field: "documentDate",
                label: "Data de nascimento",
                value: form.document.date,
                gridSizes: { big: 3, small: 12 },
                maxDate: getMajorityDate(),
                error: {
                  has: errors.fields.includes("documentDate"),
                  message: "Escolha uma data",
                },
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
