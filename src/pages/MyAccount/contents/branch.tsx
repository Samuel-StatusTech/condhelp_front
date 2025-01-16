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

const MyAccountBranch = (props: Props) => {
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
                          field: "name",
                          label: "Nome da Filial",
                          value: form.name,
                          placeholder: "Digite aqui",
                          gridSizes: { big: 3, small: 12 },
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
                          label: "Telefone 1",
                          field: "phone1",
                          value: formatPhone(form.phone1),
                          placeholder: "00 00000-0000",
                          gridSizes: { big: 3, small: 6 },
                        },
                        {
                          type: "input",
                          label: "Telefone 2",
                          field: "phone2",
                          value: formatPhone(form.phone2),
                          placeholder: "00 00000-0000",
                          gridSizes: { big: 3, small: 6 },
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

export default MyAccountBranch
