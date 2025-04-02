import { useCallback, useEffect, useMemo, useState } from "react"

import initials from "../../../utils/initials"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { TBlock } from "../../../utils/@types/components/Form"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { TAccess } from "../../../utils/@types/data/access"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"

import { Api } from "../../../api"
import {
  TNewUser,
  TNewUserDefault,
  TUser,
} from "../../../utils/@types/data/user"
import { getStore } from "../../../store"
import { TOption } from "../../../utils/@types/data/option"
import { formPartials } from "./partials"
import { TCity, TRegion, TState } from "../../../utils/@types/data/region"
import { checkErrors } from "../../../utils/tb/checkErrors"
import { getUserObj } from "../../../utils/tb/parsers/parseUserFormData"
import { TCategory } from "../../../utils/@types/data/category"
import { userSubordinates } from "../../../utils/system/options/profiles"

import { UserFormContent } from "./content"
import { handleField } from "./helpers/handleField"
import { renderBasic } from "./helpers/renderBasic"
import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"
import { TCondominium } from "../../../utils/@types/data/condominium"
import { getDateStr } from "../../../utils/tb/format/date"
import { sendFile } from "../../../utils/tb/helpers/file/sendFile"

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

  const [pickedCity, setPickedCity] = useState<TCity | null>(null)

  const [personType, setPersonType] = useState<TAccess>(
    userAlloweds[0].key as TAccess
  )
  const [regions, setRegions] = useState<TRegion[]>([])
  const [franchises, setFranchises] = useState<TUser[]>([])
  const [categories, setCategories] = useState<TCategory[]>([])
  const [errors, setErrors] = useState<TErrorsCheck>({
    fields: [],
    has: false,
  })

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

  const getObj = (
    userId: number,
    image: string | null,
    cndsUrls?: {
      federalCndDocument: string | null
      stateCndDocument: string | null
      cityCndDocument: string | null
      fgtsCndDocument: string | null
      cnpjCard: string | null
    }
  ) => {
    const baseInfo: TNewUserDefault = {
      id: userId,
      status: form.status,
      userId: userId,
      email: form.email,
      photo: image,
      branchId: form.branchId,
      franchiseId: form.franchiseId,
      doc: "",
    }

    let info = getUserObj(
      {
        ...(cndsUrls ? { ...form, ...cndsUrls } : form),
        userId,
        address: { ...(form.address ?? {}), city: pickedCity?.id },
        // image for admin...
      },
      (form as TNewUser).profile
    )

    if (params.id && !Number.isNaN(params.id) && form.profile !== "PRESTADOR") {
      info = { ...info, id: Number(params.id) }
    }

    return {
      profile: form.profile,
      ...baseInfo,
      ...info,
    }
  }

  const getUserDocument = (obj: any) => {
    let value = ""

    const type = params.id ? form.profile : personType

    switch (type) {
      case "ADMIN":
        value = form.document.register ?? ""
        break
      case "FILIAL":
        value =
          obj.responsible.responsibleType === "CPF"
            ? obj.responsible.cpf
            : obj.responsible.cnpj
        break
      case "FRANQUEADO":
        value = obj.typePerson === "PJ" ? obj.cnpj : obj.cpf
        break
      case "SINDICO":
        value = obj.documentNumber
        break
      case "PRESTADOR":
        value = obj.cnpj
        break

      default:
        break
    }
    return value.replace(/\D/g, "")
  }

  const handleUpdate = async (
    onFinish?: (manager: {
      id: number
      name: string
      surname: string
      branchId: number
      franchiseId: number
    }) => void,
    cndsUrls?: {
      federalCndDocument: string | null
      stateCndDocument: string | null
      cityCndDocument: string | null
      fgtsCndDocument: string | null
      cnpjCard: string | null
    }
  ) => {
    setLoading(true)

    try {
      const img = form.profile !== "FRANQUEADO" ? await getUserImage() : null

      if (params.id && !Number.isNaN(params.id)) {
        const obj = getObj(Number(params.id), img, cndsUrls)
        const document = getUserDocument(obj)

        const req = await Api.persons.update({
          person: { ...(obj as any), doc: document },
        })

        if (req.ok) {
          controllers.feedback.setData({
            visible: true,
            state: "success",
            message: "Usuário atualizado com sucesso",
          })

          setLoading(false)
          if (onFinish && typeof onFinish === "function") {
            const info = {
              id: obj.userId,
              name: (obj as any).name,
              surname: (obj as any).surname,
              branchId: (obj as any).branchId,
              franchiseId: (obj as any).franchiseId,
            }

            onFinish(info)
          } else navigate("/dashboard/users")
        } else {
          controllers.feedback.setData({
            visible: true,
            state: "alert",
            message: req.error,
          })
        }
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "alert",
        message:
          "Houve um erro ao atualizar o usuário. Verifique as informações e tente novamente.",
      })
    }

    setLoading(false)
  }

  const handleCreate = async (
    onFinish?: (manager: {
      id: number
      name: string
      surname: string
      branchId: number
      franchiseId: number
    }) => void,
    cndsUrls?: {
      federalCndDocument: string | null
      stateCndDocument: string | null
      cityCndDocument: string | null
      fgtsCndDocument: string | null
      cnpjCard: string | null
    }
  ) => {
    setLoading(true)

    try {
      const img = form.profile !== "FRANQUEADO" ? await getUserImage() : null

      const document = getUserDocument(getObj(0, img, cndsUrls))

      const accountRegister = await Api.auth.register({
        tipo: personType !== "PRESTADOR" ? personType : "PRESTADOR_SERVICO",
        senha: null,
        usuario: form.email,
        document: document,
      })

      if (accountRegister.ok) {
        // @ts-ignore
        const obj = getObj(accountRegister.data.id, img)

        const req = await Api.persons.create({
          newPerson: { ...obj, doc: document } as TNewUser,
        })

        if (req.ok) {
          controllers.feedback.setData({
            visible: true,
            state: "success",
            message: "Usuário criado com sucesso",
          })

          setLoading(false)
          if (onFinish && typeof onFinish === "function") {
            const info = {
              id: obj.userId,
              name: (obj as any).name,
              surname: (obj as any).surname,
              branchId: (obj as any).branchId,
              franchiseId: (obj as any).franchiseId,
            }

            onFinish(info)
          } else navigate("/dashboard/users")
        } else {
          if (req.error) {
            controllers.feedback.setData({
              visible: true,
              state: "error",
              message: req.error,
            })
          } else throw new Error()
        }
      } else {
        if (accountRegister.error) {
          controllers.feedback.setData({
            visible: true,
            state: "error",
            message: accountRegister.error,
          })
        } else throw new Error()
      }
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "error",
        message:
          "Não foi possível registrar o usuário. Verifique as informações e tente novamente.",
      })
    }

    setLoading(false)
  }

  const getUserImage = async (): Promise<string | null> => {
    try {
      return form.photo
        ? typeof form.photo === "string" && form.photo.startsWith("https://")
          ? form.photo
          : await sendFile({
              fileData: form.photo,
              showError: () => {
                controllers.feedback.setData({
                  visible: true,
                  state: "alert",
                  message:
                    "Houve um erro ao enviar a imagem. Verifique as informações e tente novamente.",
                })
              },
              type: "image",
            })
        : null
    } catch (error) {
      return null
    }
  }

  const processProviderDocuments = async () => {
    try {
      // CNDs
      const cndsFiles = [
        ...[
          !form.federalCndFree
            ? { key: "federal", document: form.federalCndDocument }
            : null,
        ],
        ...[
          !form.stateCndFree
            ? { key: "state", document: form.stateCndDocument }
            : null,
        ],
        ...[
          !form.cityCndFree
            ? { key: "city", document: form.cityCndDocument }
            : null,
        ],
        ...[
          !form.fgtsCndFree
            ? { key: "fgts", document: form.fgtsCndDocument }
            : null,
        ],
      ].filter((i) => i !== null)
      let urls: { [key: string]: string | null } = {}

      let cndError = false

      for (const i in cndsFiles) {
        const cnd = cndsFiles[i]

        if (!cndError && cnd && cnd.document) {
          if (
            typeof cnd.document === "string" &&
            cnd.document.startsWith("https://")
          ) {
            urls[cnd.key as keyof typeof urls] = cnd.document
          } else {
            const cndUrl = await sendFile({
              fileData: cnd.document,
              type: "pdf",
              showError: () => {
                controllers.feedback.setData({
                  state: "alert",
                  message: `Não foi possível enviar a cnd ${cnd.key}`,
                  visible: true,
                })

                throw new Error()
              },
            })

            if (cndUrl) urls[cnd.key as keyof typeof urls] = cndUrl
            else cndError = true
          }
        }
      }

      // CNPJ card

      if (form.cnpjCard) {
        if (
          typeof form.cnpjCard === "string" &&
          form.cnpjCard.startsWith("https://")
        ) {
          urls["cnpjCard"] = form.cnpjCard
        } else {
          const cardUrl = await sendFile({
            fileData: form.cnpjCard,
            type: "pdf",
            showError: () => {
              controllers.feedback.setData({
                state: "alert",
                message: `Não foi possível enviar o cartão CNPJ`,
                visible: true,
              })

              throw new Error()
            },
          })

          if (cardUrl) urls["cnpjCard"] = cardUrl
        }
      }

      const newFormInfo = {
        ...form,
        federalCndDocument: urls.federal ?? null,
        stateCndDocument: urls.state ?? null,
        cityCndDocument: urls.city ?? null,
        fgtsCndDocument: urls.fgts ?? null,
        cnpjCard: urls.cnpjCard ?? null,
      }

      return newFormInfo
    } catch (error) {
      return false
    }
  }

  const handleSave = async (
    onFinish?: (manager: {
      id: number
      name: string
      surname: string
      branchId: number
      franchiseId: number
    }) => void
  ) => {
    setLoading(true)

    try {
      const errorInfo = updateErrors()

      if (!errorInfo.has) {
        if (form.profile === "PRESTADOR") {
          const cndProcesses = await processProviderDocuments()

          if (!cndProcesses) {
            setLoading(false)
            return
          } else {
            if (params.id) handleUpdate(onFinish ?? undefined, cndProcesses)
            else handleCreate(onFinish ?? undefined, cndProcesses)
          }
        } else {
          if (params.id) handleUpdate(onFinish ?? undefined)
          else handleCreate(onFinish ?? undefined)
        }
      } else {
        setErrors(errorInfo)

        controllers.feedback.setData({
          visible: true,
          state: "alert",
          message: "Corrija os campos e tente novamente",
        })

        setLoading(false)
      }
    } catch (error) {
      // ...
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)

    try {
      const req = await Api.persons.inactivate({
        id: +(params?.id as string),
      })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Usuário inativado",
        })

        setLoading(false)

        navigate("/dashboard/users")
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "error",
        message: "Houve um erro ao inativar o usuário",
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

      if (user?.profile === "FRANQUEADO")
        setForm((frm: any) => ({ ...frm, franqId: user?.userId as number }))

      if (params.id) {
        const req = await Api.persons.getSingle({ id: Number(params.id) })

        if (req.ok) {
          const hasInfo = req.data.profile && req.data.email

          if (hasInfo) {
            const initialRoleInfo = initials.forms.person[req.data.profile]

            const reqInfo = req.data as any

            const gettedInfo = {
              ...form,
              ...initialRoleInfo,
              ...{
                ...reqInfo,
                address: !!reqInfo.address
                  ? {
                      ...reqInfo.address,
                      city: reqInfo.address.city,
                      cityId:
                        reqInfo.address.cityId &&
                        !Number.isNaN(+reqInfo.address.cityId)
                          ? +reqInfo.address.cityId
                          : null,
                      country: +reqInfo.address.country,
                      state: +reqInfo.address.state,
                    }
                  : undefined,
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

      const adminLogic = () =>
        Api.persons.listAll({ size: 300, actives: "true" }).then((usersReq) => {
          if (usersReq.ok) {
            const list = usersReq.data.content

            const branchesList = list.filter((i) => i.profile === "FILIAL")
            const franchisesList = list.filter(
              (i) => i.profile === "FRANQUEADO"
            )

            setFranchises(franchisesList)

            setOptions((opts) => ({
              ...opts,
              branch: parseOptionList(branchesList, "userId", "name"),
              franchise: parseOptionList(franchisesList, "userId", "name"),
              franchises: parseOptionList(franchisesList, "userId", "name"),
            }))
          } else throw new Error()
        })

      const branchLogic = () =>
        Api.persons
          .getBranchUsers({ size: 300, profile: "FRANQUEADO", actives: "true" })
          .then((usersReq) => {
            if (usersReq.ok) {
              const list = usersReq.data.content

              const franchisesList = list.filter(
                (i) => i.profile === "FRANQUEADO"
              )

              setFranchises(franchisesList)

              setOptions((opts) => ({
                ...opts,
                branch: [],
                franchise: parseOptionList(franchisesList, "userId", "name"),
                franchises: parseOptionList(franchisesList, "userId", "name"),
              }))
            } else throw new Error()
          })

      if (user?.profile === "ADMIN" || user?.profile === "FILIAL") {
        proms.push(user?.profile === "ADMIN" ? adminLogic() : branchLogic())
      }

      // For Regions select
      proms.push(
        Api.regions.listAll({ size: 300 }).then((res) => {
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
        Api.countries.listAll({ size: 300 }).then((res) => {
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
        Api.states.listAll({ size: 300 }).then((res) => {
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
          .listAll({ size: 300 })
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
    if (user?.profile === "FILIAL") {
      setForm((frm: any) => ({ ...frm, branchId: user?.userId }))
    } else if (user?.profile === "FRANQUEADO") {
      setForm((frm: any) => ({
        ...frm,
        branchId: user?.branchId,
        franchiseId: user?.userAccountId,
        franqId: user?.userId as number,
      }))
    }
  }, [user, personType])

  useEffect(() => {
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

  const updateErrors = () => {
    const check = checkErrors.users(form)
    return check
  }

  /*
   *  Condominiums management
   */

  // Add

  const addCondominiumAction = (manager: {
    id: number
    name: string
    surname: string
    branchId: number
    franchiseId: number
  }) => {
    navigate("/dashboard/condos/single", {
      state: { manager: manager },
    })
  }

  const handleAddCondominium = () => {
    // Manager is already created
    if (params.id)
      addCondominiumAction({
        id: +params.id,
        name: form.name,
        surname: form.surname,
        branchId: form.branchId,
        franchiseId: form.franchiseId,
      })
    else {
      handleSave(addCondominiumAction)
    }
  }

  // Remove

  const getCondominiumObj = (condominium: TCondominium) => {
    const mId = null

    const obj: any = {
      id: condominium.id,
      name: condominium.name,
      unities: condominium.unities,
      cnpj: condominium.cnpj.replace(/\D/g, ""),
      address: condominium.address,
      addressNumber: condominium.addressNumber,
      zipCode: condominium.zipCode,
      neighborhood: condominium.neighborhood,
      city: condominium.city,
      federateUnit: condominium.federateUnit,
      electionDate: getDateStr(condominium.electionDate, "javaDateTime"),
      managerId: mId,
      branchId: condominium.branchId,
      franchiseId: condominium.franchiseId,
    }

    return obj
  }

  const deleteCondominiumAction = async (condominium: TCondominium) => {
    setLoading(true)

    try {
      const unlinkedObj: TCondominium = getCondominiumObj(condominium)

      const req = await Api.condos.update({ condo: unlinkedObj })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Condomínio desvinculado com sucesso.",
        })

        setForm((frm: any) => ({
          ...frm,
          condominiums: frm.condominiums.filter(
            (c: TCondominium) => c.id !== condominium.id
          ),
        }))
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "error",
        message: "Houve um erro ao desvincular o condomínio.",
      })
    }

    setLoading(false)
  }

  const handleDeleteCondominium = async (condominium: TCondominium) => {
    controllers.modal.open({
      role: "confirmDelete",
      visible: true,
      data: {
        title: "Desvincular condomínio?",
        deleteTextDescriptor: "desvincular o condomínio deste síndico",
        deleteBtnText: "Desvincular",
      },
      handleOp: () => deleteCondominiumAction(condominium),
    })
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
        disabled={errors.has}
        deleteModalTitle={"Desativar Usuário"}
        deleteFullText={"Tem certeza que deseja desativar este usuário?"}
        deleteBtnText={"Desativar"}
        deleteModalInactivate={true}
      />
    ),
  }

  const onHandleField = (field: string, value: any) => {
    handleField(
      field,
      value,
      form,
      setForm,
      setPersonType,
      franchises,
      errors,
      setErrors
    )
  }

  const renderExtra = () => {
    let content: TBlock[] = []

    switch (form.profile) {
      case "ADMIN":
        content = formPartials.admin.extra(form, formSubmitFields, errors)
        break

      case "FILIAL":
        content = formPartials.branch.extra(form, formSubmitFields, errors)
        break

      case "FRANQUEADO":
        content = formPartials.franchise.extra(
          form,
          regions,
          options,
          onHandleField,
          formSubmitFields,
          setIsManagingFranchiseCities,
          errors
        )
        break

      case "SINDICO":
        content = formPartials.manager.extra(
          form,
          formSubmitFields,
          errors,
          handleAddCondominium,
          handleDeleteCondominium,
          params.id !== undefined
        )
        break

      case "PRESTADOR":
        content = formPartials.provider.extra(
          form,
          formSubmitFields,
          options,
          categories,
          errors
        )
        break

      default:
        break
    }

    return content
  }

  return (
    <UserFormContent
      info={{
        handleField: onHandleField,
        handleCancel,
        handleSave,
        options,
        form,
        personType,
        renderBasic: () =>
          renderBasic({
            user: user as TUser,
            form,
            handleSelectCity,
            options,
            states,
            onHandleField,
            franchises,
            isEditing: params && params.id !== undefined,
            errors: errors,
          }),
        renderExtra,
        isManagingFranchiseCities,
        regions,
        setIsManagingFranchiseCities,
        extra: {
          profile: form.profile,
        },
        errors: errors,
      }}
    />
  )
}

export default FPpeople
