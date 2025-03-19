import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"
import * as S from "./styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { getStore } from "../../../store"
import { TOption } from "../../../utils/@types/data/option"

import { TCity, TNewRegion, TState } from "../../../utils/@types/data/region"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { List } from "../../../components/List"

import { Api } from "../../../api"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import { checkErrors } from "../../../utils/tb/checkErrors"
import Button from "../../../components/Button"
import { Icons } from "../../../assets/icons/icons"
import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"

const FPregion = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [loading, setLoading] = useState(true)
  const [citiesOptions, setCitiesOptions] = useState<TCity[]>([])
  const [states, setStates] = useState<TState[]>([])

  // const [pickedCity, setPickedCity] = useState<TCity | null>(null)

  const [changedCountryState, setChangedCountryState] = useState(false)
  const [form, setForm] = useState<TNewRegion>(initials.forms.region)
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    country: [],
    state: [],
  })

  const [errors, setErrors] = useState<TErrorsCheck>({
    fields: [],
    has: false,
  })

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
        const alreadyAdded = form.cities.map((c) => c.id)

        const choosable = results.filter((i) => !alreadyAdded.includes(i.id))

        setCitiesOptions(choosable)
      }
    } else setCitiesOptions([])
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

    if (!changedCountryState) {
      if (
        (field === "country" && !!form.countryId) ||
        (field === "state" && !!form.stateId)
      )
        setChangedCountryState(true)
    }

    setForm((f: any) => ({ ...f, [field]: value }))
  }

  const onDeleteConfirm = async () => {
    setLoading(true)

    try {
      const req = await Api.regions.delete({ id: Number(params.id) })

      if (req.ok) {
        controllers.feedback.setData({
          visible: true,
          state: "success",
          message: "Região excluída",
        })

        setLoading(false)

        navigate("/dashboard/regions")
      } else {
        controllers.feedback.setData({
          message: req.error,
          state: "error",
          visible: true,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Não foi possível excluir a região. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })

      setLoading(false)
    }
  }

  const handleDelete = () => {
    controllers.modal.open({
      role: "confirmDelete",
      visible: true,
      data: {
        title: "Excluir região",
        deleteTextDescriptor: "excluir esta região",
      },
      handleOp: () => onDeleteConfirm(),
    })
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
    const isOk = form.cities.every((c) => !c.notPicked && !!c.name)

    return isOk ? form.cities : null
  }

  const handleUpdate = async () => {
    setLoading(true)

    try {
      const cities = await citiesTreat()

      if (cities) {
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
      } else {
        controllers.feedback.setData({
          message:
            "Verifique as cidades novamente. Todas as cidades devem ser válidas.",
          state: "error",
          visible: true,
        })

        setLoading(false)
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

      if (cities) {
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
      } else {
        controllers.feedback.setData({
          message:
            "Verifique as cidades novamente. Todas as cidades devem ser válidas.",
          state: "error",
          visible: true,
        })

        setLoading(false)
      }
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

  const updateErrors = () => {
    const check = checkErrors.regions(form)
    return check
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
          const results = res.data.content

          setStates(results)
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
    if (form && form.countryId) {
      const availableStates = states.filter(
        (s) => Number(s.country.id) === Number(form.countryId)
      )

      setOptions((opt) => ({
        ...opt,
        state: parseOptionList(availableStates, "id", "name"),
      }))
    }
  }, [form, states])

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
                        error: {
                          has: errors.fields.includes("name"),
                          message: "Digite o nome",
                        },
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
                          error: {
                            has: errors.fields.includes("countryId"),
                            message: "Escolha o país",
                          },
                        },
                        {
                          type: "select",
                          label: "Estado",
                          placeholder: "Estado",
                          field: "stateId",
                          value: form.stateId as string,
                          options: options.state,
                          gridSizes: { big: 6, small: 12 },
                          error: {
                            has: errors.fields.includes("stateId"),
                            message: "Escolha o estado",
                          },
                        },
                      ],
                    ],
                  },
                  {
                    type: "custom",
                    element: (
                      <S.Buttons className="buttonsArea">
                        <Button
                          type="quaternary"
                          action={params.id ? handleDelete : () => {}}
                          text={"Excluir região"}
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

export default FPregion
