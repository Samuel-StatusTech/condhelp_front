import { TBlock } from "../../../../../utils/@types/components/Form"

export const extraFranchise = (
  form: any,
  formSubmitFields: TBlock["groups"][number]
): TBlock[] => {
  const content: TBlock[] = [
    {
      title: "Informações do responsável",
      groups: [
        {
          type: "fields",
          fields: [
            {
              field: "",
              value: form.responsable ? form.responsable.type : "cpf",
              type: "radio",
              options: [
                { key: "cnpj", value: "Pessoa Jurídica" },
                { key: "cpf", value: "Pessoa Física" },
              ],
              gridSizes: { big: 12 },
            },
          ],
        },

        formSubmitFields,
      ],
    },
  ]

  return content
}
