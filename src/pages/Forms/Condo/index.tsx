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

  const handleSave = async () => {
    // ...
  }

  const handleField = async (field: string, value: any) => {
    if (Object.keys(form.address).includes(field))
      setForm((f: any) => ({ ...f, address: { ...f.address, [field]: value } }))
    else setForm((f: any) => ({ ...f, [field]: value }))
  }

  const loadData = useCallback(async () => {
    try {
      // const cats = parseOptionList(fdata.categories, "id", "name") -> managers

      setTimeout(() => {
        setOptions((opts) => ({
          ...opts,
          state: systemOptions.states,
        }))

        if (params.id) {
          const info = fdata.condos.find((i) => i.id === params.id)

          if (info) {
            setForm({
              ...info,
              managerId: info.manager.id,
              managerElection: info.manager.since,
            })
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

  return (
    <C.Content>
      <PageHeader type={"breadcrumb"} from={"condos"} forForm={true} />

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
                      // small: 20
                    },
                  },
                ],
              },
            ],
          },
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
                      value: form.address.cep,
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
                ],
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

export default FPcondo