import { useCallback, useEffect, useState } from "react"
import * as S from "./styled"
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
import Button from "../../../components/Button"
import { Icons } from "../../../assets/icons/icons"
import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"

const FPcategory = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { user, controllers } = getStore()

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<TNewCategory | TCategory>(
    initials.forms.category
  )

  const [errors, setErrors] = useState<TErrorsCheck>({
    fields: [],
    has: false,
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const onConfirmDelete = async () => {
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
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        visible: true,
        state: "error",
        message:
          "Houve um erro ao excluir a categoria. Tente novamente mais tarde.",
      })

      setLoading(false)
    }
  }

  const handleDelete = () => {
    controllers.modal.open({
      role: "confirmDelete",
      visible: true,
      data: {
        title: "Excluir categoria",
        deleteTextDescriptor: "excluir esta categoria",
      },
      handleOp: () => onConfirmDelete(),
    })
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

  const generateNewSubCategory = (name: string, categoryId: number) => {
    const obj: TNewSubCategory = {
      name,
      serviceCategory: categoryId,
      // @ts-ignore
      branchId: ((user?.branchId ?? user?.subsidiaryId) as number) ?? null,
      // @ts-ignore
      franqId: ((user?.franqId ?? user?.franchiseId) as number) ?? null,
    }

    return obj
  }

  const subcategoriesTreat = async (catId: number) => {
    try {
      let proms: Promise<any>[] = []

      form.serviceSubcategories.forEach((item) => {
        if (!!item.name?.trim()) {
          if (item.isNew) {
            const newSubCat = generateNewSubCategory(item.name, catId)

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
            const subCatInfo: TSubCategory = {
              ...(item as TSubCategory),
              // @ts-ignore
              serviceCategoryId: catId,
            }

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

  const getCategoryObj = () => {
    let branchId = null
    let franqId = null

    switch (user?.profile) {
      case "REDE":
        branchId = user?.userId
        break
      case "FRANQUEADO":
        branchId = user?.branchId
        franqId = user?.userId
        break
      case "SINDICO":
        branchId = user?.branchId
        franqId = user?.franqId
        break
      default:
        break
    }

    const obj: TNewCategory = {
      active: true,
      branchId: branchId,
      franqId: franqId,
      description: form.description,
      name: form.name,
      serviceSubcategories: [],
    }

    return obj
  }

  const handleCreate = async () => {
    setLoading(true)

    try {
      const obj = getCategoryObj()

      const req = await Api.categories.create({ newCategory: obj })

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

  const updateErrors = () => {
    const check = checkErrors.categories(form)
    return check
  }

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
                        error: {
                          has: errors.fields.includes("name"),
                          message: "Digite o nome",
                        },
                      },
                    ],
                  },
                  {
                    type: "custom",
                    element: (
                      <S.Buttons className="buttonsArea">
                        <Button
                          type="quaternary"
                          action={params.id ? handleDelete : () => {}}
                          text={"Excluir categoria"}
                          icon={<Icons.Trash />}
                          iconLeft={true}
                          fit={true}
                          disabled={!params.id}
                        />
                      </S.Buttons>
                    ),
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
                        handleCancel={handleCancel}
                        handleSave={handleSave}
                        disabled={errors.has}
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
