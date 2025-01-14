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
  TUserTypes,
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

  const getObj = (userId: number) => {
    const baseInfo: TNewUserDefault = {
      id: userId,
      status: form.status,
      userId: userId,
      email: form.email,
      photo: null,
      branchId: form.branchId,
      franchiseId: form.franchiseId,
    }

    let info = getUserObj(
      {
        ...form,
        userId,
        address: { ...(form.address ?? {}), city: pickedCity?.id },
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
        } else throw new Error()
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "alert",
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

            const reqInfo = req.data as TUserTypes["PRESTADOR"]

            const gettedInfo = {
              ...form,
              ...initialRoleInfo,
              ...{
                ...reqInfo,
                address: !!reqInfo.address
                  ? {
                      ...reqInfo.address,
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
        deleteModalTitle={"Desativar Usuário"}
        deleteBtnText={"Desativar"}
        deleteModalInactivate={true}
      />
    ),
  }

  const onHandleField = (field: string, value: any) => {
    handleField(field, value, form, setForm, setPersonType, franchises)
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
          onHandleField,
          formSubmitFields,
          setIsManagingFranchiseCities
        )
        break

      case "SINDICO":
        content = formPartials.manager.extra(form, formSubmitFields)
        break

      case "PRESTADOR":
        content = formPartials.provider.extra(
          form,
          formSubmitFields,
          options,
          categories
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
          }),
        renderExtra,
        isManagingFranchiseCities,
        regions,
        setIsManagingFranchiseCities,
      }}
    />
  )
}

export default FPpeople
