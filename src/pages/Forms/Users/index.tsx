import { useCallback, useEffect, useMemo, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { TBlock } from "../../../utils/@types/components/Form"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { TAccess } from "../../../utils/@types/data/access"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"

import { Api } from "../../../api"
import {
  TNewUser,
  TNewUserDefault,
  TUser,
  TUserTypes,
} from "../../../utils/@types/data/user"
import { getStore } from "../../../store"
import { TOption } from "../../../utils/@types/data/option"
import { formPartials } from "./partials"
import { TCity, TRegion, TState } from "../../../utils/@types/data/region"
import { checkErrors } from "../../../utils/tb/checkErrors"
import { FormField } from "../../../utils/@types/components/FormFields"
import { getUserObj } from "../../../utils/tb/parsers/parseUserFormData"
import { TCategory } from "../../../utils/@types/data/category"
import { userSubordinates } from "../../../utils/system/options/profiles"
import FranchiseCities from "./partials/franchiseCities"
import ProviderLegalization from "../../../components/ProviderLegalization"

const FPpeople = () => {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const { user, controllers } = getStore()

  const [states, setStates] = useState<TState[]>([])

  const [loading, setLoading] = useState(false)
  const [isManagingFranchiseCities, setIsManagingFranchiseCities] =
    useState(false)

  const userAlloweds = useMemo(
    () => userSubordinates[user?.profile as TAccess] ?? [{ key: "" }],
    [user?.profile]
  )

  const [, setPickedCity] = useState<TCity | null>(null)

  const [personType, setPersonType] = useState<TAccess>(
    userAlloweds[0].key as TAccess
  )
  const [regions, setRegions] = useState<TRegion[]>([])
  const [franchises, setFranchises] = useState<TUser[]>([])
  const [, setCategories] = useState<TCategory[]>([])

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
    category: [],
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

            case "franchises":
              const shouldInclude =
                Array.isArray(form.franchises) &&
                !form.franchises.includes(value as number)

              const newList = shouldInclude
                ? [...form.franchises, value]
                : form.franchises.filter((i: number) => i !== value)

              setForm((p: any) => ({
                ...p,
                franchises: newList,
              }))
              break

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
    const baseInfo: TNewUserDefault = {
      id: userId,
      status: form.status,
      userId: userId,
      email: form.email,
      photo: null,
    }

    let info = getUserObj({ ...form, userId }, (form as TNewUser).profile)

    if (params.id && !Number.isNaN(params.id) && form.profile !== "PRESTADOR") {
      info = { ...info, id: Number(params.id) }
    }

    return {
      profile: form.profile,
      ...baseInfo,
      ...info,
    }
  }

  const handleUpdate = async () => {
    setLoading(true)

    try {
      if (params.id && !Number.isNaN(params.id)) {
        const obj = getObj(Number(params.id))

        const req = await Api.persons.update({
          person: obj as any,
        })

        if (req.ok) {
          controllers.feedback.setData({
            visible: true,
            state: "success",
            message: "Usuário atualizado com sucesso",
          })

          setLoading(false)

          navigate("/dashboard/users")
        }
        throw new Error()
      }
      throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "success",
        message:
          "Houve um erro ao atualizar o usuário. Verifique as informações e tente novamente.",
      })

      setLoading(false)
    }
  }

  const handleCreate = async () => {
    setLoading(true)

    try {
      const accountRegister = await Api.auth.register({
        tipo: personType !== "PRESTADOR" ? personType : "PRESTADOR_SERVICO",
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

          setLoading(false)

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

      setLoading(false)
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
    setLoading(true)

    try {
      const req = await Api.persons.delete({ person: form.userId })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Usuário excluído",
        })

        setLoading(false)

        navigate("/dashboard/users")
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "success",
        message: "Usuário excluído com sucesso",
      })

      setLoading(false)
    }
  }

  const handleSelectCity = (city: TCity) => {
    setPickedCity(city)

    setForm((frm: any) => ({
      ...frm,
      cityId: city.id,
    }))
  }

  useEffect(() => {
    if (form && form.address && form.address.country) {
      const availableStates = states.filter(
        (s) => Number(s.country.id) === Number(form.address.country)
      )

      setOptions((opt) => ({
        ...opt,
        state: parseOptionList(availableStates, "id", "name"),
      }))
    }
  }, [form, states])

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // user info

      if (params.id) {
        const req = await Api.persons.getSingle({ id: Number(params.id) })

        if (req.ok) {
          const hasInfo = req.data.profile && req.data.email

          if (hasInfo) {
            const initialRoleInfo = initials.forms.person[req.data.profile]

            const reqInfo = req.data as TUserTypes["PRESTADOR"]

            const gettedInfo = {
              ...form,
              ...initialRoleInfo,
              ...{
                ...reqInfo,
                address: {
                  ...reqInfo.address,
                  country: +reqInfo.address.country,
                  state: +reqInfo.address.state,
                },
                category: +reqInfo.category,
              },
            }

            setForm(gettedInfo)
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
        Api.persons.listAll({ size: 300 }).then((usersReq) => {
          if (usersReq.ok) {
            const list = usersReq.data.content

            const branchesList = list.filter((i) => i.profile === "FILIAL")
            const franchisesList = list.filter(
              (i) => i.profile === "FRANQUEADO"
            )

            setFranchises(franchisesList)

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
            const results = res.data.content

            setStates(results)
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

      // • Categories
      proms.push(
        Api.categories
          .listAll({})
          .then((res) => {
            if (res.ok) {
              const list = res.data.content

              setCategories(list)

              setOptions((opts) => ({
                ...opts,
                category: parseOptionList(list, "id", "name"),
              }))
            } else throw new Error()
          })
          .catch(() => {
            throw new Error()
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

      setLoading(false)
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações do usuário.",
        state: "error",
        visible: true,
      })

      setLoading(false)

      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controllers.feedback, navigate, params.id])

  useEffect(() => {
    if (user?.profile === "FILIAL")
      setForm((frm: any) => ({ ...frm, branchId: user?.subsidiaryId }))

    if (location.state && location.state.role) {
      const hasForm = initials.forms.person[location.state.role as TAccess]

      if (hasForm) {
        setPersonType(location.state.role)
        setForm(initials.forms.person[location.state.role as TAccess])
      }

      location.state = undefined
    } else {
      setForm((frm: TUser) => ({ ...frm, profile: userAlloweds[0].key }))
    }

    setOptions((opts: any) => ({
      ...opts,
      profile: userAlloweds,
    }))

    loadData()
  }, [loadData, location, user?.profile, user, userAlloweds])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

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
        handleDelete={params.id ? handleDelete : undefined}
        handleCancel={handleCancel}
        handleSave={handleSave}
        disabled={errors().has}
        deleteModalTitle={"Excluir Usuário"}
      />
    ),
  }

  const renderBasic = () => {
    let content: TBlock["groups"] = []

    switch (form.profile) {
      case "ADMIN":
        content = formPartials.admin.basic({ form })
        break

      case "FILIAL":
        content = formPartials.branch.basic({
          form,
          options,
          states,
          handleSelectCity,
        })
        break

      case "FRANQUEADO":
        content = formPartials.franchise.basic({
          form,
          options,
          userProfile: user?.profile as any,
          handleSelectCity,
        })
        break

      case "SINDICO":
        content = formPartials.manager.basic({ form })
        break

      case "PRESTADOR":
        content = formPartials.provider.basic({
          form,
          options,
          handleField,
          franchises: franchises,
          personType: user?.profile as TAccess,
          franchiseName: user?.name,
          handleSelectCity,
        })
        break

      default:
        break
    }

    return content
  }

  const renderExtra = () => {
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
          formSubmitFields,
          setIsManagingFranchiseCities
        )
        break

      case "SINDICO":
        content = formPartials.manager.extra(form, formSubmitFields)
        break

      case "PRESTADOR":
        content = formPartials.provider.extra(form, formSubmitFields, options)
        break

      default:
        break
    }

    return content
  }

  return form.profile === "FRANQUEADO" && isManagingFranchiseCities ? (
    <C.Content>
      <FranchiseCities
        cities={form.cities}
        region={regions.find((r) => r.id === form.region) as TRegion}
        handleBack={() => setIsManagingFranchiseCities(false)}
        handleList={(list) => handleField("cities", list)}
      />
    </C.Content>
  ) : (
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

export default FPpeople
