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

const FPcondo = () => {
  const navigate = useNavigate()

  const params = useParams()

  const { controllers } = getStore()

  const [managers, setManagers] = useState<TUserTypes["SINDICO"][]>([])
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
      subsidiaryId: form.subsidiaryId,
      electionDate: new Date(form.manager.managerSince).toISOString(),
      managerId: form.manager.userId,
    }

    /*
        {
          "id": 0,
          "name": "string",
          "unities": 0,
          "cnpj": "string",
          "address": "string",
          "addressNumber": 0,
          "zipCode": "string",
          "neighborhood": "string",
          "city": "string",
          "federateUnit": "string",
          "subsidiaryId": 0,
          "managerId": 0,
          "electionDate": "2024-11-29T12:16:37.262Z"
        }
       */

    // return params.id && !Number.isNaN(params.id)
    //   ? { ...obj, id: params.id }
    //   : obj

    return obj
  }

  const handleUpdate = async () => {
    try {
      // check errors

      const obj = getObj()

      const req = await Api.condos.update({ condo: obj as unknown as TCondominium })

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
      const m = managers.find((i) => i.userId === value)

      console.log("Manager", m)

      setForm((f: any) => ({ ...f, manager: m }))
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
      const managersReq = await Api.persons.getByRole({ role: "SINDICO" })

      if (managersReq.ok) {
        setManagers(managersReq.data.content as TUserTypes["SINDICO"][])
        setOptions((opts) => ({
          ...opts,
          managers: parseOptionList(managersReq.data.content, "userId", "name"),
          state: systemOptions.states,
        }))

        if (params.id && !Number.isNaN(params.id)) {
          const infoReq = await Api.condos.getSingle({ id: Number(params.id) })

          if (infoReq.ok) {
            setForm(infoReq.data)
          } else {
            throw new Error()
          }
        }
      } else throw new Error()
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Não foi possível carregar as informações. Tente novamente mais tarde",
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
                          type: "input",
                          label: "Cidade",
                          field: "city",
                          placeholder: "Digite aqui",
                          value: form.city,
                          gridSizes: { big: 5, small: 6 },
                        },
                        {
                          type: "select",
                          label: "UF",
                          field: "federateUnit",
                          value: form.federateUnit,
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
                          // @ts-ignore
                          value: form.manager.userId,
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
