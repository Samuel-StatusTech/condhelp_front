import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { getStore } from "../../../store"
import { fdata } from "../../../utils/_dev/falseData"
import { TOption } from "../../../utils/@types/data/option"

import { TNewErrand, TErrand } from "../../../utils/@types/data/errand"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import ErrandStatusIndicador from "../../../components/ErrandStatusIndicator"

const FPerrand = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [form, setForm] = useState<TNewErrand | TErrand>(initials.forms.errand)
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    branch: [],
    franchise: [],
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    // ...
  }

  const handleSend = (list: any[]) => {
    // ...
  }

  const handleField = async (field: string, value: any) => {
    if (Object.keys(form.target).includes(field))
      setForm((f: any) => ({ ...f, target: { ...f.target, [field]: value } }))
    else if (Object.keys(form.content).includes(field))
      setForm((f: any) => ({ ...f, content: { ...f.content, [field]: value } }))
    else setForm((f: any) => ({ ...f, [field]: value }))
  }

  const loadData = useCallback(async () => {
    try {
      setTimeout(() => {
        setOptions((opts) => ({
          ...opts,
          branch: parseOptionList(
            [
              { id: "1", name: "K1" },
              { id: "2", name: "K2" },
            ],
            "id",
            "name"
          ),
          franchise: parseOptionList(
            [
              { id: "1", name: "K1" },
              { id: "2", name: "K2" },
            ],
            "id",
            "name"
          ),
        }))

        if (params.id) {
          const info = fdata.errands.find((i) => i.id === params.id)

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
    <C.Content>
      <PageHeader type={"breadcrumb"} from={"errands"} forForm={true} />

      <Form
        handleField={handleField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        blocks={[
          {
            title: "Informações Básicas",
            groups: [
              {
                type: "fields",
                fields: [
                  {
                    type: "input",
                    label: "Título do recado",
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
                      type: "select",
                      label: "Perfis de destino",
                      placeholder: "País",
                      field: "branch",
                      value: form.target.branch as string,
                      options: options.branch,
                      gridSizes: { big: 6, small: 12 },
                    },
                    {
                      type: "select",
                      field: "franchise",
                      placeholder: "Franquia",
                      value: form.target.franchise as string,
                      options: options.franchise,
                      gridSizes: { big: 6, small: 12 },
                      alignBottom: true,
                    },
                  ],
                ],
              },
              {
                type: "custom",
                element: (
                  <ErrandStatusIndicador
                    status={form.status}
                    action={handleSend}
                  />
                ),
              },
            ],
          },
          {
            title: "Conteúdo do recado",
            groups: [
              {
                type: "fields",
                fields: [
                  {
                    type: "image",
                    field: "image",
                    value: form.content.image,
                    gridSizes: { big: 12 },
                    height: 140,
                  },
                  {
                    type: "textarea",
                    field: "message",
                    value: form.content.message,
                    label: "Mensagem",
                    placeholder: "Digite aqui a sua mensagem",
                    limit: 600,
                    gridSizes: { big: 12 },
                  },
                ],
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
        ]}
      />
    </C.Content>
  )
}

export default FPerrand
