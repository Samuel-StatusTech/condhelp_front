import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"
import { systemOptions } from "../../../utils/system/options"

import { TBlock } from "../../../utils/@types/components/Form"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { TAccess } from "../../../utils/@types/data/access"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"

import { Api } from "../../../api"
import { TNewUser, TUser } from "../../../utils/@types/data/user"
import { getStore } from "../../../store"
import { TOption } from "../../../utils/@types/data/option"
import { formPartials } from "./partials"

const FPpeople = () => {
  const navigate = useNavigate()
  const params = useParams()

  const { controllers } = getStore()

  const [personType, setPersonType] = useState<TAccess>("ADMIN")

  const [form, setForm] = useState<any>(initials.forms.person[personType])
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
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

  const handleField = async (field: string, value: any) => {
    if (field === "status") {
      console.log(value)
      setForm((frm: any) => ({ ...frm, status: value ? "ATIVO" : "INATIVO" }))
    } else if (field === "profile") {
      setForm(initials.forms.person[value as TAccess])
      setPersonType(value)
    } else if (
      [
        "country",
        "state",
        "city",
        "street",
        "number",
        "complement",
        "cep",
      ].includes(field)
    ) {
      setForm((p: any) => ({
        ...p,
        // @ts-ignore
        address: { ...p.address, [field]: value },
      }))
    } else {
      switch (form.profile) {
        case "ADMIN":
          switch (field) {
            case "documentRegister":
              setForm((p: any) => ({
                ...p,
                // @ts-ignore
                document: { ...p.document, register: value },
              }))
              break
            case "documentDate":
              setForm((p: any) => ({
                ...p,
                // @ts-ignore
                document: { ...p.document, date: value },
              }))
              break

            default:
              setForm((p: any) => ({ ...p, [field]: value }))
              break
          }

          if (Object.keys(form.document).includes(field)) {
          }
          break

        case "FILIAL":
          const responsableKeys = [
            "responsableType",
            "responsableName",
            "responsableFantasyName",
            "responsableRegister",
            "responsableInscriptionState",
            "responsableInscriptionCity",
          ]
          if (responsableKeys.includes(field)) {
            const fieldKey = field.split("responsable")[1]
            const fieldName =
              fieldKey.charAt(0).toLowerCase() + fieldKey.slice(1)

            if (fieldName === "type") {
              if (value === "cpf") {
                setForm((p: any) => ({
                  ...p,
                  responsable: {
                    type: value,
                    fantasyName: "",
                    inscriptionCity: "",
                    inscriptionState: "",
                    name: p.responsable.name,
                    register: p.responsable.register,
                  },
                }))
              } else {
                setForm((p: any) => ({
                  ...p,
                  // @ts-ignore
                  responsable: { ...p.responsable, [fieldName]: value },
                }))
              }
            } else {
              setForm((p: any) => ({
                ...p,
                // @ts-ignore
                responsable: { ...p.responsable, [fieldName]: value },
              }))
            }
          } else setForm((p: any) => ({ ...p, [field]: value }))
          break

        case "SINDICO":
        case "PRESTADOR":
          switch (field) {
            case "documentRegister":
              setForm((p: any) => ({
                ...p,
                // @ts-ignore
                document: { ...p.document, register: value },
              }))
              break
            case "documentDate":
              setForm((p: any) => ({
                ...p,
                document: { ...p.document, date: value },
              }))
              break

            // TODO: condos insert case

            default:
              setForm((p: any) => ({ ...p, [field]: value }))
              break
          }

          break

        default:
          break
      }

      setForm((p: any) => ({ ...p, [field]: value }))
    }
  }

  const handleCreate = async () => {
    try {
      // await userAccountCreate()

      const req = await Api.persons.create({
        newPerson: form as TNewUser,
      })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Região criada com sucesso",
        })

        navigate("/dashboard/regions")
      }
    } catch (error) {
      // ...
    }
  }

  const handleSave = async () => {
    try {
      if (params.id) handleUpdate()
      else handleCreate()
    } catch (error) {
      // ...
    }
  }

  const handleDelete = async () => {
    try {
      const req = await Api.regions.delete({ id: Number(params.id) })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Usuário excluído",
        })

        navigate("/dashboard/users")
      }
    } catch (error) {
      // ...
    }
  }

  const getObj = () => {
    return {
      ...(form as TUser),
      status: form.status ? "ATIVO" : "INATIVO",
      id: params.id ?? "",
    }
  }

  const handleUpdate = async () => {
    try {
      const obj = getObj()

      const req = await Api.persons.update({
        person: obj as any,
      })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Usuário atualizado com sucesso",
        })

        navigate("/dashboard/users")
      }
    } catch (error) {
      // ...
    }
  }

  const loadData = useCallback(async () => {
    try {
      const countriesReq = await Api.countries.listAll({}).then((res) => {
        if (res.ok) {
          setOptions((opts) => ({
            ...opts,
            country: parseOptionList(res.data.content, "id", "name"),
          }))
        } else {
          controllers.feedback.setData({
            message:
              "Houve um erro ao carregar informações para cadastro. Tente novamente mais tarde.",
            state: "error",
            visible: true,
          })
          navigate(-1)
        }
      })
      const statesReq = await Api.states.listAll({}).then((res) => {
        if (res.ok) {
          setOptions((opts) => ({
            ...opts,
            state: parseOptionList(res.data.content, "id", "name"),
          }))
        } else {
          controllers.feedback.setData({
            message:
              "Houve um erro ao carregar informações para cadastro. Tente novamente mais tarde.",
            state: "error",
            visible: true,
          })
          navigate(-1)
        }
      })

      await Promise.all([countriesReq, statesReq]).catch((err) => {
        controllers.feedback.setData({
          message:
            "Houve um erro ao carregar informações para cadastro. Tente novamente mais tarde.",
          state: "error",
          visible: true,
        })
        navigate(-1)
      })

      if (params.id) {
        const req = await Api.persons.getSingle({ id: Number(params.id) })

        if (req.ok) {
          const hasInfo = req.data.profile && req.data.email

          setForm((fm: any) => ({
            ...fm,
            ...(hasInfo
              ? req.data
              : {
                  ...req.data,
                  profile: "SINDICO",
                  responsable: {
                    type: "cpf",
                    register: "",
                  },
                }),
          }))
        } else {
          controllers.feedback.setData({
            message: req.error,
            state: "error",
            visible: true,
          })
        }
      }
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações do usuário.",
        state: "error",
        visible: true,
      })
    }
  }, [controllers.feedback, navigate, params.id])

  useEffect(() => {
    // ...
    loadData()
  }, [loadData])

  useEffect(() => {
    setOptions((opts: any) => ({
      ...opts,
      profile: systemOptions.profiles,
      country: [{ key: "br", value: "Brasil" }],
      state: systemOptions.states,
    }))
  }, [])

  /*
   *  Fields render
   */

  const formSubmitFields: TBlock["groups"][number] = {
    type: "custom",
    element: (
      <FormDefaultButtons
        handleDelete={handleDelete}
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    ),
  }

  const renderBasicFields = () => {
    let content: TBlock["groups"] = []

    switch (form.profile) {
      case "ADMIN":
        content = formPartials.admin.basic({ form })
        break

      case "FILIAL":
        content = formPartials.branch.basic({ form, options })
        break

      case "FRANQUEADO":
        content = formPartials.franchise.basic({ form })
        break

      case "SINDICO":
        content = formPartials.manager.basic({ form })
        break

      case "PRESTADOR":
        content = formPartials.provider.basic({ form, options, handleField })
        break

      default:
        break
    }

    return content
  }

  const renderBlocks = () => {
    let content: TBlock[] = []

    switch (form.profile) {
      case "ADMIN":
        content = formPartials.admin.extra(form, formSubmitFields)
        break

      case "FILIAL":
        content = formPartials.branch.extra(form, formSubmitFields)
        break

      case "FRANQUEADO":
        content = formPartials.franchise.extra(form, formSubmitFields)
        break

      case "SINDICO":
        content = formPartials.manager.extra(form, formSubmitFields)
        break

      case "PRESTADOR":
        content = formPartials.provider.extra(form, formSubmitFields)
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
                    ],
                  },
                  ...renderBasicFields(),
                ],
              },
            ],
          },
          {
            blocks: [...renderBlocks()],
          },
        ]}
      />
    </C.Content>
  )
}

export default FPpeople
