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
import { fdata } from "../../../utils/_dev/falseData"

const FPcategory = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [form, setForm] = useState(initials.forms.category)
  const [subcategories, setSubcategories] = useState<TSubCategory[]>([])

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    // ...
  }

  const handleField = async (field: string, value: any) => {
    setForm((f: any) => ({ ...f, [field]: value }))
  }

  const loadCategoryData = useCallback(async () => {
    try {
      setTimeout(() => {
        setSubcategories(
          fdata.subcategories.filter((sc) => sc.parent.id === params.id)
        )
      }, 1000)
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
        blocks={[
          {
            title: "Nome da categoria",
            groups: [
              {
                type: "fields",
                fields: [
                  {
                    type: "input",
                    label: "Digite aqui o nome da nova categoria",
                    field: "name",
                    value: form.name,
                  },
                ],
              },
            ],
          },
          {
            title: "Subcategorias",
            groups: [
              {
                type: "custom",
                element: (
                  <List.Subcategories
                    list={subcategories}
                    categoryId={params.id}
                    handleDelete={() => {}}
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

export default FPcategory
