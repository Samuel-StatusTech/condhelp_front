import { List } from "../../../../../components/List"
import { TBlock } from "../../../../../utils/@types/components/Form"
import { TCondominium } from "../../../../../utils/@types/data/condominium"
import { TUManager } from "../../../../../utils/@types/data/user"
import { TErrorsCheck } from "../../../../../utils/@types/helpers/checkErrors"
import { systemOptions } from "../../../../../utils/system/options"
import { formatCpf } from "../../../../../utils/tb/format/cpf"
import { formatPhone } from "../../../../../utils/tb/format/phone"
import { getMajorityDate } from "../../../../../utils/tb/helpers/getMajorityDate"

export const extraManager = (
  form: TUManager,
  formSubmitFields: TBlock["groups"][number],
  errors: TErrorsCheck,
  handleDeleteCondominium: (condominium: TCondominium) => void
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
                error: {
                  has: errors.fields.includes("phone1"),
                  message: "Telefone obrigatório",
                },
              },
              {
                type: "input",
                label: "Celular com DDD",
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
                error: {
                  has: errors.fields.includes("documentType"),
                  message: "Selecione um documento",
                },
              },
              {
                type: "input",
                field: "documentNumber",
                label: "Nº do documento",
                value: formatCpf(form.documentNumber ?? ""),
                placeholder: "000.000.000-00",
                gridSizes: { big: 6, small: 12 },
                error: {
                  has: errors.fields.includes("documentNumber"),
                  message: "Digite um documento válido",
                },
              },
              {
                type: "date",
                field: "birthDate",
                label: "Data de nascimento",
                value: new Date(form.birthDate),
                gridSizes: { big: 3, small: 12 },
                maxDate: getMajorityDate(),
                error: {
                  has: errors.fields.includes("birthDate"),
                  message: "Escolha uma data",
                },
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
              field: "managerSince",
              value: String(form.managerSince),
              options: systemOptions.managerTime,
              gridSizes: { big: 12 },
              error: {
                has: errors.fields.includes("managerSince"),
                message: "Escolha um período",
              },
            },
          ],
        },
        {
          type: "custom",
          element: (
            <List.Condos
              title="Condomínios vinculados a este síndico"
              list={form.condominiums ?? []}
              handleAdd={() => {}}
              handleDelete={handleDeleteCondominium}
            />
          ),
        },

        formSubmitFields,
      ],
    },
  ]

  return content
}
