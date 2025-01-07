import Form from "../../../../components/Form"
import PageHeader from "../../../../components/PageHeader"
import ProviderLegalization from "../../../../components/ProviderLegalization"
import { getStore } from "../../../../store"
import { TBlock, TForm } from "../../../../utils/@types/components/Form"
import { FormField } from "../../../../utils/@types/components/FormFields"
import { TAccess } from "../../../../utils/@types/data/access"
import { TOption } from "../../../../utils/@types/data/option"
import * as C from "../../styled"

type Props = {
  handleField: (field: string, value: any) => void
  handleCancel: (params?: any) => void
  handleSave: (form: any) => Promise<void>

  options: { [key: string]: TOption[] }
  form: any

  personType: TAccess

  renderBasic: () => TForm["columns"][number]["blocks"][number]["groups"]
  renderExtra: () => TForm["columns"][number]["blocks"]
}

export const DefaultContent = (props: Props) => {
  const { user } = getStore()

  const {
    handleField,
    handleCancel,
    handleSave,

    options,
    form,

    personType,

    renderBasic,
    renderExtra,
  } = props

  return (
    <C.Content className="falseSubContentWrapper">
      <PageHeader type={"breadcrumb"} from={"users"} forForm={true} />

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
                    // eslint-disable-next-line no-sparse-arrays
                    fields: [
                      [
                        {
                          type: "select",
                          label: "Perfil",
                          field: "profile",
                          options: options.profile,
                          value: form.profile,
                          gridSizes: { big: 10, small: 7 },
                        },
                        {
                          type: "toggler",
                          label: "Ativo",
                          field: "status",
                          value: form.status === "ATIVO",
                          hasTopSpace: true,
                        },
                      ],
                      ...(personType === "SINDICO" &&
                      (["ADMIN", "FILIAL"] as TAccess[]).includes(
                        user?.profile as TAccess
                      )
                        ? [
                            {
                              type: "select",
                              label: "Franquia",
                              field: "franqId",
                              options: options.franchise,
                              value: form.franqId,
                              gridSizes: { big: 12 },
                            } as FormField,
                          ]
                        : []),
                    ],
                  },
                  ...renderBasic(),
                ],
              },
              ...((form.profile === "PRESTADOR"
                ? [
                    {
                      title: "STATUS DA DOCUMENTAÇÃO (INTEGRAÇÃO API)",
                      isWhite: true,
                      groups: [
                        {
                          type: "custom",
                          element: (() => {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  maxWidth: 320,
                                }}
                              >
                                <ProviderLegalization
                                  label={"CND Federal"}
                                  value={"free"}
                                />
                                <ProviderLegalization
                                  label={"CND Estadual"}
                                  value={"free"}
                                />
                                <ProviderLegalization
                                  label={"CND Municipal"}
                                  value={"free"}
                                />
                                <ProviderLegalization
                                  label={"FGTS"}
                                  value={"free"}
                                />
                              </div>
                            )
                          })(),
                        },
                      ],
                    },
                  ]
                : []) as TBlock[]),
            ],
          },
          {
            blocks: [...renderExtra()],
          },
        ]}
      />
    </C.Content>
  )
}
