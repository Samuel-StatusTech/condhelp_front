import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { getStore } from "../../../store"
import { TOption } from "../../../utils/@types/data/option"

import { TNewRegion } from "../../../utils/@types/data/region"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { List } from "../../../components/List"
import ImportCsvArea from "../../../components/ImportCsvArea"
import { Api } from "../../../api"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import { checkErrors } from "../../../utils/tb/checkErrors"

const FPregion = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [changedCountryState, setChangedCountryState] = useState(false)
  const [form, setForm] = useState<TNewRegion>(initials.forms.region)
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    country: [],
    state: [],
  })

  const errors = () => {
    return checkErrors.regions(form)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handleLoadCsv = (list: any[]) => {
    // ...
  }

  const handleField = async (field: string, value: any) => {
    if (!changedCountryState) {
      if (
        (field === "country" && !!form.countryId) ||
        (field === "state" && !!form.stateId)
      )
        setChangedCountryState(true)
    }

    setForm((f: any) => ({ ...f, [field]: value }))
  }

  const handleDelete = async () => {
    try {
      const req = await Api.regions.delete({ id: Number(params.id) })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Categoria excluida",
        })

        navigate("/dashboard/regions")
      }
    } catch (error) {
      // ...
    }
  }

  const handleUpdate = async () => {
    try {
      await citiesTreat()

      const req = await Api.regions.update({
        region: { ...form, id: params.id as string },
      })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Região atualizada com sucesso",
        })

        navigate("/dashboard/regions")
      }
    } catch (error) {
      // ...
    }
  }

  const citiesTreat = async () => {
    try {
      let proms: Promise<any>[] = []

      if (changedCountryState) {
        form.cities.forEach(async (item) => {
          if (item.isNew && !!item.name.trim()) {
            proms.push(
              Api.cities
                .create({
                  newCity: {
                    stateId: Number(form.stateId),
                    name: item.name,
                  },
                })
                .then((res) => {
                  if (res.ok) {
                    setForm((reg) => ({
                      ...reg,
                      cities: reg.cities.map((i) => {
                        return i.id !== item.id ? i : { ...i, id: res.data.id }
                      }),
                    }))
                  }
                })
            )
          } else {
            proms.push(
              Api.cities.update({
                city: {
                  id: item.id,
                  stateId: Number(form.stateId),
                  name: item.name,
                },
              })
            )
          }
        })
      } else {
        form.cities.forEach(async (item) => {
          if (item.isNew && !!item.name.trim()) {
            proms.push(
              Api.cities
                .create({
                  newCity: {
                    stateId: Number(form.stateId),
                    name: item.name,
                  },
                })
                .then((res) => {
                  if (res.ok) {
                    setForm((reg) => ({
                      ...reg,
                      cities: reg.cities.map((i) => {
                        return i.id !== item.id ? i : { ...i, id: res.data.id }
                      }),
                    }))
                  }
                })
            )
          } else if (item.isEdit) {
            proms.push(
              Api.cities.update({
                city: {
                  id: item.id,
                  stateId: Number(form.stateId),
                  name: item.name,
                },
              })
            )
          }
        })
      }

      await Promise.all(proms)
    } catch (error) {
      // ...
    }
  }

  const handleCreate = async () => {
    try {
      await citiesTreat()

      const req = await Api.regions.create({
        newRegion: form as TNewRegion,
      })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Região criada com sucesso",
        })

        navigate("/dashboard/regions")
      }
    } catch (error) {
      // ...
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

  const loadData = useCallback(async () => {
    try {
      const countriesReq = await Api.countries.listAll({}).then((res) => {
        if (res.ok) {
          setOptions((opts) => ({
            ...opts,
            country: parseOptionList(res.data.content, "id", "name"),
          }))
        } else {
          controllers.feedback.setData({
            message:
              "Houve um erro ao carregar informações para cadastro. Tente novamente mais tarde.",
            state: "error",
            visible: true,
          })
          navigate(-1)
        }
      })
      const statesReq = await Api.states.listAll({}).then((res) => {
        if (res.ok) {
          setOptions((opts) => ({
            ...opts,
            state: parseOptionList(res.data.content, "id", "name"),
          }))
        } else {
          controllers.feedback.setData({
            message:
              "Houve um erro ao carregar informações para cadastro. Tente novamente mais tarde.",
            state: "error",
            visible: true,
          })
          navigate(-1)
        }
      })

      await Promise.all([countriesReq, statesReq]).catch((err) => {
        controllers.feedback.setData({
          message:
            "Houve um erro ao carregar informações para cadastro. Tente novamente mais tarde.",
          state: "error",
          visible: true,
        })
        navigate(-1)
      })

      if (params.id) {
        const req = await Api.regions.getSingle({ id: Number(params.id) })

        if (req.ok) {
          console.log(req.data)
          setForm({
            name: req.data.name,
            countryId: req.data.country.id as any,
            stateId: req.data.state.id as any,
            cities: req.data.cities,
          })
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
        message: "Não foi possível carregar as informações da região.",
        state: "error",
        visible: true,
      })
    }
  }, [controllers.feedback, navigate, params.id])

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
                          field: "countryId",
                          value: form.countryId as string,
                          options: options.country,
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "select",
                          label: "Estado",
                          placeholder: "Estado",
                          field: "stateId",
                          value: form.stateId as string,
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
            ],
          },
          {
            blocks: [
              {
                title: "Cidades",
                groups: [
                  {
                    type: "custom",
                    element: (
                      <List.Cities
                        list={form.cities}
                        categoryId={params.id}
                        setList={(list: any[]) =>
                          setForm((regionData) => ({
                            ...regionData,
                            cities: list,
                          }))
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

export default FPregion
