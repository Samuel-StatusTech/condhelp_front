import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { getStore } from "../../../store"
import { fdata } from "../../../utils/_dev/falseData"
import { TOption } from "../../../utils/@types/data/option"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import {
  TNewSubCategory,
  TSubCategory,
} from "../../../utils/@types/data/category/subcategories"
import FormDefaultButtons from "../../../components/FormDefaultButtons"

const FPsubcategory = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [form, setForm] = useState<TNewSubCategory | TSubCategory>(
    initials.forms.subcategory
  )
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    category: [],
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    // ...
  }

  const handleField = async (field: string, value: any) => {
    setForm((f: any) => ({ ...f, [field]: value }))
  }

  const loadData = useCallback(async () => {
    try {
      const cats = parseOptionList(fdata.categories, "id", "name")

      setTimeout(() => {
        setOptions((opts) => ({
          ...opts,
          category: cats,
        }))

        if (params.id) {
          const subData = fdata.subcategories.find((i) => i.id === params.id)

          if (subData) {
            setForm({
              id: params.id,
              name: subData.name,
              parent: subData.parent.id as number,
            })
          } else {
            throw new Error()
          }
        }
      }, 1000)
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as categorias.",
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
      <PageHeader type={"breadcrumb"} from={"categories"} forForm={true} />

      <Form
        handleField={handleField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        columns={[
          {
            blocks: [
              {
                title: "Categoria pai",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      {
                        type: "select",
                        placeholder: "Categoria pai",
                        field: "parent",
                        value: form.parent as string,
                        options: options.category,
                        gridSizes: { big: 12 },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            blocks: [
              {
                title: "Nome da subcategoria",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      {
                        type: "input",
                        placeholder: "Digite aqui o nome da nova categoria",
                        field: "name",
                        value: form.name,
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
            ],
          },
        ]}
      />
    </C.Content>
  )
}

export default FPsubcategory
