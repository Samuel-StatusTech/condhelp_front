import { useCallback, useEffect, useState } from "react"
import * as S from "./styled"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useLocation, useNavigate, useParams } from "react-router-dom"
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
import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"
import { sendFile } from "../../../utils/tb/helpers/file/sendFile"
import Input from "../../../components/Input"

const FPcondo = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const params = useParams()

  const { user, controllers } = getStore()

  const [loading, setLoading] = useState(true)

  const [managers, setManagers] = useState<TUserTypes["SINDICO"][]>([])
  const [form, setForm] = useState<TNewCondominium | TCondominium>(
    initials.forms.condo
  )

  const [changedElectionFile, setChangedElectionFile] = useState(false)

  const [pickedCity, setPickedCity] = useState<TCity | null>(null)

  const [states, setStates] = useState<TState[]>([])

  const [options, setOptions] = useState<{ [key: string]: TOption[] }>({
    managers: [],
    state: systemOptions.states,
  })

  const [errors, setErrors] = useState<TErrorsCheck>({
    fields: [],
    has: false,
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const getObj = (
    imgUrl: string | null,
    electionFileUrl: string
  ): TNewCondominium | TCondominium => {
    let mId = 0

    let branchId = 0
    let franchiseId = 0

    if (location.state && location.state.manager) {
      mId = location.state.manager.id
      branchId = location.state.manager.branchId
      franchiseId = location.state.manager.franchiseId
    } else {
      if (params.id) mId = form.manager.managerId
      else mId = form.manager.userId

      if (user?.profile === "SINDICO") {
        branchId = user?.branchId as number
        franchiseId = user?.franqId as number
      } else if (user?.profile === "FRANQUEADO") {
        branchId = user?.branchId as number
        franchiseId = user?.userId as number
      } else if (user?.profile === "FILIAL") {
        branchId = user?.userId as number
        franchiseId = form.manager.franqId as number
      } else if (user?.profile === "ADMIN") {
        branchId = form.manager.branchId as number
        franchiseId = form.manager.franqId as number
      }
    }

    const obj: any = {
      name: form.name,
      unities: Number(form.unities),
      cnpj: form.cnpj.replace(/\D/g, ""),
      address: form.address,
      addressNumber: form.addressNumber,
      zipCode: form.zipCode,
      neighborhood: form.neighborhood,
      city: form.city,
      federateUnit: form.federateUnit,
      electionDate: getDateStr(form.electionDate, "javaDateTime"),
      electionFile: electionFileUrl,
      managerId: mId,
      branchId: branchId,
      franchiseId: franchiseId,
      status:
        user?.profile === "ADMIN"
          ? "ACTIVE"
          : params.id
          ? !changedElectionFile
            ? form.status
            : "UNDER_REVIEW"
          : form.status,
      photo: imgUrl,
    }

    return params.id && !Number.isNaN(params.id)
      ? { ...obj, id: params.id }
      : obj
  }

  const handleUpdate = async ({
    imgUrl,
    electionFileUrl,
  }: {
    imgUrl: string | null
    electionFileUrl: string
  }) => {
    setLoading(true)

    try {
      // check errors

      const obj = getObj(imgUrl, electionFileUrl)

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

  const handleCreate = async ({
    imgUrl,
    electionFileUrl,
  }: {
    imgUrl: string | null
    electionFileUrl: string
  }) => {
    setLoading(true)

    try {
      const obj = getObj(imgUrl, electionFileUrl)

      const req = await Api.condos.create({ newCondo: obj })

      if (req.ok) {
        setLoading(false)
        controllers.modal.close()

        setTimeout(() => {
          if (user?.profile === "ADMIN") {
            controllers.feedback.setData({
              message: "Condomínio criado com sucesso.",
              state: "success",
              visible: true,
            })

            if (location.state && location.state.manager)
              navigate(`/dashboard/users/single/${location.state.manager.id}`)
            else navigate("/dashboard/condos")
          } else {
            controllers.modal.open({
              role: "condoSuccess",
              visible: true,
              onClose: () => {
                controllers.feedback.setData({
                  message: "Condomínio criado com sucesso.",
                  state: "success",
                  visible: true,
                })

                if (location.state && location.state.manager)
                  navigate(
                    `/dashboard/users/single/${location.state.manager.id}`
                  )
                else navigate("/dashboard/condos")
              },
            })
          }
        }, 100)
      } else {
        if (req.error) {
          controllers.feedback.setData({
            visible: true,
            state: "error",
            message: req.error,
          })
        } else throw new Error()
      }
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
    setLoading(true)

    try {
      const errorInfo = updateErrors()

      if (!errorInfo.has) {
        if (pickedCity && pickedCity.name && pickedCity.name === form.city) {
          let img = null
          let electionFile = null

          if (form.photo) {
            const imgUrl =
              typeof form.photo === "string" &&
              form.photo.startsWith("https://")
                ? form.photo
                : await sendFile({
                    type: "image",
                    fileData: form.photo,
                    showError: () => {
                      controllers.feedback.setData({
                        state: "alert",
                        message: "Não foi possível enviar a imagem.",
                        visible: true,
                      })
                    },
                  })
            if (imgUrl) img = imgUrl
          }

          if (form.electionFile) {
            if (
              typeof form.electionFile === "string" &&
              form.electionFile.startsWith("https://")
            ) {
              electionFile = form.electionFile
            } else {
              const electionFileUrl = await sendFile({
                type: "pdf",
                fileData: form.electionFile,
                showError: () => {
                  controllers.feedback.setData({
                    state: "alert",
                    message: "Não foi possível enviar a ata de eleição.",
                    visible: true,
                  })
                },
              })
              if (electionFileUrl) electionFile = electionFileUrl
            }

            if (electionFile) {
              if (params.id)
                await handleUpdate({
                  imgUrl: img,
                  electionFileUrl: electionFile,
                })
              else
                await handleCreate({
                  imgUrl: img,
                  electionFileUrl: electionFile,
                })
            } else {
              controllers.feedback.setData({
                state: "alert",
                message: "Selecione uma arquivo para a ata de eleição",
                visible: true,
              })
            }
          } else {
            controllers.feedback.setData({
              state: "alert",
              message: "Selecione uma arquivo para a ata de eleição",
              visible: true,
            })
          }
        } else {
          controllers.feedback.setData({
            state: "alert",
            message: "Selecione uma cidade válida",
            visible: true,
          })
        }
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

    setLoading(false)
  }

  const onConfirmDelete = async () => {
    setLoading(true)

    try {
      const req = await Api.condos.delete({ id: Number(params.id) })

      if (req.ok) {
        controllers.feedback.setData({
          message: "Condomínio excluído com sucesso.",
          state: "success",
          visible: true,
        })

        setLoading(false)

        navigate("/dashboard/condos")
      } else {
        controllers.feedback.setData({
          visible: true,
          state: "error",
          message: req.error,
        })
      }
    } catch (error) {
      controllers.feedback.setData({
        message:
          "Não foi possível excluir o condomínio. Tente novamente mais tarde.",
        state: "error",
        visible: true,
      })
    }

    setLoading(false)
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

    if (field === "electionFile") {
      if (params.id) setChangedElectionFile(true)
      setForm((f: any) => ({ ...f, [field]: value }))
    }

    if (["addressNumber", "zipCode"].includes(field)) {
      const newForm = {
        ...form,
        [field]: value.replace(/\D/g, ""),
      }

      setForm(newForm)
    } else if (field === "managerId") {
      const m = params.id
        ? managers.find((i) => i.managerId === value)
        : managers.find((i) => i.userId === value)

      setForm((f: any) => ({ ...f, manager: m }))
    } else if (field === "managerSince") {
      setForm((f: any) => ({
        ...f,
        manager: { ...f.manager, managerSince: value },
      }))
    } else if (field === "unities" || field === "addressNumber")
      setForm((f: any) => ({
        ...f,
        [field]: String(+String(value).replace(/\D/g, "")),
      }))
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
        setForm((frm) => ({
          ...frm,
          managerId: params.id ? user?.managerId : user?.userId,
          manager: user,
        }))
        loadEditInfo()
      } else {
        if (location.state && location.state.manager) {
          const { manager } = location.state

          // @ts-ignore
          setForm((frm) => ({
            ...frm,
            managerId: manager.id,
            manager: {
              managerId: manager.id,
              name: manager.name,
              surname: manager.surname,
              branchId: manager.branchId,
              franchiseId: manager.franchiseId,
            },
          }))
        } else {
          const managersReq = await Api.persons.getByRole({
            role: "SINDICO",
            actives: "true",
            size: 100,
          })

          if (managersReq.ok) {
            const managersList = managersReq.data.content

            const managersListOptions = params.id
              ? parseOptionList(managersList, "managerId", "name")
              : parseOptionList(managersList, "userId", "name")

            setManagers(managersList as TUserTypes["SINDICO"][])
            setOptions((opts) => ({
              ...opts,
              managers: managersListOptions,
            }))
          } else throw new Error()
        }

        loadEditInfo()
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
  }, [controllers.feedback, loadEditInfo, location.state, params.id, user])

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

  const updateErrors = () => {
    const check = checkErrors.condos(form)
    return check
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
                          error: {
                            has: errors.fields.includes("name"),
                            message: "Digite o nome do condomínio",
                          },
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
                          error: {
                            has: errors.fields.includes("unities"),
                            message: "Digite um valor válido",
                          },
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
                        error: {
                          has: errors.fields.includes("cnpj"),
                          message: "Digite um cnpj válido",
                        },
                        gridSizes: {
                          big: 12,
                        },
                      },
                      {
                        type: "image",
                        label: "Foto do condomínio",
                        field: "photo",
                        value: form.photo,
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
                          error: {
                            has: errors.fields.includes("address"),
                            message: "Digite o endereço",
                          },
                        },
                        {
                          type: "input",
                          label: "Nº",
                          field: "addressNumber",
                          placeholder: "Digite aqui",
                          value: String(
                            +(
                              String(form.addressNumber).replace(/\D/g, "") ??
                              ""
                            )
                          ),
                          gridSizes: { big: 2, small: 6 },
                          error: {
                            has: errors.fields.includes("addressNumber"),
                            message: "Nº inválido",
                          },
                        },
                        {
                          type: "input",
                          label: "CEP",
                          field: "zipCode",
                          placeholder: "Digite aqui",
                          value: formatCep(form.zipCode),
                          gridSizes: { big: 2, small: 6 },
                          fixedWidth: 112,
                          error: {
                            has: errors.fields.includes("zipCode"),
                            message: "CEP inválido",
                          },
                        },
                      ],
                      [
                        {
                          type: "select",
                          label: "UF",
                          field: "federateUnit",
                          value: form.federateUnit,
                          gridSizes: { big: 2, small: 12 },
                          options: options.state,
                          byKey: true,
                          fixedWidth: 112,
                          error: {
                            has: errors.fields.includes("federateUnit"),
                            message: "Escolha uma UF",
                          },
                        },
                        {
                          type: "cityInput",
                          label: "Cidade",
                          field: "city",
                          placeholder: "Digite aqui",
                          value: form.city,
                          gridSizes: { big: 5, small: 12 },
                          stateId: states.find(
                            (s) => s.initials === form.federateUnit
                          )?.id,
                          onSelectCity: handleSelectCity,
                          big: true,
                          error: {
                            has: errors.fields.includes("city"),
                            message: "Escolha uma cidade válida",
                          },
                        },
                        {
                          type: "input",
                          label: "Bairro",
                          field: "neighborhood",
                          placeholder: "Digite aqui",
                          value: form.neighborhood,
                          gridSizes: { big: 5, small: 12 },
                          error: {
                            has: errors.fields.includes("neighborhood"),
                            message: "Digite o nome do bairro",
                          },
                        },
                      ],
                      [
                        ...(location.state && location.state.manager
                          ? ([
                              {
                                type: "readonly",
                                label: "Síndico",
                                field: "",
                                value: `${form.manager.name} ${form.manager.surname}`,
                                gridSizes: { big: 9, small: 6 },
                              },
                            ] as FormField[])
                          : ((user && user.profile === "SINDICO"
                              ? [
                                  {
                                    type: "readonly",
                                    label: "Síndico",
                                    field: "",
                                    value: `${user.name} (você)`,
                                    gridSizes: { big: 9, small: 6 },
                                    error: {
                                      has: false,
                                      message: "Precisa de um síndico.",
                                    },
                                  },
                                ]
                              : [
                                  {
                                    type: "select",
                                    label: "Síndico",
                                    field: "managerId",
                                    value: params.id
                                      ? form.manager.managerId
                                      : form.manager.userId,
                                    gridSizes: { big: 9, small: 6 },
                                    options: options.managers,
                                    error: {
                                      has: errors.fields.includes("managerId"),
                                      message: "Escolha um síndico",
                                    },
                                  },
                                ]) as FormField[])),
                        {
                          type: "date",
                          label: "Data da eleição",
                          field: "electionDate",
                          value: new Date(form.electionDate),
                          gridSizes: { big: 3, small: 6 },
                          maxDate: new Date(),
                          fixedWidth: 138,
                          error: {
                            has: errors.fields.includes("electionDate"),
                            message: "Data inválida",
                          },
                        },
                      ],
                    ],
                  },
                  {
                    type: "custom",
                    element: (
                      <div
                        style={{
                          display: "flex",
                          gridColumn: 12,
                          position: "relative",
                          padding: form.status === "UNDER_REVIEW" ? "8px" : "0",
                        }}
                      >
                        <Input.File
                          label="Ata da eleição"
                          isForCondo={true}
                          field="electionFile"
                          onChange={
                            form.status !== "UNDER_REVIEW" || !params.id
                              ? handleField
                              : () => {}
                          }
                          value={form.electionFile}
                          allowsPdf={true}
                          error={{
                            has: params.id
                              ? changedElectionFile
                                ? errors.fields.includes("electionFile")
                                : form.status === "REJECTED"
                              : errors.fields.includes("electionFile"),
                            message: errors.fields.includes("electionFile")
                              ? "Insira um arquivo"
                              : form.status === "REJECTED"
                              ? form.rejectionReason
                              : "",
                          }}
                        />
                        {form.status === "UNDER_REVIEW" && params.id && (
                          <S.FileIndicator>
                            <span>Em análise</span>
                          </S.FileIndicator>
                        )}
                      </div>
                    ),
                  },
                  {
                    type: "custom",
                    element: (
                      <FormDefaultButtons
                        handleDelete={onConfirmDelete}
                        handleCancel={handleCancel}
                        handleSave={handleSave}
                        disabled={errors.has}
                        deleteModalTitle={"Excluir Condomínio"}
                        deleteTextDescriptor={"excluir este condomínio"}
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
