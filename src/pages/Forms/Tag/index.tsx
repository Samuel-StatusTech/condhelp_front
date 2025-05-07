import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"
import Divider from "../../../components/_minimals/Divider"
import { getStore } from "../../../store"

import { Api } from "../../../api"
import { checkErrors } from "../../../utils/tb/checkErrors"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"
import { TNewTag, TTag } from "../../../utils/@types/data/tag"
import { TOption } from "../../../components/Input/condosSelect"

const FPtag = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<TNewTag | TTag>(initials.forms.tag)

  const [errors, setErrors] = useState<TErrorsCheck>({
    fields: [],
    has: false,
  })

  const [options] = useState<{ [key: string]: TOption[] }>({
    profile: [
      { key: "SINDICO", value: "Síndico" },
      { key: "PRESTADOR", value: "Prestador" },
    ],
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const onConfirmDelete = async () => {
    setLoading(true)

    try {
      const req = await Api.tags.delete({ id: Number(params.id) })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Tag excluída",
        })

        setLoading(false)

        navigate("/dashboard/tags")
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "error",
        message: "Houve um erro ao excluir a tag. Tente novamente mais tarde.",
      })

      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const errorInfo = updateErrors()

      if (!errorInfo.has) {
        if (params.id) handleUpdate()
        else handleCreate()
      } else {
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
        message:
          "Houve um erro ao processar as informações. Tente novamente mais tarde.",
      })
    }
  }

  const handleUpdate = async () => {
    setLoading(true)

    try {
      const req = await Api.tags.update({ tag: form as TTag })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Tag atualizada com sucesso",
        })

        navigate("/dashboard/tags")
      }

      setLoading(false)
    } catch (error) {
      // ...

      setLoading(false)
    }
  }

  const getTagObj = () => {
    const obj: TNewTag = {
      name: form.name,
      type: form.type,
    }

    return obj
  }

  const handleCreate = async () => {
    setLoading(true)

    try {
      const obj = getTagObj()

      const req = await Api.tags.create({ newTag: obj })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Tag criada com sucesso",
        })

        setLoading(false)
        navigate("/dashboard/tags")
      }
    } catch (error) {
      // ...

      setLoading(false)
    }
  }

  const handleField = async (field: string, value: any) => {
    if (errors.fields.includes(field)) {
      const newFieldsList = errors.fields.filter(
        (errorItem) => errorItem !== field
      )
      setErrors({
        fields: newFieldsList,
        has: newFieldsList.length > 0,
      })
    }

    setForm((f: any) => ({ ...f, [field]: value }))
  }

  const loadTagData = useCallback(async () => {
    setLoading(true)

    try {
      const req = await Api.tags.getSingle({ id: Number(params.id) })

      if (req.ok) {
        setForm(req.data)
      } else {
        controllers.feedback.setData({
          message: req.error,
          state: "error",
          visible: true,
        })
      }

      setLoading(false)
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações da tag.",
        state: "error",
        visible: true,
      })

      setLoading(false)
    }
  }, [controllers.feedback, params.id])

  useEffect(() => {
    // ...
    if (params.id) {
      loadTagData()
    }
  }, [loadTagData, params.id])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  const updateErrors = () => {
    const check = checkErrors.tag(form)
    return check
  }

  return (
    <C.Content>
      <PageHeader type={"breadcrumb"} from={"tags"} forForm={true} />

      <Divider />

      <Form
        handleField={handleField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        columns={[
          {
            blocks: [
              {
                title: "Detalhes da tag",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      [
                        {
                          type: "input",
                          placeholder: "Digite aqui o nome da nova tag",
                          label: "Nome da tag",
                          field: "name",
                          value: form.name,
                          gridSizes: { big: 4, small: 12 },
                          error: {
                            has: errors.fields.includes("name"),
                            message: "Digite o nome",
                          },
                        },
                        {
                          type: "select",
                          field: "type",
                          label: "Escolha um perfil",
                          value: form.type,
                          gridSizes: { big: 4, small: 12 },
                          options: options.profile,
                          error: {
                            has: errors.fields.includes("type"),
                            message: "Escolha um perfil",
                          },
                        },
                      ],
                    ],
                  },
                  {
                    type: "custom",
                    element: (
                      <FormDefaultButtons
                        handleCancel={handleCancel}
                        handleSave={handleSave}
                        handleDelete={params.id ? onConfirmDelete : undefined}
                        deleteBtnText={params.id ? "Excluir tag" : undefined}
                        deleteModalTitle={params.id ? "Excluir tag" : undefined}
                        disabled={params.id ? errors.has : undefined}
                      />
                    ),
                  },
                ],
              },
            ],
          },
        ]}
      />
    </C.Content>
  )
}

export default FPtag
