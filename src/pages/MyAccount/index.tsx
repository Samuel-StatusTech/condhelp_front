import { TAccess } from "../../utils/@types/data/access"
import MyAccountContent from "./contents"
import { getStore } from "../../store"
import { TBlock } from "../../utils/@types/components/Form"
import FormDefaultButtons from "../../components/FormDefaultButtons"
import { handleField } from "./helpers/handleField"
import { useCallback, useEffect, useState } from "react"
import initials from "../../utils/initials"
import { useNavigate } from "react-router-dom"
import {
  TNewUser,
  TNewUserDefault,
  TUserTypes,
} from "../../utils/@types/data/user"
import { getUserObj } from "../../utils/tb/parsers/parseUserFormData"
import { Api } from "../../api"
import { checkErrors } from "../../utils/tb/checkErrors"
import { parseOptionList } from "../../utils/tb/parsers/parseOptionList"
import { TCategory } from "../../utils/@types/data/category"
import { TOption } from "../../utils/@types/data/option"

const MyAccount = () => {
  const { user, controllers } = getStore()

  const navigate = useNavigate()

  const [form, setForm] = useState<any>(
    initials.forms.person[user?.profile as TAccess]
  )

  const [, setCategories] = useState<TCategory[]>([])

  const [, setOptions] = useState<{ [key: string]: TOption[] }>({
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

  const getObj = () => {
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
        photo: user.photo,
        branchId: user.branchId,
        franchiseId: user.franchiseId,
      }

      let info = getUserObj(
        {
          ...form,
          userId: id,
          // @ts-ignore
          address: { ...(user.address ? user.address : {}) },
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

  const handleUpdate = async () => {
    setLoading(true)

    try {
      const obj = getObj()

      const req = await Api.persons.update({
        person: obj as any,
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

  const errors = () => {
    return checkErrors.users(form)
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

  /*
   *  Fields render
   */

  const formSubmitFields: TBlock["groups"][number] = {
    type: "custom",
    element: (
      <FormDefaultButtons
        handleDelete={undefined}
        handleCancel={handleCancel}
        handleSave={handleUpdate}
        disabled={errors().has}
      />
    ),
  }

  const onHandleField = (field: string, value: any) => {
    handleField(field, value, form, setForm)
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
        handleSave: handleUpdate,
        form,
        formSubmitFields,
      }}
    />
  )
}

export default MyAccount
