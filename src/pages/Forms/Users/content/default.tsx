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
import { useCallback, useEffect, useState } from "react"
import { checkProviderPendencyStatus } from "../../../../utils/tb/helpers/checkProviderPendencyStatus"
import { TErrorsCheck } from "../../../../utils/@types/helpers/checkErrors"

type Props = {
  handleField: (field: string, value: any) => void
  handleCancel: (params?: any) => void
  handleSave: (form: any) => Promise<void>

  options: { [key: string]: TOption[] }
  form: any

  personType: TAccess

  renderBasic: () => TForm["columns"][number]["blocks"][number]["groups"]
  renderExtra: () => TForm["columns"][number]["blocks"]

  errors: TErrorsCheck
  extra?: any
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

    errors,
    extra,
  } = props

  const [extraSelf, setExtraSelf] = useState(extra)

  const updateExtraSelf = useCallback(() => {
    if (extra.profile !== extraSelf.profile) setExtraSelf(extra)
  }, [extra, extraSelf.profile])

  useEffect(() => {
    updateExtraSelf()
  }, [extra, updateExtraSelf])

  return (
    <C.Content className="falseSubContentWrapper">
      <PageHeader
        type={"breadcrumb"}
        from={"users"}
        extra={extraSelf}
        forForm={true}
      />

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
                    centeredLines: [1],
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
                                    label: "Loja",
                                    field: "franqId",
                                    value: `${user?.name} (Você)`,
                                    gridSizes: { big: 12 },
                                  } as FormField,
                                ]
                              : [
                                  {
                                    type: "select",
                                    label: "Loja",
                                    placeholder: "Selecione a loja",
                                    field: "franqId",
                                    value: form.franqId ?? "",
                                    options: options.franchise,
                                    gridSizes: { big: 12 },
                                    elevation: 10,
                                    error: {
                                      has: errors.fields.includes("franqId"),
                                      message: "Selecione uma loja",
                                    },
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
                                  value={checkProviderPendencyStatus({
                                    isent: form.federalCndFree,
                                    start: form.federalCndStart,
                                    end: form.federalCndEnd,
                                    register: form.federalCnd,
                                  })}
                                />
                                <ProviderLegalization
                                  label={"CND Estadual"}
                                  value={checkProviderPendencyStatus({
                                    isent: form.stateCndFree,
                                    start: form.stateCndStart,
                                    end: form.stateCndEnd,
                                    register: form.stateCnd,
                                  })}
                                />
                                <ProviderLegalization
                                  label={"CND Municipal"}
                                  value={checkProviderPendencyStatus({
                                    isent: form.cityCndFree,
                                    start: form.cityCndStart,
                                    end: form.cityCndEnd,
                                    register: form.cityCnd,
                                  })}
                                />
                                <ProviderLegalization
                                  label={"FGTS"}
                                  value={checkProviderPendencyStatus({
                                    isent: form.fgtsCndFree,
                                    start: form.fgtsCndStart,
                                    end: form.fgtsCndEnd,
                                    register: form.fgtsCnd,
                                  })}
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
