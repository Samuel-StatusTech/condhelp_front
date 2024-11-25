import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { getStore } from "../../../store"
import { TOption } from "../../../utils/@types/data/option"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"

import {
  TNewSubCategory,
  TSubCategory,
} from "../../../utils/@types/data/category/subcategories"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { Api } from "../../../api"
import { checkErrors } from "../../../utils/tb/checkErrors"

const FPsubcategory = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [form, setForm] = useState<TNewSubCategory | TSubCategory>(
    initials.forms.subcategory
  )

  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    serviceCategory: [],
  })

  const errors = () => {
    return checkErrors.subcategories(form)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handleDelete = async () => {
    try {
      const req = await Api.subcategories.delete({ id: Number(params.id) })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Categoria excluida",
        })

        navigate("/dashboard/subcategories")
      }
    } catch (error) {
      // ...
    }
  }

  const handleUpdate = async () => {
    const req = await Api.subcategories.update({
      subcategory: form as TSubCategory,
    })

    if (req.ok) {
      controllers.feedback.setData({
        visible: true,
        state: "success",
        message: "Subcategoria atualizada com sucesso",
      })

      navigate("/dashboard/subcategories")
    }
  }

  const handleCreate = async () => {
    const req = await Api.subcategories.create({
      newSubcategory: form as TNewSubCategory,
    })

    if (req.ok) {
      controllers.feedback.setData({
        visible: true,
        state: "success",
        message: "Subcategoria criada com sucesso",
      })

      navigate("/dashboard/subcategories")
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

  const loadData = useCallback(async () => {
    try {
      const catReq = await Api.categories.listAll({})

      if (catReq.ok) {
        setOptions((opts) => ({
          ...opts,
          serviceCategory: parseOptionList(catReq.data.content, "id", "name"),
        }))
      }

      if (params.id) {
        const req = await Api.subcategories.getSingle({ id: Number(params.id) })

        if (req.ok) {
          console.log({
            ...req.data,
            serviceCategory: req.data.serviceCategory.id,
          })

          setForm({ ...req.data, serviceCategory: req.data.serviceCategory.id })
        } else {
          controllers.feedback.setData({
            message: req.error,
            state: "error",
            visible: true,
          })
        }
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
    loadData()
  }, [loadData, params.id])

  return (
    <C.Content>
      <PageHeader type={"breadcrumb"} from={"subcategories"} forForm={true} />

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
                        field: "serviceCategory",
                        value: form.serviceCategory as unknown as string,
                        options: options.serviceCategory,
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
                        placeholder: "Digite aqui o nome da nova subcategoria",
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

export default FPsubcategory
