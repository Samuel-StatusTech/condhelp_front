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
    if (field === "managerId") {
      // find manager..
      const m = fdata.people.filter(
        (p) => p.profile === "manager" && p.id === value
      )

      if (m) setForm((f) => ({ ...f, manager: { ...f.manager, id: value } }))
      else
        setForm((f) => ({
          ...f,
          manager: { ...f.manager, since: f.manager.since },
        }))
    } else if (field === "since")
      setForm((f: any) => ({ ...f, manager: { ...f.manager, since: value } }))
    else if (Object.keys(form.address).includes(field))
      setForm((f: any) => ({ ...f, address: { ...f.address, [field]: value } }))
    else setForm((f: any) => ({ ...f, [field]: value }))
  }

  const loadData = useCallback(async () => {
    try {
      // const cats = parseOptionList(fdata.categories, "id", "name") -> managers

      setTimeout(() => {
        setOptions((opts) => ({
          ...opts,
          managers: parseOptionList(
            fdata.people.filter((p) => p.profile === "manager"),
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
                  [
                    {
                      type: "select",
                      label: "Síndico",
                      field: "managerId",
                      value: form.manager.id,
                      gridSizes: { big: 9, small: 6 },
                      options: options.managers,
                    },
                    {
                      type: "date",
                      label: "Data da eleição",
                      field: "since",
                      value: form.manager.since,
                      gridSizes: { big: 3, small: 6 },
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
