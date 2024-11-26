import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { getStore } from "../../../store"
import { fdata } from "../../../utils/_dev/falseData"

import { TNewFaq, TFaq } from "../../../utils/@types/data/faq"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { List } from "../../../components/List"
import { systemOptions } from "../../../utils/system/options"

const FPfaq = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [form, setForm] = useState<TNewFaq | TFaq>(initials.forms.faq)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    // ...
  }

  const handleField = async (field: string, value: any) => {
    if (field === "profile") {
      if (form.profile.includes(value)) {
        setForm((f: any) => ({
          ...f,
          profile: f.profile.filter((i: any) => i !== value),
        }))
      } else {
        setForm((f: any) => ({ ...f, profile: [...f.profile, value] }))
      }
    } else {
      setForm((f: any) => ({ ...f, [field]: value }))
    }
  }

  const handleAddQuestion = () => {
    // ...
  }

  const handleQuestion: (id: any, field: string, value: string) => void = (
    id,
    field,
    value
  ) => {
    // ...
    const newList = form.questions.map((i) =>
      i.id !== id
        ? i
        : {
            ...i,
            [field]: value,
          }
    )

    setForm((f) => ({
      ...f,
      questions: newList,
    }))
  }

  const handleRemoveQuestion = () => {
    // ...
  }

  const loadData = useCallback(async () => {
    try {
      setTimeout(() => {
        if (params.id) {
          const info = fdata.faqs.find((i) => i.id === params.id)

          if (info) {
            setForm(info)
          } else {
            throw new Error()
          }
        }
      }, 1000)
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações.",
        state: "error",
        visible: true,
      })
    }
  }, [controllers.feedback, params.id])

  useEffect(() => {
    // ...
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
                          field: "profile",
                          value: form.profile,
                          options: systemOptions.profiles.filter(
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
                        list={form.questions}
                      />
                    ),
                  },
                  {
                    type: "custom",
                    element: (
                      <FormDefaultButtons
                        handleDelete={() => {}}
                        handleCancel={() => {}}
                        handleSave={() => {}}
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
