import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"
import { systemOptions } from "../../../utils/system/options"

import { TBlock } from "../../../utils/@types/components/Form"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { TAccess } from "../../../utils/@types/data/access"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"

import { Api } from "../../../api"
import { TNewUser, TNewUserDefault } from "../../../utils/@types/data/user"
import { getStore } from "../../../store"
import { TOption } from "../../../utils/@types/data/option"
import { formPartials } from "./partials"
import { TRegion } from "../../../utils/@types/data/region"
import { checkErrors } from "../../../utils/tb/checkErrors"
import { FormField } from "../../../utils/@types/components/FormFields"
import { getUserObj } from "../../../utils/tb/parsers/parseUserFormData"

const FPpeople = () => {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const { user, controllers } = getStore()

  const [originalPersonType, setOriginalPersonType] = useState<TAccess>("ADMIN")

  const [personType, setPersonType] = useState<TAccess>("ADMIN")
  const [regions, setRegions] = useState<TRegion[]>([])

  const [form, setForm] = useState<any>(initials.forms.person[personType])
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    company: [],
    department: [],
    level: [],
    leader: [],
    profile: [],
    branch: [],
    franchise: [],
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
        case "FRANQUEADO":
          const responsableKeys = [
            "responsablePersonName",
            "responsableResponsibleType",
            "responsableFantasyName",
            "responsableCompanyName",
            "responsableCnpj",
            "responsableStateRegistration",
            "responsableMunicipalRegistration",
            "responsableCpf",
          ]

          if (responsableKeys.includes(field)) {
            const fieldKey = field.split("responsable")[1]

            const fieldName =
              fieldKey.charAt(0).toLowerCase() + fieldKey.slice(1)

            setForm((p: any) => ({
              ...p,
              responsible: { ...p.responsible, [fieldName]: value },
            }))
          } else setForm((p: any) => ({ ...p, [field]: value }))
          break

        case "SINDICO":
          setForm((p: any) => ({ ...p, [field]: value }))
          break

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
          setForm((p: any) => ({ ...p, [field]: value }))
          break
      }
    }
  }

  const getObj = (userId: number) => {
    let info = {}

    const baseInfo: TNewUserDefault = {
      id: userId,
      status: form.status,
      userId: userId,
      email: form.email,
      photo: null,
    }

    switch ((form as TNewUser).profile) {
      case "ADMIN":
        info = getUserObj({ ...form, userId }, "ADMIN")
        break

      case "PRESTADOR":
        info = getUserObj({ ...form, userId }, "PRESTADOR")
        break

      case "FILIAL":
        info = getUserObj({ ...form, userId }, "FILIAL")
        break

      case "FRANQUEADO":
        info = getUserObj({ ...form, userId }, "FRANQUEADO")
        break

      case "SINDICO":
        info = getUserObj({ ...form, userId }, "SINDICO")
        break

      default:
        break
    }

    if (params.id && !Number.isNaN(params.id)) {
      info = { ...info, id: Number(params.id) }
    }

    return {
      profile: personType,
      ...baseInfo,
      ...info,
    }
  }

  const handleUpdate = async () => {
    try {
      if (params.id && !Number.isNaN(params.id)) {
        const obj = getObj(Number(params.id))

        const req = await Api.persons.update({
          person: obj as any,
          originalPersonType,
        })

        if (req.ok) {
          controllers.feedback.setData({
            visible: true,
            state: "success",
            message: "Usuário atualizado com sucesso",
          })

          navigate("/dashboard/users")
        }
      }
    } catch (error) {
      // ...
    }
  }

  const handleCreate = async () => {
    try {
      const accountRegister = await Api.auth.register({
        tipo: personType,
        senha: "123456",
        usuario: form.email,
      })

      if (accountRegister.ok) {
        // @ts-ignore
        const obj = getObj(accountRegister.data.id)

        const req = await Api.persons.create({
          newPerson: obj as TNewUser,
        })

        if (req.ok) {
          controllers.feedback.setData({
            visible: true,
            state: "success",
            message: "Usuário criado com sucesso",
          })

          navigate("/dashboard/users")
        } else throw new Error()
      } else throw new Error()
    } catch (error) {
      // ...
      controllers.feedback.setData({
        visible: true,
        state: "error",
        message:
          "Não foi possível registrar o usuário. Verifique as informações e tente novamente.",
      })
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
      const req = await Api.persons.delete({ person: form.userId })

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

  const loadData = useCallback(async () => {
    try {
      // user info

      if (params.id) {
        const req = await Api.persons.getSingle({ id: Number(params.id) })

        if (req.ok) {
          const hasInfo = req.data.profile && req.data.email

          if (hasInfo) {
            setOriginalPersonType(req.data.profile)

            const initialRoleInfo = initials.forms.person[req.data.profile]

            setForm((fm: any) => ({
              ...fm,
              ...initialRoleInfo,
              ...(hasInfo
                ? req.data
                : {
                    ...req.data,
                    profile: "ADMIN",
                  }),
            }))
          }
        } else {
          controllers.feedback.setData({
            message: req.error,
            state: "error",
            visible: true,
          })

          navigate(-1)
        }
      }

      let proms: Promise<any>[] = []

      // For Persons select
      proms.push(
        Api.persons.listAll({}).then((usersReq) => {
          if (usersReq.ok) {
            const list = usersReq.data.content

            const branchesList = list.filter((i) => i.profile === "FILIAL")
            const franchisesList = list.filter(
              (i) => i.profile === "FRANQUEADO"
            )

            setOptions((opts) => ({
              ...opts,
              branch: parseOptionList(branchesList, "id", "name"),
              franchise: parseOptionList(franchisesList, "id", "name"),
              franchises: parseOptionList(franchisesList, "id", "name"),
            }))
          } else throw new Error()
        })
      )

      // For Regions select
      proms.push(
        Api.regions.listAll({}).then((res) => {
          if (res.ok) {
            setRegions(res.data.content)
            setOptions((opts) => ({
              ...opts,
              region: parseOptionList(res.data.content, "id", "name"),
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
      )

      // For Countries select
      proms.push(
        Api.countries.listAll({}).then((res) => {
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
      )

      // For States select
      proms.push(
        Api.states.listAll({}).then((res) => {
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
      )

      await Promise.all(proms).catch((err) => {
        controllers.feedback.setData({
          message:
            "Houve um erro ao carregar informações para cadastro. Tente novamente mais tarde.",
          state: "error",
          visible: true,
        })
        navigate(-1)
      })
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações do usuário.",
        state: "error",
        visible: true,
      })

      navigate(-1)
    }
  }, [controllers.feedback, navigate, params.id])

  useEffect(() => {
    // ...
    if (location.state && location.state.role) {
      const hasForm = initials.forms.person[location.state.role as TAccess]

      if (hasForm) {
        setPersonType(location.state.role)
        setForm(initials.forms.person[location.state.role as TAccess])
      }

      location.state = undefined
    }

    loadData()
  }, [loadData, location])

  useEffect(() => {
    setOptions((opts: any) => ({
      ...opts,
      profile: systemOptions.profiles.filter((i) => i.key !== "all"),
      country: [{ key: "br", value: "Brasil" }],
      state: systemOptions.states,
    }))
  }, [])

  const errors = () => {
    return checkErrors.users(form)
  }

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
        disabled={errors().has}
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
        content = formPartials.franchise.basic({ form, options, userProfile: user?.profile as any })
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
        content = formPartials.franchise.extra(
          form,
          regions,
          options,
          handleField,
          formSubmitFields
        )
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
                      ...(personType === "SINDICO" &&
                      (["ADMIN", "FILIAL"] as TAccess[]).includes(
                        user?.profile as TAccess
                      )
                        ? [
                            {
                              type: "select",
                              label: "Franquia",
                              field: "franchiseId",
                              options: options.franchise,
                              value: form.franchiseId,
                              gridSizes: { big: 12 },
                            } as FormField,
                          ]
                        : []),
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
