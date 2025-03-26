import { TAccess } from "../../utils/@types/data/access"
import MyAccountContent from "./contents"
import { getStore } from "../../store"
import { TBlock } from "../../utils/@types/components/Form"
import FormDefaultButtons from "../../components/FormDefaultButtons"
import { handleField } from "./helpers/handleField"
import { useCallback, useEffect, useState } from "react"
import initials from "../../utils/initials"
import { useNavigate } from "react-router-dom"
import { TNewUser, TNewUserDefault } from "../../utils/@types/data/user"
import { getUserObj } from "../../utils/tb/parsers/parseUserFormData"
import { Api } from "../../api"
import { parseOptionList } from "../../utils/tb/parsers/parseOptionList"
import { TCategory } from "../../utils/@types/data/category"
import { TOption } from "../../utils/@types/data/option"
import { TErrorsCheck } from "../../utils/@types/helpers/checkErrors"
import { checkErrors } from "../../utils/tb/checkErrors"
import { TState } from "../../utils/@types/data/region"
import { sendFile } from "../../utils/tb/helpers/file/sendFile"

const MyAccount = () => {
  const { user, controllers } = getStore()

  const navigate = useNavigate()

  const [form, setForm] = useState<any>(
    initials.forms.person[user?.profile as TAccess]
  )

  const [, setCategories] = useState<TCategory[]>([])
  const [states, setStates] = useState<TState[]>([])

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
  const [errors, setErrors] = useState<TErrorsCheck>({
    fields: [],
    has: false,
  })

  const getObj = (image: string | null) => {
    if (user) {
      const id =
        user?.profile === "PRESTADOR"
          ? user?.userAccountId
          : (user?.userId as number)

      const baseInfo: TNewUserDefault = {
        id: user.userId,
        status: user.status,
        userId: id,
        email: user.email,
        photo: image,
        branchId: user.branchId,
        franchiseId: user.franchiseId,
        doc: "",
      }

      let info = getUserObj(
        {
          ...form,
          userId: id,
          // @ts-ignore
          address: { ...(form.address ?? {}), city: form.cityId },
        },
        (form as TNewUser).profile
      )

      if (form.profile !== "PRESTADOR") {
        info = { ...info, id: user?.id }
      }

      const parsed = {
        profile: form.profile,
        ...baseInfo,
        ...info,
      }

      return parsed
    }
  }

  const [loading, setLoading] = useState(true)

  const handleCancel = () => {
    navigate(-1)
  }

  const getUserDocument = (obj: any) => {
    let value = ""

    switch (user?.profile) {
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

  const handleUpdate = async () => {
    setLoading(true)

    try {
      const img = form.profile !== "FRANQUEADO" ? await getUserImage() : null

      const obj = getObj(img)
      const document = getUserDocument(obj)

      const req = await Api.persons.update({
        person: { ...(obj as any), doc: document },
      })

      if (req.ok) {
        const id =
          user?.profile === "PRESTADOR"
            ? user?.userAccountId
            : (user?.userId as number)

        const userDataReq = await Api.persons.getSingle({
          id: id,
          profile: user?.profile as TAccess,
        })

        if (userDataReq.ok) {
          controllers.user.setData(userDataReq.data)
          controllers.feedback.setData({
            visible: true,
            state: "success",
            message: "Informações atualizadas com sucesso",
          })

          setLoading(false)

          navigate(-1)
        } else throw new Error()
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "alert",
        message:
          "Houve um erro ao atualizar seus dados. Verifique as informações e tente novamente.",
      })

      setLoading(false)
    }
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

  const updateErrors = () => {
    return checkErrors.users(form)
  }

  const handleSave = async () => {
    try {
      const errorInfo = updateErrors()

      if (!errorInfo.has) handleUpdate()
      else {
        setErrors(errorInfo)

        controllers.feedback.setData({
          visible: true,
          state: "alert",
          message: "Corrija os campos e tente novamente",
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "alert",
        message: "Houve um erro. Verifique os campos e tente novamente.",
      })
    }
  }

  /*
   *  Data fetching
   */

  const loadData = useCallback(
    async (updateLocal?: boolean) => {
      setLoading(true)

      try {
        // user info

        const id =
          user?.profile === "PRESTADOR"
            ? user?.userAccountId
            : (user?.userId as number)

        if (user?.profile === "FRANQUEADO")
          setForm((frm: any) => ({ ...frm, franqId: user?.userId as number }))

        const req = await Api.persons.getSingle({
          id: id,
        })

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

            if (updateLocal) {
              controllers.user.setData(gettedInfo)
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

        let proms: Promise<any>[] = []

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

        await Promise.all(proms).catch((err) => {
          controllers.feedback.setData({
            message:
              "Houve um erro ao carregar informações necessárias. Tente novamente mais tarde.",
            state: "error",
            visible: true,
          })
          navigate(-1)
        })

        setLoading(false)
      } catch (error) {
        controllers.feedback.setData({
          message: "Não foi possível carregar suas informações.",
          state: "error",
          visible: true,
        })

        setLoading(false)

        navigate(-1)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [controllers.feedback, controllers.user, navigate, user]
  )

  useEffect(() => {
    loadData()
  }, [loadData])

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

  /*
   *  Fields render
   */

  const formSubmitFields: TBlock["groups"][number] = {
    type: "custom",
    element: (
      <FormDefaultButtons
        handleDelete={undefined}
        handleCancel={handleCancel}
        handleSave={handleSave}
        disabled={errors.has}
      />
    ),
  }

  const onHandleField = (field: string, value: any) => {
    handleField(field, value, form, setForm, errors, setErrors)
  }

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  return (
    <MyAccountContent
      info={{
        handleField: onHandleField,
        handleCancel,
        handleSave: handleSave,
        form,
        formSubmitFields,
        options: options,
        errors: errors,
      }}
    />
  )
}

export default MyAccount
