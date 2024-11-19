import { useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"
import { systemOptions } from "../../../utils/system/options"

import { TNewUser, TUser } from "../../../utils/@types/data/user"
import { TForm } from "../../../utils/@types/components/Form"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { List } from "../../../components/List"
import { TAccess } from "../../../utils/@types/data/access"
import { formatPhone } from "../../../utils/tb/format/phone"
import { formatCep } from "../../../utils/tb/format/cep"
import { formatCNPJ } from "../../../utils/tb/format/cnpj"
import { formatCpf } from "../../../utils/tb/format/cpf"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import { Icons } from "../../../assets/icons/icons"
import { fdata } from "../../../utils/_dev/falseData"

const FPpeople = () => {
  const navigate = useNavigate()

  const [personType, setPersonType] = useState<TAccess>("admin")

  const [form, setForm] = useState<TUser | TNewUser>(
    initials.forms.person[personType]
  )
  const [options, setOptions] = useState<any>({
    company: [],
    department: [],
    level: [],
    leader: [],
    profile: [],
    status: [],
    country: [],
    state: [],
    franchises: [],
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    // ...
  }

  const handleField = async (field: string, value: any) => {
    if (field === "profile") {
      setForm(initials.forms.person[value as TAccess])
      setPersonType(value)
    } else {
      setForm((p) => ({ ...p, [field]: value }))
    }
  }

  useEffect(() => {
    setOptions((opts: any) => ({
      ...opts,
      profile: systemOptions.profiles,
      status: [
        { key: "lala1", value: "Líder 1" },
        { key: "lala2", value: "Líder 2" },
        { key: "lala3", value: "Líder 3" },
        { key: "lala4", value: "Líder 4" },
        { key: "lala5", value: "Líder 5" },
      ],
      country: [{ key: "br", value: "Brasil" }],
      state: systemOptions.states,
    }))
  }, [])

  /*
   *  Fields render
   */

  const renderBasicFields = () => {
    let content: TForm["blocks"][number]["groups"] = []

    switch (form.profile) {
      case "admin":
      case "manager":
        content = [
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
                },
                {
                  type: "input",
                  field: "surname",
                  label: "Sobrenome",
                  value: form.surname,
                  placeholder: "Digite aqui",
                  gridSizes: { big: 6, small: 12 },
                },
              ],
            ],
          },
          {
            type: "fields",
            fields: [
              {
                type: "input",
                field: "email",
                label: "Email",
                value: form.email,
                placeholder: "Digite aqui",
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
                field: "image",
                value: form.image,
                gridSizes: { big: 12 },
              },
            ],
          },
        ]
        break

      case "branch":
        content = [
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
                  gridSizes: { big: 12 },
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
                  label: "País",
                  placeholder: "País",
                  field: "country",
                  value: form.address?.country ?? "",
                  options: options.country,
                  gridSizes: { big: 3, small: 6 },
                  elevation: 10,
                },
                {
                  type: "select",
                  label: "Estado",
                  placeholder: "Estado",
                  field: "state",
                  value: form.address?.state ?? ("" as string),
                  options: options.state,
                  gridSizes: { big: 3, small: 6 },
                },
                {
                  type: "input",
                  field: "city",
                  label: "Nome da cidade",
                  value: form.address?.city ?? "",
                  placeholder: "Digite aqui",
                  gridSizes: { big: 6, small: 12 },
                },
              ],
              [
                {
                  type: "input",
                  field: "street",
                  label: "Endereço",
                  value: form.address?.street ?? "",
                  placeholder: "Digite aqui",
                  gridSizes: { big: 8, small: 7 },
                },
                {
                  type: "input",
                  field: "number",
                  label: "Número",
                  value: form.address?.number ?? "",
                  placeholder: "0",
                  gridSizes: { big: 4, small: 5 },
                },
              ],
              [
                {
                  type: "input",
                  field: "complement",
                  label: "Complemento",
                  value: form.address?.complement ?? "",
                  placeholder: "Digite aqui",
                  gridSizes: { big: 8, small: 7 },
                },
                {
                  type: "input",
                  field: "cep",
                  label: "CEP",
                  value: formatCep(form.address?.cep ?? ""),
                  placeholder: "00000-000",
                  gridSizes: { big: 4, small: 5 },
                },
              ],
            ],
          },
          {
            type: "fields",
            fields: [
              {
                type: "input",
                field: "email",
                label: "Email",
                value: form.email,
                placeholder: "Digite aqui",
                gridSizes: { big: 12 },
              },
            ],
          },
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
                  gridSizes: { big: 6, small: 6 },
                },
                {
                  type: "input",
                  label: "Telefone 2",
                  field: "phone2",
                  value: formatPhone(form.phone2),
                  placeholder: "00 00000-0000",
                  gridSizes: { big: 6, small: 6 },
                },
              ],
              {
                type: "profile",
                label: "Imagem de perfil",
                field: "image",
                value: form.image,
                gridSizes: { big: 12 },
              },
            ],
          },
        ]
        break

      case "provider":
        content = [
          {
            type: "custom",
            element: (() => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
                  width: "100%",
                  alignItems: "end",
                  gap: 16,
                }}
              >
                <Input.Select
                  value={""}
                  label="Selecione as franquias"
                  options={options.franchises}
                  field="franchises"
                  onChange={handleField}
                  gridSizes={{ big: 9, small: 12 }}
                />
                <div style={{ gridColumn: `span 3`, paddingBottom: 2 }}>
                  <Button
                    type="main"
                    action={() => {}}
                    text="Editar franquia"
                    icon={<Icons.Edit />}
                    iconLeft={true}
                  />
                </div>
              </div>
            ))(),
          },
          {
            type: "custom",
            element: (() => {
              const content = form.franchises.map((f) => {
                const franchiseData = fdata.people
                  .filter((i) => i.profile === "franchise")
                  .find((i) => i.id === f)

                return (
                  <div
                    style={{
                      padding: 6,
                      borderRadius: 18,
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      cursor: "pointer",
                    }}
                  >
                    <span>{franchiseData?.name}</span>
                    <Icons.Close width={8} height={8} />
                  </div>
                ) as JSX.Element
              })

              return (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {content}
                </div>
              )
            })(),
          },
          {
            type: "fields",
            title: "Identidade do prestador",
            fields: [
              [
                {
                  type: "logo",
                  field: "image",
                  value: form.image,
                  gridSizes: { big: 3, small: 12 },
                },
                {
                  type: "input",
                  label: "Nome fantasia",
                  field: "fantasyName",
                  value: form.fantasyName,
                  gridSizes: { big: 9, small: 12 },
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
                  label: "País",
                  placeholder: "País",
                  field: "country",
                  value: form.address?.country ?? "",
                  options: options.country,
                  gridSizes: { big: 3, small: 6 },
                  elevation: 10,
                },
                {
                  type: "select",
                  label: "Estado",
                  placeholder: "Estado",
                  field: "state",
                  value: form.address?.state ?? ("" as string),
                  options: options.state,
                  gridSizes: { big: 3, small: 6 },
                },
                {
                  type: "input",
                  field: "city",
                  label: "Nome da cidade",
                  value: form.address?.city ?? "",
                  placeholder: "Digite aqui",
                  gridSizes: { big: 6, small: 12 },
                },
              ],
              [
                {
                  type: "input",
                  field: "street",
                  label: "Endereço",
                  value: form.address?.street ?? "",
                  placeholder: "Digite aqui",
                  gridSizes: { big: 8, small: 7 },
                },
                {
                  type: "input",
                  field: "number",
                  label: "Número",
                  value: form.address?.number ?? "",
                  placeholder: "0",
                  gridSizes: { big: 4, small: 5 },
                },
              ],
              [
                {
                  type: "input",
                  field: "complement",
                  label: "Complemento",
                  value: form.address?.complement ?? "",
                  placeholder: "Digite aqui",
                  gridSizes: { big: 8, small: 7 },
                },
                {
                  type: "input",
                  field: "cep",
                  label: "CEP",
                  value: formatCep(form.address?.cep ?? ""),
                  placeholder: "00000-000",
                  gridSizes: { big: 4, small: 5 },
                },
              ],
            ],
          },
        ]
        break
      default:
        break
    }

    return content
  }

  const renderBlocks = () => {
    let content: TForm["blocks"] = []

    switch (form.profile) {
      case "admin":
        content = [
          {
            title: "Informações do perfil",
            groups: [
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
                    },
                    {
                      type: "input",
                      field: "register",
                      label: "Nº do documento",
                      value: form.document.register,
                      placeholder: "000.000.000-00",
                      gridSizes: { big: 6, small: 12 },
                    },
                    {
                      type: "date",
                      field: "documentDate",
                      label: "Data de nascimento",
                      value: form.surname,
                      gridSizes: { big: 3, small: 12 },
                    },
                  ],
                ],
              },
              {
                type: "custom",
                element: (
                  <FormDefaultButtons
                    handleCancel={() => {}}
                    handleDelete={() => {}}
                    handleSave={() => {}}
                  />
                ),
              },
            ],
          },
        ]
        break
      case "manager":
        content = [
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
                    },
                    {
                      type: "input",
                      label: "Celular com DDD",
                      field: "phone2",
                      value: formatPhone(form.phone2),
                      placeholder: "00 00000-0000",
                      gridSizes: { big: 6, small: 6 },
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
                    },
                    {
                      type: "input",
                      field: "register",
                      label: "Nº do documento",
                      value: form.document.register,
                      placeholder: "000.000.000-00",
                      gridSizes: { big: 6, small: 12 },
                    },
                    {
                      type: "date",
                      field: "documentDate",
                      label: "Data de nascimento",
                      value: form.surname,
                      gridSizes: { big: 3, small: 12 },
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
                    field: "experience",
                    value: form.experience,
                    options: systemOptions.managerTime,
                    gridSizes: { big: 12 },
                  },
                ],
              },
              {
                type: "custom",
                element: (
                  <List.Condos
                    title="Condomínios vinculados a este síndico"
                    list={form.condos ?? []}
                    handleAdd={() => {}}
                    handleDelete={() => {}}
                  />
                ),
              },
              {
                type: "custom",
                element: (
                  <FormDefaultButtons
                    handleCancel={() => {}}
                    handleDelete={() => {}}
                    handleSave={() => {}}
                  />
                ),
              },
            ],
          },
        ]
        break
      case "branch":
        content = [
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
                                value: form.responsable.inscriptionState,
                                placeholder: "Apenas números",
                                gridSizes: { big: 6, small: 12 },
                              },
                              {
                                type: "input",
                                field: "responsableInscriptionCity",
                                label: "Inscrição municipal",
                                value: form.responsable.inscriptionCity,
                                placeholder: "Apenas números",
                                gridSizes: { big: 6, small: 12 },
                              },
                            ],
                          ]
                        : [
                            {
                              type: "input",
                              field: "responsableName",
                              label: "Pessoa responsável",
                              value: form.responsable.name,
                              placeholder: "Informe o nome da pessoa",
                              gridSizes: { big: 12 },
                            },
                            {
                              type: "date",
                              field: "responsableRegister",
                              label: "CPF",
                              value: formatCpf(form.responsable.register),
                              gridSizes: { big: 12 },
                            },
                          ]),
                    ]
                  : [],
              },
              {
                type: "custom",
                element: (
                  <FormDefaultButtons
                    handleCancel={() => {}}
                    handleDelete={() => {}}
                    handleSave={() => {}}
                  />
                ),
              },
            ],
          },
        ]
        break

      case "provider":
        content = [
          {
            title: "Informações Comerciais",
            groups: [
              {
                type: "fields",
                fields: [
                  {
                    type: "input",
                    field: "responsableName",
                    label: "Razão social",
                    value: form.socialRole,
                    placeholder: "Informe a razão social",
                    gridSizes: { big: 12 },
                  },
                  [
                    {
                      type: "input",
                      field: "cnpj",
                      label: "CNPJ",
                      value: formatCNPJ(form.document.register),
                      placeholder: "00.000.000/0001-00",
                      gridSizes: { big: 6, small: 12 },
                    },
                    {
                      type: "date",
                      field: "documentDate",
                      label: "Data de abertura da empresa",
                      value: form.document.date,
                      gridSizes: { big: 6, small: 12 },
                    },
                  ],
                  // {
                  //   type: "file",
                  //   field: "cnpjCard",
                  //   label: "Cartão CNPJ",
                  //   value: form.cnpjCard,
                  //   gridSizes: { big: 6, small: 12 },
                  // },
                ],
              },
            ],
          },
        ]
        break
      case "franchise":
        content = [
          {
            title: "Regiões e cidades",
            groups: [],
          },
        ]
        break
      default:
        break
    }

    return content
  }

  return (
    <C.Content className="falseSubContentWrapper">
      <PageHeader type={"breadcrumb"} from={"users"} forForm={true} />

      <Form
        handleField={handleField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        blocks={[
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
                      field: "active",
                      value: form.active,
                      hasTopSpace: true,
                    },
                  ],
                ],
              },
              ...renderBasicFields(),
            ],
            ...renderBlocks(),
          },
          ...renderBlocks(),
        ]}
      />
    </C.Content>
  )
}

export default FPpeople
