import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { getStore } from "../../../store"
import { fdata } from "../../../utils/_dev/falseData"
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

const FPcondo = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [form, setForm] = useState<TNewCondominium | TCondominium>(
    initials.forms.condo
  )
  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    managers: [],
    state: [],
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const getObj = () => {
    let fd = new FormData()

    // if (params.id) fd.append("id", params.id)

    fd.append(
      "condominium",
      JSON.stringify({
        name: form.name,
        unities: form.units,
        cnpj: form.cnpj,
        address: form.address.street,
        addressNumber: form.address.number,
        zipCode: form.address.cep,
        neighborhood: form.address.neighborhood,
        city: form.address.city,
        federateUnit: form.address.state,
        filialId: "3",
      })
    )

    // fd.append("photo", "")
    // fd.append("minutesElectionPathFile", "")

    // fd.append("name", form.name)
    // fd.append("unities", String(form.units))
    // fd.append("cnpj", form.cnpj)
    // fd.append("address", form.address.street)
    // fd.append("addressNumber", form.address.number)
    // fd.append("zipCode", String(form.address.cep))
    // fd.append("neighborhood", form.address.neighborhood)
    // fd.append("city", form.address.city)
    // fd.append("federateUnit", form.address.state)
    // fd.append("filialId", "3")

    return fd
  }

  const handleUpdate = async () => {
    try {
      // check errors

      const obj = getObj()

      const req = await Api.condos.update({ condo: obj })

      if (req.ok) {
        controllers.feedback.setData({
          message: "Condomínio atualizado com sucesso.",
          state: "success",
          visible: true,
        })
        navigate("/dashboard/condos")
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Não foi possível atualizar o condomínio. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }
  }

  const handleCreate = async () => {
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
        navigate("/dashboard/condos")
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Não foi possível criar o condomínio. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }
  }

  const handleSave = async () => {
    if (params.id) handleUpdate()
    else handleCreate()
  }

  const handleDelete = async () => {
    if (params.id) {
      try {
        if (Number.isNaN(params.id)) throw new Error()
        else {
          const req = await Api.condos.delete({ id: Number(params.id) })

          if (req.ok) {
            controllers.feedback.setData({
              message: "Condomínio excluida com sucesso.",
              state: "success",
              visible: true,
            })
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
      }
    }
  }

  const handleField = async (field: string, value: any) => {
    if (field === "managerId") {
      // find manager..
      const m = fdata.people.filter(
        (p) => p.profile === "SINDICO" && p.id === value
      )

      if (m)
        setForm((f: any) => ({ ...f, manager: { ...f.manager, id: value } }))
      else {
        setForm((f: any) => ({
          ...f,
          manager: {
            ...f.manager,
            id: String(f.manager.id),
            managerSince: f.manager.managerSince,
          },
        }))
      }
    } else if (field === "managerSince") {
      setForm((f: any) => ({
        ...f,
        manager: { ...f.manager, managerSince: value },
      }))
    } else if (field === "units")
      setForm((f: any) => ({ ...f, units: String(value).replace(/\D/g, "") }))
    else if (Object.keys(form.address).includes(field))
      setForm((f: any) => ({ ...f, address: { ...f.address, [field]: value } }))
    else setForm((f: any) => ({ ...f, [field]: value }))
  }

  const loadData = useCallback(async () => {
    try {
      setTimeout(() => {
        setOptions((opts) => ({
          ...opts,
          managers: parseOptionList(
            fdata.people.filter((p) => p.profile === "SINDICO"),
            "id",
            "name"
          ),
          state: systemOptions.states,
        }))

        if (params.id) {
          const info = fdata.condos.find((i) => i.id === params.id)

          if (info) {
            setForm(info)
          } else {
            throw new Error()
          }
        }
      }, 1000)
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as categorias.",
        state: "error",
        visible: true,
      })
    }
  }, [controllers.feedback, params.id])

  useEffect(() => {
    // ...
    loadData()
  }, [loadData])

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
                          field: "units",
                          value: String(form.units),
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
                          field: "street",
                          placeholder: "Digite aqui",
                          value: form.address.street,
                          gridSizes: { big: 8, small: 12 },
                        },
                        {
                          type: "input",
                          label: "Nº",
                          field: "number",
                          placeholder: "Digite aqui",
                          value: form.address.number,
                          gridSizes: { big: 2, small: 6 },
                        },
                        {
                          type: "input",
                          label: "CEP",
                          field: "cep",
                          placeholder: "Digite aqui",
                          value: formatCep(form.address.cep),
                          gridSizes: { big: 2, small: 6 },
                        },
                      ],
                      [
                        {
                          type: "input",
                          label: "Bairro",
                          field: "neighborhood",
                          placeholder: "Digite aqui",
                          value: form.address.neighborhood,
                          gridSizes: { big: 5, small: 12 },
                        },
                        {
                          type: "input",
                          label: "Cidade",
                          field: "city",
                          placeholder: "Digite aqui",
                          value: form.address.city,
                          gridSizes: { big: 5, small: 6 },
                        },
                        {
                          type: "select",
                          label: "UF",
                          field: "state",
                          value: form.address.state,
                          gridSizes: { big: 2, small: 6 },
                          options: options.state,
                          byKey: true,
                        },
                      ],
                      [
                        {
                          type: "select",
                          label: "Síndico",
                          field: "managerId",
                          value: String(form.manager.id),
                          gridSizes: { big: 9, small: 6 },
                          options: options.managers,
                        },
                        {
                          type: "date",
                          label: "Data da eleição",
                          field: "managerSince",
                          value: new Date(form.manager.managerSince),
                          gridSizes: { big: 3, small: 6 },
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

export default FPcondo
