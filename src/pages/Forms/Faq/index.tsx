import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { getStore } from "../../../store"

import { TNewFaq, TFaq } from "../../../utils/@types/data/faq"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { List } from "../../../components/List"
import { systemOptions } from "../../../utils/system/options"
import { Api } from "../../../api"
import { TAccess } from "../../../utils/@types/data/access"

const FPfaq = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [form, setForm] = useState<TNewFaq | TFaq>(initials.forms.faq)

  const handleCancel = () => {
    navigate(-1)
  }

  const getObj = () => {
    return {
      ...form,
      accessProfiles: form.accessProfiles.filter((i: string) => i !== "all"),
    }
  }

  const handleUpdate = async () => {
    try {
      // check errors

      const obj = getObj()

      const req = await Api.faqs.update({ faq: obj as TFaq })

      if (req.ok) {
        controllers.feedback.setData({
          message: "Faq atualizada com sucesso.",
          state: "success",
          visible: true,
        })
        navigate("/dashboard/managefaq")
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Não foi possível atualizar a FAQ. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }
  }

  const handleCreate = async () => {
    try {
      // check errors

      const obj = getObj()

      const req = await Api.faqs.create({ newFaq: obj as TNewFaq })

      if (req.ok) {
        controllers.feedback.setData({
          message: "Faq criada com sucesso.",
          state: "success",
          visible: true,
        })
        navigate("/dashboard/managefaq")
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível criar a FAQ. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }
  }

  const handleSave = async () => {
    if (params.id) handleUpdate()
    else handleCreate()
  }

  const handleDelete = async () => {
    if (params.id) {
      try {
        if (Number.isNaN(params.id)) throw new Error()
        else {
          const req = await Api.faqs.delete({ id: Number(params.id) })

          if (req.ok) {
            controllers.feedback.setData({
              message: "Faq excluida com sucesso.",
              state: "success",
              visible: true,
            })
            navigate("/dashboard/managefaq")
          } else throw new Error()
        }
      } catch (error) {
        controllers.feedback.setData({
          message:
            "Não foi possível excluir a FAQ. Tente novamente mais tarde.",
          state: "error",
          visible: true,
        })
      }
    }
  }

  const handleField = async (field: string, value: any) => {
    if (field === "accessProfiles") {
      let newList: (TAccess | "all")[] = []

      if (value === "all") {
        if (form.accessProfiles.length < 4)
          newList = ["all", "FILIAL", "FRANQUEADO", "SINDICO", "PRESTADOR"]
        else if (form.accessProfiles.includes("all" as any)) newList = []
      } else {
        if (form.accessProfiles.includes(value)) {
          if (form.accessProfiles.includes("all" as any))
            newList = form.accessProfiles.filter(
              (i: any) => i !== "all" && i !== value
            )
          else newList = form.accessProfiles.filter((i: any) => i !== value)
        } else {
          if (
            !form.accessProfiles.includes("all" as any) &&
            form.accessProfiles.length === 3
          )
            newList = [...form.accessProfiles, value, "all"]
          else newList = [...form.accessProfiles, value]
        }
      }

      setForm((f) => ({ ...f, accessProfiles: newList as any }))
    } else {
      setForm((f) => ({ ...f, [field]: value }))
    }
  }

  const handleAddQuestion = () => {
    const newFaq: TFaq["items"][number] = {
      // @ts-ignore
      id: `new-${form.items.length}`,
      name: "",
      answer: "",
      asking: "",
      isNew: true,
    }

    setForm((frm) => ({ ...frm, items: [...frm.items, newFaq] }))
  }

  const handleQuestion: (id: any, field: string, value: string) => void = (
    id,
    field,
    value
  ) => {
    // ...
    const newList = form.items.map((i) =>
      i.id !== id
        ? i
        : {
            ...i,
            [field]: value,
          }
    )

    setForm((f) => ({
      ...f,
      items: newList,
    }))
  }

  const handleRemoveQuestion = (id: number) => {
    setForm((frm) => ({
      ...frm,
      items: frm.items.filter((i) => i.id !== id),
    }))
  }

  const loadData = useCallback(async () => {
    try {
      if (params.id) {
        const req = await Api.faqs.getSingle({ id: Number(params.id) })

        if (req.ok) {
          const info = req.data

          if (info) setForm(info)
          else throw new Error()
        }
      }
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações.",
        state: "error",
        visible: true,
      })
    }
  }, [controllers.feedback, params.id])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <C.Content className="falseSubContentWrapper">
      <PageHeader type={"breadcrumb"} from={"faqs"} forForm={true} />

      <Form
        handleField={handleField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        columns={[
          {
            blocks: [
              {
                title: "Informações Básicas",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      {
                        type: "input",
                        label: "Título do FAQ",
                        placeholder: "Digite aqui...",
                        field: "title",
                        value: form.title as string,
                        gridSizes: { big: 12 },
                        limit: 50,
                      },
                    ],
                  },
                  {
                    type: "fields",
                    fields: [
                      [
                        {
                          type: "multiple",
                          label: "Perfis de acesso ao FAQ",
                          field: "accessProfiles",
                          value: form.accessProfiles,
                          options: systemOptions.accessProfiles.filter(
                            (i) => i.key !== "ADMIN"
                          ),
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
                    ],
                  },
                ],
              },
            ],
          },
          {
            blocks: [
              {
                title: "Perguntas e respostas",
                groups: [
                  {
                    type: "custom",
                    element: (
                      <List.Faq
                        handleAddQuestion={handleAddQuestion}
                        handleQuestion={handleQuestion}
                        handleRemoveQuestion={handleRemoveQuestion}
                        list={form.items}
                      />
                    ),
                  },
                  {
                    type: "custom",
                    element: (
                      <FormDefaultButtons
                        handleDelete={handleDelete}
                        handleCancel={handleCancel}
                        handleSave={handleSave}
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

export default FPfaq
