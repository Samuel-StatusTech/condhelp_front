import * as C from "../styled"

import Form from "../../../components/Form"
import PageHeader from "../../../components/PageHeader"
import { TBlock } from "../../../utils/@types/components/Form"
import { formatPhone } from "../../../utils/tb/format/phone"
import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"
import { systemOptions } from "../../../utils/system/options"
import { getMajorityDate } from "../../../utils/tb/helpers/getMajorityDate"
import { formatCpf } from "../../../utils/tb/format/cpf"

type Props = {
  handleField: (field: string, value: any) => void
  handleCancel: (params?: any) => void
  handleSave: (form: any) => Promise<void>
  form: any
  formSubmitFields: TBlock["groups"][number]

  errors: TErrorsCheck
}

const MyAccountManager = (props: Props) => {
  const {
    handleField,
    handleCancel,
    handleSave,

    form,
    formSubmitFields,

    errors,
  } = props

  return (
    <C.Content className="falseSubContentWrapper">
      <PageHeader type={"breadcrumb"} from={"myaccount"} forForm={true} />

      <Form
        handleField={handleField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        columns={[
          {
            blocks: [
              {
                title: "Informações básicas",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      [
                        {
                          type: "input",
                          field: "name",
                          label: "Nome",
                          value: form.name,
                          placeholder: "Digite aqui",
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: errors.fields.includes("name"),
                            message: "Digite um nome",
                          },
                        },
                        {
                          type: "input",
                          field: "surname",
                          label: "Sobrenome",
                          value: form.surname,
                          placeholder: "Digite aqui",
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: errors.fields.includes("surname"),
                            message: "Digite um sobrenome",
                          },
                        },
                      ],
                    ],
                  },
                  {
                    type: "fields",
                    fields: [
                      {
                        type: "readonly",
                        label: "Email",
                        field: "email",
                        value: form.email,
                        gridSizes: { big: 12 },
                      },
                    ],
                  },
                  {
                    type: "fields",
                    fields: [
                      {
                        type: "profile",
                        label: "Imagem de perfil",
                        field: "photo",
                        value: form.photo,
                        gridSizes: { big: 6, small: 12 },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            blocks: [
              {
                title: "Informações de contato",
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
                          type: "readonly",
                          field: "documentNumber",
                          label: "Nº do documento",
                          value: formatCpf(form.documentNumber ?? ""),
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: false,
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
                  formSubmitFields,
                ],
              },
            ],
          },
        ]}
      />
    </C.Content>
  )
}

export default MyAccountManager
