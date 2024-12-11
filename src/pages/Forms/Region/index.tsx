import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { getStore } from "../../../store"
import { TOption } from "../../../utils/@types/data/option"

import { TCity, TNewRegion } from "../../../utils/@types/data/region"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { List } from "../../../components/List"

import { Api } from "../../../api"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import { checkErrors } from "../../../utils/tb/checkErrors"

const FPregion = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [loading, setLoading] = useState(true)
  const [citiesOptions, setCitiesOptions] = useState<TCity[]>([])
  // const [pickedCity, setPickedCity] = useState<TCity | null>(null)

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

  const handleCity = async (cityStr: string) => {
    if (!!cityStr) {
      const req = await Api.cities.searchByName({
        search: cityStr,
        stateId: form.stateId,
      })

      if (req.ok) {
        const results = req.data.content

        setCitiesOptions(results)
      }
    } else setCitiesOptions([])
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
    setLoading(true)

    try {
      const req = await Api.regions.delete({ id: Number(params.id) })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Categoria excluida",
        })

        setLoading(false)

        navigate("/dashboard/regions")
      }
    } catch (error) {
      // ...

      setLoading(false)
    }
  }

  const unlinkCity = (cityId: number): boolean => {
    try {
      const newCitiesList: TCity[] = form.cities.filter(
        (city) => city.id !== cityId
      )

      setForm((reg) => ({
        ...reg,
        cities: newCitiesList,
      }))

      return true
    } catch (error) {
      return false
    }
  }

  const citiesTreat = () => {
    return form.cities
  }

  const handleUpdate = async () => {
    setLoading(true)

    try {
      const cities = await citiesTreat()

      const req = await Api.regions.update({
        region: {
          ...form,
          cities: cities,
          id: params.id as string,
        },
      })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Região atualizada com sucesso",
        })

        setLoading(false)

        navigate("/dashboard/regions")
      }
    } catch (error) {
      // ...

      setLoading(false)
    }
  }

  const handleCreate = async () => {
    setLoading(true)

    try {
      const cities = await citiesTreat()

      const req = await Api.regions.create({
        newRegion: {
          ...(form as TNewRegion),
          cities,
        },
      })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Região criada com sucesso",
        })

        setLoading(false)

        navigate("/dashboard/regions")
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Houve um erro ao cadastrar a região. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })

      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      // if (pickedCity && pickedCity.name && pickedCity.name === form.city) {
      if (params.id) handleUpdate()
      else handleCreate()
      // } else {
      //   controllers.feedback.setData({
      //     state: "alert",
      //     message: "Selecione uma cidade válida",
      //     visible: true,
      //   })
      // }
    } catch (error) {
      // ...
    }
  }

  const loadData = useCallback(async () => {
    setLoading(true)

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

      setLoading(false)
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações da região.",
        state: "error",
        visible: true,
      })

      setLoading(false)
    }
  }, [controllers.feedback, navigate, params.id])

  useEffect(() => {
    // ...
    loadData()
  }, [loadData])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

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
                        citiesOptions={citiesOptions}
                        list={form.cities}
                        unlinkCity={unlinkCity}
                        handleCity={handleCity}
                        setList={(list: any[]) => {
                          setForm((regionData) => ({
                            ...regionData,
                            cities: list,
                          }))
                        }}
                        clearSearch={() => {
                          setCitiesOptions([])
                        }}
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
                        deleteModalTitle={"Excluir Região"}
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
