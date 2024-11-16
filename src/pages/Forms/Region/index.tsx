import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { getStore } from "../../../store"
import { fdata } from "../../../utils/_dev/falseData"
import { TOption } from "../../../utils/@types/data/option"

import { TNewRegion, TRegion } from "../../../utils/@types/data/region"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { systemOptions } from "../../../utils/system/options"
import { List } from "../../../components/List"
import ImportCsvArea from "../../../components/ImportCsvArea"

const FPregion = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [form, setForm] = useState<TNewRegion | TRegion>(initials.forms.region)
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    country: [],
    state: [],
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = async () => {
    // ...
  }

  const handleLoadCsv = (list: any[]) => {
    // ...
  }

  const handleField = async (field: string, value: any) => {
    setForm((f: any) => ({ ...f, [field]: value }))
  }

  const loadData = useCallback(async () => {
    try {
      setTimeout(() => {
        setOptions((opts) => ({
          ...opts,
          country: [{ key: "br", value: "Brasil" }],
          state: systemOptions.states,
        }))

        if (params.id) {
          const regionData = fdata.regions.find((i) => i.id === params.id)

          if (regionData) {
            setForm({
              ...regionData,
              cities: regionData.cities,
            })
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
      <PageHeader type={"breadcrumb"} from={"regions"} forForm={true} />

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
                    label: "Nome da região",
                    placeholder: "Digite aqui...",
                    field: "name",
                    value: form.name as string,
                    gridSizes: { big: 12 },
                  },
                  [
                    {
                      type: "select",
                      label: "País",
                      placeholder: "País",
                      field: "country",
                      value: form.country as string,
                      options: options.country,
                      gridSizes: { big: 6, small: 12 },
                    },
                    {
                      type: "select",
                      label: "Estado",
                      placeholder: "Estado",
                      field: "state",
                      value: form.state as string,
                      options: options.state,
                      gridSizes: { big: 6, small: 12 },
                    },
                  ],
                ],
              },
              {
                type: "custom",
                element: <ImportCsvArea onLoadList={handleLoadCsv} />,
              },
            ],
          },
          {
            title: "Cidades",
            groups: [
              {
                type: "custom",
                element: (
                  <List.Cities
                    list={form.cities}
                    categoryId={params.id}
                    handleDelete={() => {}}
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
        ]}
      />
    </C.Content>
  )
}

export default FPregion
