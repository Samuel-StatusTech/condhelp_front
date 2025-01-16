import * as C from "../styled"

import Form from "../../../components/Form"
import PageHeader from "../../../components/PageHeader"
import { TBlock } from "../../../utils/@types/components/Form"
import { formatPhone } from "../../../utils/tb/format/phone"

type Props = {
  handleField: (field: string, value: any) => void
  handleCancel: (params?: any) => void
  handleSave: (form: any) => Promise<void>
  form: any
  formSubmitFields: TBlock["groups"][number]
}

const MyAccountProvider = (props: Props) => {
  const {
    handleField,
    handleCancel,
    handleSave,

    form,
    formSubmitFields,
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
                          label: "Nome fantasia",
                          field: "name",
                          value: form.name,
                          placeholder: "Informe o nome fantasia",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "socialRole",
                          label: "Razão social",
                          value: form.socialRole,
                          placeholder: "Informe a razão social",
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
                      {
                        type: "profile",
                        label: "Imagem de perfil",
                        field: "image",
                        value: form.image,
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
                          field: "responsable",
                          label: "Nome do responsável",
                          value: form.responsable,
                          placeholder: "Nome do responsável",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "website",
                          label: "Website",
                          value: form.website,
                          placeholder: "Website",
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
                      [
                        {
                          type: "input",
                          field: "phone1",
                          label: "Telefone principal com DDD",
                          value: formatPhone(form.phone1),
                          placeholder: "00 00000-0000",
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
                      [
                        {
                          type: "input",
                          field: "phone2",
                          label: "Telefone 2",
                          value: formatPhone(form.phone2),
                          placeholder: "00 00000-0000",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "phone3",
                          label: "Telefone 3",
                          value: formatPhone(form.phone3),
                          placeholder: "00 00000-0000",
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
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

export default MyAccountProvider
