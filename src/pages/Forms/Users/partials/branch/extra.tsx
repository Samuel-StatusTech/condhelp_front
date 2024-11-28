import { TBlock } from "../../../../../utils/@types/components/Form"
import { formatCNPJ } from "../../../../../utils/tb/format/cnpj"
import { formatCpf } from "../../../../../utils/tb/format/cpf"
import {
  formatCityInscription,
  formatStateInscription,
} from "../../../../../utils/tb/format/inscription"

export const extraBranch = (
  form: any,
  formSubmitFields: TBlock["groups"][number]
): TBlock[] => {
  const content: TBlock[] = [
    {
      title: "Informações do perfil",
      groups: [
        {
          type: "fields",
          // @ts-ignore
          fields: form.responsable
            ? [
                {
                  type: "radio",
                  field: "responsableType",
                  value: form.responsable.type,
                  gridSizes: { big: 12 },
                  options: [
                    { key: "cnpj", value: "Pessoa Jurídica" },
                    { key: "cpf", value: "Pessoa Física" },
                  ],
                },
                ...(form.responsable.type === "cnpj"
                  ? [
                      {
                        type: "input",
                        field: "responsableName",
                        label: "Pessoa Jurídica responsável",
                        value: form.responsable.name,
                        placeholder: "Informe a razão social",
                        gridSizes: { big: 12 },
                      },
                      [
                        {
                          type: "input",
                          field: "responsableFantasyName",
                          label: "Nome fantasia",
                          value: form.responsable.fantasyName,
                          placeholder: "Informe o nome fantasia",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "responsableRegister",
                          label: "CNPJ",
                          value: formatCNPJ(form.responsable.register),
                          placeholder: "00.000.000/0001-00",
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
                      [
                        {
                          type: "input",
                          field: "responsableInscriptionState",
                          label: "Inscrição estadual",
                          value: formatStateInscription(
                            form.responsable.inscriptionState
                          ),
                          placeholder: "Apenas números",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "responsableInscriptionCity",
                          label: "Inscrição municipal",
                          value: formatCityInscription(
                            form.responsable.inscriptionCity
                          ),
                          placeholder: "Apenas números",
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
                    ]
                  : [
                      [
                        {
                          type: "input",
                          field: "responsableName",
                          label: "Pessoa responsável",
                          value: form.responsable.name,
                          placeholder: "Informe o nome da pessoa",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "responsableRegister",
                          label: "CPF",
                          value: formatCpf(form.responsable.register),
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
                    ]),
              ]
            : [],
        },

        formSubmitFields,
      ],
    },
  ]

  return content
}
