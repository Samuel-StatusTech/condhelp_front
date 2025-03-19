import { TBlock } from "../../../../../utils/@types/components/Form"
import { TUBranch } from "../../../../../utils/@types/data/_user/branch"
import { TNewUser } from "../../../../../utils/@types/data/user"
import { TErrorsCheck } from "../../../../../utils/@types/helpers/checkErrors"
import initials from "../../../../../utils/initials"
import { formatCNPJ } from "../../../../../utils/tb/format/cnpj"
import { formatCpf } from "../../../../../utils/tb/format/cpf"
import {
  formatCityInscription,
  formatStateInscription,
} from "../../../../../utils/tb/format/inscription"

const inData = initials.forms.person.REDE as TNewUser & TUBranch

export const extraBranch = (
  form: typeof inData,
  formSubmitFields: TBlock["groups"][number],
  errors: TErrorsCheck
): TBlock[] => {
  const content: TBlock[] = [
    {
      title: "Informações do perfil",
      groups: [
        {
          type: "fields",
          // @ts-ignore
          fields: form.responsible
            ? [
                {
                  type: "radio",
                  field: "responsableResponsibleType",
                  value: form.responsible.responsibleType,
                  gridSizes: { big: 12 },
                  options: [
                    { key: "CNPJ", value: "Pessoa Jurídica" },
                    { key: "CPF", value: "Pessoa Física" },
                  ],
                },
                ...(form.responsible.responsibleType === "CNPJ"
                  ? [
                      {
                        type: "input",
                        field: "responsableCompanyName",
                        label: "Pessoa Jurídica responsável",
                        value: form.responsible.companyName,
                        placeholder: "Informe a razão social",
                        gridSizes: { big: 12 },
                        error: {
                          has: errors.fields.includes("responsableCompanyName"),
                          message: "Digite a razão social",
                        },
                      },
                      [
                        {
                          type: "input",
                          field: "responsableFantasyName",
                          label: "Nome fantasia",
                          value: form.responsible.fantasyName,
                          placeholder: "Informe o nome fantasia",
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: errors.fields.includes(
                              "responsableFantasyName"
                            ),
                            message: "Digite o nome fantasia",
                          },
                        },
                        {
                          type: "input",
                          field: "responsableCnpj",
                          label: "CNPJ",
                          value: formatCNPJ(form.responsible.cnpj),
                          placeholder: "00.000.000/0001-00",
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: errors.fields.includes("responsableCnpj"),
                            message: "Digite o CNPJ",
                          },
                        },
                      ],
                      [
                        {
                          type: "input",
                          field: "responsableStateRegistration",
                          label: "Inscrição estadual",
                          value: formatStateInscription(
                            form.responsible.stateRegistration
                          ),
                          placeholder: "Apenas números",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "responsableMunicipalRegistration",
                          label: "Inscrição municipal",
                          value: formatCityInscription(
                            form.responsible.municipalRegistration
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
                          field: "responsablePersonName",
                          label: "Pessoa responsável",
                          value: form.responsible.personName,
                          placeholder: "Informe o nome da pessoa",
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: errors.fields.includes(
                              "responsablePersonName"
                            ),
                            message: "Digite o nome do(a) responsável",
                          },
                        },
                        {
                          type: "input",
                          field: "responsableCpf",
                          label: "CPF",
                          placeholder: "123.456.789-10",
                          value: formatCpf(form.responsible.cpf),
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: errors.fields.includes("responsableCpf"),
                            message: "Digite o cpf do(a) responsável",
                          },
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
