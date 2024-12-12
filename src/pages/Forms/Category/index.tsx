import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"
import Divider from "../../../components/_minimals/Divider"
import { List } from "../../../components/List"
import {
  TNewSubCategory,
  TSubCategory,
} from "../../../utils/@types/data/category/subcategories"
import { getStore } from "../../../store"

import { Api } from "../../../api"
import { TCategory, TNewCategory } from "../../../utils/@types/data/category"
import { checkErrors } from "../../../utils/tb/checkErrors"
import FormDefaultButtons from "../../../components/FormDefaultButtons"

const FPcategory = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<TNewCategory | TCategory>(
    initials.forms.category
  )

  const errors = () => {
    return checkErrors.categories(form)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handleDelete = async () => {
    setLoading(true)

    try {
      const req = await Api.categories.delete({ id: Number(params.id) })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Categoria excluída",
        })

        setLoading(false)

        navigate("/dashboard/categories")
      }
    } catch (error) {
      // ...

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

  const handleUpdate = async () => {
    setLoading(true)

    try {
      const req = await Api.categories.update({ category: form as TCategory })

      if (req.ok) {
        await subcategoriesTreat(req.data.id)

        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Categoria atualizada com sucesso",
        })

        navigate("/dashboard/categories")
      }

      setLoading(false)
    } catch (error) {
      // ...

      setLoading(false)
    }
  }

  const subcategoriesTreat = async (catId: number) => {
    try {
      let proms: Promise<any>[] = []

      form.serviceSubcategories.forEach((item) => {
        if (!!item.name?.trim()) {
          if (item.isNew) {
            const newSubCat: TNewSubCategory = {
              name: item.name,
              serviceCategory: catId,
            }

            proms.push(
              Api.subcategories
                .create({ newSubcategory: newSubCat })
                .then((res) => {
                  if (res.ok) {
                    setForm((frm) => ({
                      ...frm,
                      serviceSubcategories: frm.serviceSubcategories.map(
                        (i) => {
                          return i.id !== item.id
                            ? i
                            : { ...i, id: res.data.id }
                        }
                      ),
                    }))
                  }
                })
            )
          } else {
            const subCatInfo: TSubCategory = item as TSubCategory

            proms.push(
              Api.subcategories.update({
                subcategory: subCatInfo,
              })
            )
          }
        } else {
          throw new Error()
        }
      })

      await Promise.all(proms)
    } catch (error) {
      // ...
    }
  }

  const handleCreate = async () => {
    setLoading(true)

    try {
      const req = await Api.categories.create({ newCategory: form })

      if (req.ok) {
        await subcategoriesTreat(req.data.id)

        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Categoria criada com sucesso",
        })

        setLoading(false)
        navigate("/dashboard/categories")
      }
    } catch (error) {
      // ...

      setLoading(false)
    }
  }

  const handleField = async (field: string, value: any) => {
    setForm((f: any) => ({ ...f, [field]: value }))
  }

  const loadCategoryData = useCallback(async () => {
    setLoading(true)

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

      setLoading(false)
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações da categoria.",
        state: "error",
        visible: true,
      })

      setLoading(false)
    }
  }, [controllers.feedback, params.id])

  useEffect(() => {
    // ...
    if (params.id) {
      loadCategoryData()
    }
  }, [loadCategoryData, params.id])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

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
                        list={form.serviceSubcategories}
                        setList={(list) =>
                          handleField("serviceSubcategories", list)
                        }
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
                        disabled={errors().has}
                        deleteModalTitle={"Excluir Categoria"}
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
