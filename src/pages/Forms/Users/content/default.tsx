import { useParams } from "react-router-dom"
import Form from "../../../../components/Form"
import PageHeader from "../../../../components/PageHeader"
import ProviderLegalization from "../../../../components/ProviderLegalization"
import { getStore } from "../../../../store"
import { TBlock, TForm } from "../../../../utils/@types/components/Form"
import { FormField } from "../../../../utils/@types/components/FormFields"
import { TAccess } from "../../../../utils/@types/data/access"
import { TOption } from "../../../../utils/@types/data/option"
import * as C from "../../styled"
import { profileRelation } from "../../../../utils/@types/data/user"

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
  const params = useParams()

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
                        ...((params && params.id
                          ? [
                              {
                                type: "readonly",
                                label: "Perfil",
                                field: "profile",
                                options: options.profile,
                                value: profileRelation[form.profile as TAccess],
                                gridSizes: { big: 10, small: 7 },
                              },
                            ]
                          : [
                              {
                                type: "select",
                                label: "Perfil",
                                field: "profile",
                                options: options.profile,
                                value: form.profile,
                                gridSizes: { big: 10, small: 7 },
                              },
                            ]) as FormField[]),
                        {
                          type: "toggler",
                          label: "Ativo",
                          field: "status",
                          value: form.status === "ATIVO",
                          hasTopSpace: true,
                        },
                      ],
                      ...((["SINDICO", "PRESTADOR"] as TAccess[]).includes(
                        personType
                      ) &&
                      (["ADMIN", "FILIAL", "FRANQUEADO"] as TAccess[]).includes(
                        user?.profile as TAccess
                      )
                        ? params && params.id !== undefined
                          ? []
                          : ((user?.profile === "FRANQUEADO"
                              ? [
                                  {
                                    type: "readonly",
                                    label: "Franquia",
                                    field: "franqId",
                                    value: `${user?.name} (Você)`,
                                    gridSizes: { big: 12 },
                                  } as FormField,
                                ]
                              : [
                                  {
                                    type: "select",
                                    label: "Franquia",
                                    placeholder: "Selecione a franquia",
                                    field: "franqId",
                                    value: form.franqId ?? "",
                                    options: options.franchise,
                                    gridSizes: { big: 12 },
                                    elevation: 10,
                                  },
                                ]) as FormField[])
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
