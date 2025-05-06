import { List } from "../../../../../components/List"
import { TBlock } from "../../../../../utils/@types/components/Form"
import { FormField } from "../../../../../utils/@types/components/FormFields"
import { TCondominium } from "../../../../../utils/@types/data/condominium"
import { TOption } from "../../../../../utils/@types/data/option"
import { TUManager } from "../../../../../utils/@types/data/user"
import { TErrorsCheck } from "../../../../../utils/@types/helpers/checkErrors"
import { systemOptions } from "../../../../../utils/system/options"
import { formatCNPJ } from "../../../../../utils/tb/format/cnpj"
import { formatCpf } from "../../../../../utils/tb/format/cpf"
import { formatPhone } from "../../../../../utils/tb/format/phone"
import { getMajorityDate } from "../../../../../utils/tb/helpers/getMajorityDate"

export const extraManager = (
  form: TUManager,
  formSubmitFields: TBlock["groups"][number],
  errors: TErrorsCheck,
  handleAddCondominium: () => void,
  handleDeleteCondominium: (condominium: TCondominium) => void,
  options: { [key: string]: TOption[] },
  isEditing?: boolean
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
              ...((isEditing
                ? [
                    ...(form.documentType === "cpf"
                      ? [
                          {
                            type: "readonly",
                            label: "Documento",
                            field: "documentType",
                            value: form.documentType.toUpperCase(),
                            gridSizes: { big: 3, small: 12 },
                            error: {
                              has: false,
                              message: "Escolha um documento",
                            },
                          },
                        ]
                      : [
                          {
                            type: "readonly",
                            label: "Documento",
                            field: "documentType",
                            value: form.documentType.toUpperCase(),
                            gridSizes: { big: 3, small: 12 },
                            error: {
                              has: false,
                              message: "Escolha um documento",
                            },
                          },
                        ]),
                  ]
                : [
                    {
                      type: "select",
                      label: "Documento",
                      field: "documentType",
                      value: form.documentType,
                      options: [
                        { key: "cpf", value: "CPF" },
                        { key: "cnpj", value: "CNPJ" },
                      ],
                      gridSizes: { big: 3, small: 12 },
                      error: {
                        has: errors.fields.includes("documentType"),
                        message: "Selecione um documento",
                      },
                    },
                  ]) as FormField[]),
              ...((isEditing
                ? [
                    {
                      type: "readonly",
                      label: "Nº do documento",
                      field: "documentNumber",
                      value:
                        form.documentType === "cpf"
                          ? formatCpf(form.documentNumber ?? "")
                          : formatCNPJ(form.documentNumber ?? ""),
                      gridSizes: { big: 6, small: 12 },
                      error: {
                        has: false,
                        message: "Digite um documento válido",
                      },
                    },
                  ]
                : [
                    {
                      type: "input",
                      field: "documentNumber",
                      label: "Nº do documento",
                      value:
                        form.documentType === "cpf"
                          ? formatCpf(form.documentNumber ?? "")
                          : formatCNPJ(form.documentNumber ?? ""),
                      placeholder:
                        form.documentType === "cpf"
                          ? "000.000.000-00"
                          : "00.000.000/0000-00",
                      gridSizes: { big: 6, small: 12 },
                      error: {
                        has: errors.fields.includes("documentNumber"),
                        message: "Digite um documento válido",
                      },
                    },
                  ]) as FormField[]),
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
          type: "fields",
          title: "Tags",
          fields: [
            {
              type: "toggler",
              label: "Possui tag",
              field: "isUserFlag",
              value: form.isUserFlag,
              hasTopSpace: true,
            },
            ...((form.isUserFlag
              ? [
                  {
                    type: "select",
                    label: "Selecione a tag",
                    field: "tagId",
                    value: form.tagId,
                    options: options.tags,
                    gridSizes: { big: 12 },
                    error: {
                      has: errors.fields.includes("tagId"),
                      message: "Escolha uma tag",
                    },
                  },
                ]
              : []) as FormField[]),
          ],
        },
        {
          type: "custom",
          element: (
            <List.Condos
              title="Condomínios vinculados a este síndico"
              list={form.condominiums ?? []}
              handleAdd={handleAddCondominium}
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
