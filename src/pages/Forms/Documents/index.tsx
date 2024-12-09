import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { TBlock } from "../../../utils/@types/components/Form"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { TAccess } from "../../../utils/@types/data/access"

import { Api } from "../../../api"
import { TNewUser, TNewUserDefault } from "../../../utils/@types/data/user"
import { getStore } from "../../../store"

import { formPartials } from "./partials"
import { checkErrors } from "../../../utils/tb/checkErrors"

import { getUserObj } from "../../../utils/tb/parsers/parseUserFormData"

const FPdocuments = () => {
  const navigate = useNavigate()
  const params = useParams()

  const { user, controllers } = getStore()

  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState<any>(initials.forms.person.PRESTADOR)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleField = async (field: string, value: any) => {
    setForm((p: any) => ({ ...p, [field]: value }))
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

    if (params.id && !Number.isNaN(params.id)) {
      info = { ...info, id: Number(params.id) }
    }

    return {
      profile: user?.profile as TAccess,
      ...baseInfo,
      ...info,
    }
  }

  const handleUpdate = async () => {
    setLoading(true)

    try {
      if (user?.id && !Number.isNaN(user?.id)) {
        const obj = getObj(Number(user?.id))

        const req = await Api.persons.update({
          person: obj as any,
        })

        if (req.ok) {
          controllers.feedback.setData({
            visible: true,
            state: "success",
            message: "Documentações atualizadas com sucesso",
          })

          setLoading(false)

          navigate(-1)
        }
      }
    } catch (error) {
      // ...

      setLoading(false)
    }
  }

  const handleSave = async () => {
    handleUpdate()
  }

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // user info

      const req = await Api.persons.getSingle({ id: Number(user?.id) })

      if (req.ok) {
        const hasInfo = req.data.profile && req.data.email

        if (hasInfo) {
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

      setLoading(false)
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações necessárias.",
        state: "error",
        visible: true,
      })

      setLoading(false)

      navigate(-1)
    }
  }, [controllers.feedback, navigate, user?.id])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  const errors = () => {
    return checkErrors.documentation(form)
  }

  /*
   *  Fields render
   */

  const formSubmitFields: TBlock["groups"][number] = {
    type: "custom",
    element: (
      <FormDefaultButtons
        handleCancel={handleCancel}
        handleSave={handleSave}
        disabled={errors().has}
      />
    ),
  }

  const renderBasic = () => {
    let content: TBlock[] = []

    content = formPartials.provider.basic({
      pendencies: {
        cityCnd: "free",
        federalCnd: "free",
        stateCnd: "none",
        fgts: "none",
      },
    })

    return content
  }

  const renderExtra = () => {
    let content: TBlock[] = []

    content = formPartials.provider.extra(form, formSubmitFields)

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
            blocks: renderBasic(),
          },
          {
            blocks: renderExtra(),
          },
        ]}
      />
    </C.Content>
  )
}

export default FPdocuments
