import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"
import Divider from "../../../components/_minimals/Divider"
import { List } from "../../../components/List"
import { TSubCategory } from "../../../utils/@types/data/category/subcategories"
import { getStore } from "../../../store"

import { Api } from "../../../api"
import { TCategory, TNewCategory } from "../../../utils/@types/data/category"
import { checkErrors } from "../../../utils/tb/checkErrors"

const FPcategory = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [form, setForm] = useState<TNewCategory | TCategory>(
    initials.forms.category
  )

  const errors = () => {
    return checkErrors.categories(form)
  }

  const [subcategories, setSubcategories] = useState<TSubCategory[]>([])

  const handleCancel = () => {
    navigate(-1)
  }

  const handleDelete = async () => {
    try {
      const req = await Api.categories.delete({ id: Number(params.id) })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Categoria excluida",
        })

        navigate("/dashboard/categories")
      }
    } catch (error) {
      // ...
    }
  }

  const handleUpdate = async () => {
    const req = await Api.categories.update({ category: form as TCategory })

    if (req.ok) {
      controllers.feedback.setData({
        visible: true,
        state: "success",
        message: "Categoria atualizada com sucesso",
      })

      navigate("/dashboard/categories")
    }
  }

  const handleCreate = async () => {
    const req = await Api.categories.create({ newCategory: form })

    if (req.ok) {
      controllers.feedback.setData({
        visible: true,
        state: "success",
        message: "Categoria criada com sucesso",
      })

      navigate("/dashboard/categories")
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

  const handleField = async (field: string, value: any) => {
    setForm((f: any) => ({ ...f, [field]: value }))
  }

  const loadCategoryData = useCallback(async () => {
    try {
      const req = await Api.categories.getSingle({ id: Number(params.id) })

      if (req.ok) {
        setForm(req.data)
      } else {
        controllers.feedback.setData({
          message: req.error,
          state: "error",
          visible: true,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações da categoria.",
        state: "error",
        visible: true,
      })
    }
  }, [controllers.feedback, params.id])

  useEffect(() => {
    // ...
    if (params.id) {
      loadCategoryData()
    }
  }, [loadCategoryData, params.id])

  return (
    <C.Content>
      <PageHeader type={"breadcrumb"} from={"categories"} forForm={true} />

      <Divider />

      <Form
        handleField={handleField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        columns={[
          {
            blocks: [
              {
                title: "Nome da categoria",
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
                ],
              },
            ],
          },
          {
            blocks: [
              {
                title: "Subcategorias",
                groups: [
                  {
                    type: "custom",
                    element: (
                      <List.Subcategories
                        list={subcategories}
                        categoryId={params.id}
                        handleDelete={handleDelete}
                        handleCancel={handleCancel}
                        handleSave={handleSave}
                        disabled={errors().has}
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

export default FPcategory
