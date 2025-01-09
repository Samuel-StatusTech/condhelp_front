import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { getStore } from "../../../store"

import { TOption } from "../../../utils/@types/data/option"
import { formatCNPJ } from "../../../utils/tb/format/cnpj"
import {
  TNewCondominium,
  TCondominium,
} from "../../../utils/@types/data/condominium"
import FormDefaultButtons from "../../../components/FormDefaultButtons"
import { systemOptions } from "../../../utils/system/options"
import { parseOptionList } from "../../../utils/tb/parsers/parseOptionList"
import { checkErrors } from "../../../utils/tb/checkErrors"
import { formatCep } from "../../../utils/tb/format/cep"
import { Api } from "../../../api"
import { TUserTypes } from "../../../utils/@types/data/user"
import { getDateStr } from "../../../utils/tb/format/date"
import { FormField } from "../../../utils/@types/components/FormFields"
import { TCity, TState } from "../../../utils/@types/data/region"

const FPcondo = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { user, controllers } = getStore()

  const [loading, setLoading] = useState(true)

  const [managers, setManagers] = useState<TUserTypes["SINDICO"][]>([])
  const [form, setForm] = useState<TNewCondominium | TCondominium>(
    initials.forms.condo
  )

  const [pickedCity, setPickedCity] = useState<TCity | null>(null)

  const [states, setStates] = useState<TState[]>([])

  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    managers: [],
    state: systemOptions.states,
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const getObj = (): TNewCondominium | TCondominium => {
    const obj: any = {
      name: form.name,
      unities: Number(form.unities),
      cnpj: form.cnpj,
      address: form.address,
      addressNumber: form.addressNumber,
      zipCode: form.zipCode,
      neighborhood: form.neighborhood,
      city: form.city,
      federateUnit: form.federateUnit,
      electionDate: getDateStr(form.electionDate, "javaDateTime"),
      managerId: Number(
        form.manager.userId ?? (form as TNewCondominium).managerId
      ),
    }

    return params.id && !Number.isNaN(params.id)
      ? { ...obj, id: params.id }
      : obj
  }

  const handleUpdate = async () => {
    setLoading(true)

    try {
      // check errors

      const obj = getObj()

      const req = await Api.condos.update({
        condo: obj as TCondominium,
      })

      if (req.ok) {
        controllers.feedback.setData({
          message: "Condomínio atualizado com sucesso.",
          state: "success",
          visible: true,
        })

        setLoading(false)

        navigate("/dashboard/condos")
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Não foi possível atualizar o condomínio. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })

      setLoading(false)
    }
  }

  const handleCreate = async () => {
    setLoading(true)

    try {
      // check errors

      const obj = getObj()

      const req = await Api.condos.create({ newCondo: obj })

      if (req.ok) {
        controllers.feedback.setData({
          message: "Condomínio criado com sucesso.",
          state: "success",
          visible: true,
        })

        setLoading(false)

        navigate("/dashboard/condos")
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Não foi possível criar o condomínio. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })

      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (pickedCity && pickedCity.name && pickedCity.name === form.city) {
      if (params.id) handleUpdate()
      else handleCreate()
    } else {
      controllers.feedback.setData({
        state: "alert",
        message: "Selecione uma cidade válida",
        visible: true,
      })
    }
  }

  const handleDelete = async () => {
    setLoading(true)

    if (params.id) {
      try {
        if (Number.isNaN(params.id)) throw new Error()
        else {
          const req = await Api.condos.delete({ id: Number(params.id) })

          if (req.ok) {
            controllers.feedback.setData({
              message: "Condomínio excluída com sucesso.",
              state: "success",
              visible: true,
            })

            setLoading(false)

            navigate("/dashboard/condos")
          } else throw new Error()
        }
      } catch (error) {
        controllers.feedback.setData({
          message:
            "Não foi possível excluir o condomínio. Tente novamente mais tarde.",
          state: "error",
          visible: true,
        })

        setLoading(false)
      }
    }
  }

  const handleField = async (field: string, value: any) => {
    if (field === "managerId") {
      const m = managers.find((i) => i.userId === value)

      setForm((f: any) => ({ ...f, manager: m }))
    } else if (field === "managerSince") {
      setForm((f: any) => ({
        ...f,
        manager: { ...f.manager, managerSince: value },
      }))
    } else if (field === "unities")
      setForm((f: any) => ({ ...f, unities: String(value).replace(/\D/g, "") }))
    else if (Object.keys(form.address).includes(field))
      setForm((f: any) => ({ ...f, address: { ...f.address, [field]: value } }))
    else setForm((f: any) => ({ ...f, [field]: value }))
  }

  const getCityId = useCallback(
    async (cityName: string) => {
      try {
        const req = await Api.cities.searchByName({ search: cityName })

        if (req.ok) {
          const specific = req.data.content.find((c) => c.name === cityName)

          if (specific) setPickedCity(specific)
          else throw new Error()
        } else throw new Error()
      } catch (error) {
        controllers.feedback.setData({
          state: "alert",
          message: "Cidade não encontrada.",
          visible: true,
        })
      }
    },
    [controllers.feedback]
  )

  const loadEditInfo = useCallback(async () => {
    if (params.id && !Number.isNaN(params.id)) {
      const infoReq = await Api.condos.getSingle({ id: Number(params.id) })

      if (infoReq.ok) {
        getCityId(infoReq.data.city)

        setForm((frm) => ({ ...frm, ...infoReq.data }))
      } else {
        controllers.feedback.setData({
          state: "alert",
          message:
            "Não foi possível carregar as informações do condomínio. Tente novamente mais tarde.",
          visible: true,
        })
      }
    }
  }, [controllers.feedback, getCityId, params.id])

  const handleSelectCity = (city: TCity) => {
    setPickedCity(city)

    setForm((frm) => ({
      ...frm,
      cityId: city.id,
    }))
  }

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const statesReq = await Api.states.listAll({ size: 1000 })

      if (statesReq.ok) {
        setStates(statesReq.data.content)
        setOptions((opts) => ({
          ...opts,
          state: parseOptionList(statesReq.data.content, "initials", "name"),
        }))
      }

      if (user?.profile === "SINDICO") {
        setForm((frm) => ({ ...frm, managerId: user?.userId, manager: user }))
        loadEditInfo()
      } else {
        const managersReq = await Api.persons.getByRole({ role: "SINDICO" })

        if (managersReq.ok) {
          setManagers(managersReq.data.content as TUserTypes["SINDICO"][])
          setOptions((opts) => ({
            ...opts,
            managers: parseOptionList(
              managersReq.data.content,
              "userId",
              "name"
            ),
          }))

          loadEditInfo()
        } else throw new Error()
      }

      setLoading(false)
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Não foi possível carregar as informações. Tente novamente mais tarde",
        state: "error",
        visible: true,
      })

      setLoading(false)
    }
  }, [controllers, loadEditInfo, user])

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

  const errors = () => {
    return checkErrors.condos(form)
  }

  return (
    <C.Content>
      <PageHeader type={"breadcrumb"} from={"condos"} forForm={true} />

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
                      [
                        {
                          type: "input",
                          label: "Nome do condomínio",
                          field: "name",
                          placeholder: "Digite aqui",
                          value: form.name,
                          gridSizes: {
                            big: 10,
                            small: 9,
                          },
                        },
                        {
                          type: "input",
                          label: "Unidades",
                          field: "unities",
                          value: String(form.unities),
                          gridSizes: {
                            big: 2,
                            small: 3,
                          },
                        },
                      ],
                      {
                        type: "input",
                        label: "CNPJ",
                        field: "cnpj",
                        placeholder: "Digite aqui",
                        value: formatCNPJ(form.cnpj),
                        gridSizes: {
                          big: 12,
                        },
                      },
                      {
                        type: "image",
                        label: "Foto do condomínio",
                        field: "image",
                        value: form.image,
                        gridSizes: { big: 12 },
                        height: 140,
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
                title: "Informações Complementares",
                groups: [
                  {
                    type: "fields",
                    fields: [
                      [
                        {
                          type: "input",
                          label: "Endereço",
                          field: "address",
                          placeholder: "Digite aqui",
                          value: form.address,
                          gridSizes: { big: 8, small: 12 },
                        },
                        {
                          type: "input",
                          label: "Nº",
                          field: "addressNumber",
                          placeholder: "Digite aqui",
                          value: form.addressNumber,
                          gridSizes: { big: 2, small: 6 },
                        },
                        {
                          type: "input",
                          label: "CEP",
                          field: "zipCode",
                          placeholder: "Digite aqui",
                          value: formatCep(form.zipCode),
                          gridSizes: { big: 2, small: 6 },
                          fixedWidth: 112
                        },
                      ],
                      [
                        {
                          type: "input",
                          label: "Bairro",
                          field: "neighborhood",
                          placeholder: "Digite aqui",
                          value: form.neighborhood,
                          gridSizes: { big: 5, small: 12 },
                        },
                        {
                          type: "cityInput",
                          label: "Cidade",
                          field: "city",
                          placeholder: "Digite aqui",
                          value: form.city,
                          gridSizes: { big: 5, small: 6 },
                          stateId: states.find(
                            (s) => s.initials === form.federateUnit
                          )?.id,
                          onSelectCity: handleSelectCity,
                        },
                        {
                          type: "select",
                          label: "UF",
                          field: "federateUnit",
                          value: form.federateUnit,
                          gridSizes: { big: 2, small: 6 },
                          options: options.state,
                          byKey: true,
                          fixedWidth: 112
                        },
                      ],
                      [
                        ...((user && user.profile === "SINDICO"
                          ? [
                              {
                                type: "readonly",
                                label: "Síndico",
                                field: "",
                                value: `${user.name} (você)`,
                                gridSizes: { big: 9, small: 6 },
                              },
                            ]
                          : [
                              {
                                type: "select",
                                label: "Síndico",
                                field: "managerId",
                                // @ts-ignore
                                value: form.manager.userId,
                                gridSizes: { big: 9, small: 6 },
                                options: options.managers,
                              },
                            ]) as FormField[]),
                        {
                          type: "date",
                          label: "Data da eleição",
                          field: "electionDate",
                          value: new Date(form.electionDate),
                          gridSizes: { big: 3, small: 6 },
                          maxDate: new Date(),
                          fixedWidth: 138
                        },
                      ],
                    ],
                  },
                  {
                    type: "fields",
                    fields: [
                      {
                        type: "file",
                        label: "Ata da eleição",
                        field: "electionFile",
                        value: form.electionFile,
                        gridSizes: { big: 12 },
                        allowsPdf: true
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
                        deleteModalTitle={"Excluir Condomínio"}
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

export default FPcondo
