import { useCallback, useEffect, useState } from "react"
import * as C from "../styled"

import initials from "../../../utils/initials"
import Form from "../../../components/Form"
import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../../components/PageHeader"

import { TBlock } from "../../../utils/@types/components/Form"
import FormDefaultButtons from "../../../components/FormDefaultButtons"

import { Api } from "../../../api"
import {
  TNewUser,
  TNewUserDefault,
  TUserTypes,
} from "../../../utils/@types/data/user"
import { getStore } from "../../../store"

import { formPartials } from "./partials"
import { checkErrors } from "../../../utils/tb/checkErrors"

import { getUserObj } from "../../../utils/tb/parsers/parseUserFormData"
import { checkProviderPendencyStatus } from "../../../utils/tb/helpers/checkProviderPendencyStatus"
import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"
import { sendFile } from "../../../utils/tb/helpers/file/sendFile"

const FPdocuments = () => {
  const navigate = useNavigate()
  const params = useParams()

  const { user, controllers } = getStore()

  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState<any>(initials.forms.person.PRESTADOR)
  const [errors, setErrors] = useState<TErrorsCheck>({
    fields: [],
    has: false,
  })

  const handleCancel = () => {
    navigate(-1)
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

    switch (field) {
      case "federalCndFree":
        if (value === true) {
          const newFieldsList = errors.fields.filter(
            (errorItem) =>
              ![
                "federalCnd",
                "federalCndStart",
                "federalCndEnd",
                "federalCndDocument",
              ].includes(errorItem)
          )
          setErrors({
            fields: newFieldsList,
            has: newFieldsList.length > 0,
          })
        }

        const newFederalData =
          value === true
            ? {
                ...form,
                federalCnd: "",
                federalCndStart: "",
                federalCndEnd: "",
                federalCndFree: true,
              }
            : {
                ...form,
                federalCndFree: false,
              }

        setForm(newFederalData)
        break

      case "federalCnd":
      case "federalCndStart":
      case "federalCndEnd":
        if (form.federalCndFree) {
          setForm({
            ...form,
            [field]: value,
            federalCndFree: false,
          })
        } else setForm((p: any) => ({ ...p, [field]: value }))
        break

      case "stateCndFree":
        if (value === true) {
          const newFieldsList = errors.fields.filter(
            (errorItem) =>
              ![
                "stateCnd",
                "stateCndStart",
                "stateCndEnd",
                "stateCndDocument",
              ].includes(errorItem)
          )
          setErrors({
            fields: newFieldsList,
            has: newFieldsList.length > 0,
          })
        }

        const newStateData =
          value === true
            ? {
                ...form,
                stateCnd: "",
                stateCndStart: "",
                stateCndEnd: "",
                stateCndFree: true,
              }
            : {
                ...form,
                stateCndFree: false,
              }

        setForm(newStateData)
        break

      case "stateCnd":
      case "stateCndStart":
      case "stateCndEnd":
        if (form.stateCndFree) {
          setForm({
            ...form,
            [field]: value,
            stateCndFree: false,
          })
        } else setForm((p: any) => ({ ...p, [field]: value }))
        break

      case "cityCndFree":
        if (value === true) {
          const newFieldsList = errors.fields.filter(
            (errorItem) =>
              ![
                "cityCnd",
                "cityCndStart",
                "cityCndEnd",
                "cityCndDocument",
              ].includes(errorItem)
          )
          setErrors({
            fields: newFieldsList,
            has: newFieldsList.length > 0,
          })
        }

        const newCityData =
          value === true
            ? {
                ...form,
                cityCnd: "",
                cityCndStart: "",
                cityCndEnd: "",
                cityCndFree: true,
              }
            : {
                ...form,
                cityCndFree: false,
              }

        setForm(newCityData)
        break

      case "cityCnd":
      case "cityCndStart":
      case "cityCndEnd":
        if (form.cityCndFree) {
          setForm({
            ...form,
            [field]: value,
            cityCndFree: false,
          })
        } else setForm((p: any) => ({ ...p, [field]: value }))
        break

      case "fgtsCndFree":
        if (value === true) {
          const newFieldsList = errors.fields.filter(
            (errorItem) =>
              ![
                "fgtsCnd",
                "fgtsCndStart",
                "fgtsCndEnd",
                "fgtsCndDocument",
              ].includes(errorItem)
          )
          setErrors({
            fields: newFieldsList,
            has: newFieldsList.length > 0,
          })
        }

        const newFgtsData =
          value === true
            ? {
                ...form,
                fgtsCnd: "",
                fgtsCndStart: "",
                fgtsCndEnd: "",
                fgtsCndFree: true,
              }
            : {
                ...form,
                fgtsCndFree: false,
              }

        setForm(newFgtsData)
        break

      case "fgtsCnd":
      case "fgtsCndStart":
      case "fgtsCndEnd":
        if (form.fgtsCndFree) {
          setForm({
            ...form,
            [field]: value,
            fgtsCndFree: false,
          })
        } else setForm((p: any) => ({ ...p, [field]: value }))
        break

      default:
        setForm((p: any) => ({ ...p, [field]: value }))
        break
    }
  }

  const getObj = useCallback(
    (
      userId: number,
      cndsUrls: {
        federalCndDocument: string | null
        stateCndDocument: string | null
        cityCndDocument: string | null
        fgtsCndDocument: string | null
      }
    ) => {
      const baseInfo: TNewUserDefault = {
        id: userId,
        status: form.status,
        userId: userId,
        email: form.email,
        photo: form.photo,
        branchId: form.branchId,
        franchiseId: form.franchiseId,
        doc: "",
      }

      let info = getUserObj(
        {
          ...{
            ...form,
            ...cndsUrls,
          },
          userId,
          address: {
            ...(form.address ?? {}),
            city: (user as TUserTypes["PRESTADOR"])?.address.cityId,
          },
        },
        (form as TNewUser).profile
      )

      if (
        params.id &&
        !Number.isNaN(params.id) &&
        form.profile !== "PRESTADOR"
      ) {
        info = { ...info, id: Number(params.id) }
      }

      return {
        profile: form.profile,
        ...baseInfo,
        ...info,
      }
    },
    [form, params.id, user]
  )

  const getUserDocument = (obj: any) => {
    let value = obj.cnpj

    return value.replace(/\D/g, "")
  }

  const handleUpdate = async (cndsUrls: {
    federalCndDocument: string | null
    stateCndDocument: string | null
    cityCndDocument: string | null
    fgtsCndDocument: string | null
  }) => {
    setLoading(true)

    try {
      if (user?.userAccountId && !Number.isNaN(user?.userAccountId)) {
        const obj = getObj(Number(user?.userAccountId), cndsUrls)
        const document = getUserDocument(obj)

        const req = await Api.persons.update({
          person: { ...(obj as any), doc: document },
        })

        if (req.ok) {
          controllers.feedback.setData({
            visible: true,
            state: "success",
            message: "Documentações atualizadas com sucesso",
          })

          setLoading(false)

          navigate(-1)
        } else throw new Error()
      } else throw new Error()
    } catch (error) {
      // ...
      controllers.feedback.setData({
        visible: true,
        state: "error",
        message: "Nao foi possível atualizar a documentação.",
      })

      setLoading(false)
    }
  }

  const processProviderCnds = async () => {
    try {
      const cndsFiles = [
        ...[
          !form.federalCndFree
            ? { key: "federal", document: form.federalCndDocument }
            : null,
        ],
        ...[
          !form.stateCndFree
            ? { key: "state", document: form.stateCndDocument }
            : null,
        ],
        ...[
          !form.cityCndFree
            ? { key: "city", document: form.cityCndDocument }
            : null,
        ],
        ...[
          !form.fgtsCndFree
            ? { key: "fgts", document: form.fgtsCndDocument }
            : null,
        ],
      ].filter((i) => i !== null)

      let urls: { [key: string]: string | null } = {}

      let cndError = false

      for (const i in cndsFiles) {
        const cnd = cndsFiles[i]

        if (!cndError && cnd) {
          if (
            typeof cnd.document === "string" &&
            cnd.document.startsWith("https://")
          ) {
            urls[cnd.key as keyof typeof urls] = cnd.document
          } else {
            const cndUrl = await sendFile({
              fileData: cnd.document,
              type: "pdf",
              showError: () => {
                controllers.feedback.setData({
                  state: "alert",
                  message: `Não foi possível enviar a cnd ${cnd.key}`,
                  visible: true,
                })
              },
            })

            if (cndUrl) urls[cnd.key as keyof typeof urls] = cndUrl
            else cndError = true
          }
        } else {
          throw new Error()
        }
      }

      if (!cndError) {
        const newFormInfo = {
          federalCndDocument: urls.federal ?? null,
          stateCndDocument: urls.state ?? null,
          cityCndDocument: urls.city ?? null,
          fgtsCndDocument: urls.fgts ?? null,
        }

        return newFormInfo
      } else return false
    } catch (error) {
      return false
    }
  }

  const handleSave = async () => {
    const errorInfo = updateErrors()

    if (!errorInfo.has) {
      const cndProcesses = await processProviderCnds()

      if (!cndProcesses) {
        setLoading(false)
        return
      }

      handleUpdate(cndProcesses)
    } else {
      setErrors(errorInfo)

      controllers.feedback.setData({
        visible: true,
        state: "alert",
        message: "Corrija os campos e tente novamente",
      })
    }
  }

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // user info

      const req = await Api.persons.getSingle({
        id: Number(user?.userAccountId),
      })

      if (req.ok) {
        const hasInfo = req.data.profile && req.data.email

        if (hasInfo) {
          const initialRoleInfo = initials.forms.person[req.data.profile]

          const reqInfo = req.data as any

          const gettedInfo = {
            ...form,
            ...initialRoleInfo,
            ...{
              ...reqInfo,
              address: !!reqInfo.address
                ? {
                    ...reqInfo.address,
                    city: reqInfo.address.city,
                    cityId:
                      reqInfo.address.cityId &&
                      !Number.isNaN(+reqInfo.address.cityId)
                        ? +reqInfo.address.cityId
                        : null,
                    country: +reqInfo.address.country,
                    state: +reqInfo.address.state,
                  }
                : undefined,
            },
          }

          setForm(gettedInfo)
        }
      } else {
        controllers.feedback.setData({
          message: req.error,
          state: "error",
          visible: true,
        })

        navigate(-1)
      }

      setLoading(false)
    } catch (error) {
      controllers.feedback.setData({
        message: "Não foi possível carregar as informações necessárias.",
        state: "error",
        visible: true,
      })

      setLoading(false)

      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controllers.feedback, navigate])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    controllers.modal.open({
      role: "loading",
      visible: loading,
    })
  }, [controllers.modal, loading])

  const updateErrors = () => {
    const check = checkErrors.documentation(form)
    return check
  }

  /*
   *  Fields render
   */

  const formSubmitFields: TBlock["groups"][number] = {
    type: "custom",
    element: (
      <FormDefaultButtons
        handleCancel={handleCancel}
        handleSave={handleSave}
        disabled={errors.has}
        deleteModalTitle={"Excluir Documentos"}
      />
    ),
  }

  const renderBasic = () => {
    let content: TBlock[] = []

    content = formPartials.provider.basic({
      pendencies: {
        cityCnd:
          checkProviderPendencyStatus({
            isent: form.cityCndFree,
            end: form.cityCndEnd,
            start: form.cityCndStart,
            register: form.cityCnd,
          }) ?? "free",
        federalCnd:
          checkProviderPendencyStatus({
            isent: form.federalCndFree,
            end: form.federalCndEnd,
            start: form.federalCndStart,
            register: form.federalCnd,
          }) ?? "free",
        stateCnd:
          checkProviderPendencyStatus({
            isent: form.stateCndFree,
            end: form.stateCndEnd,
            start: form.stateCndStart,
            register: form.stateCnd,
          }) ?? "free",
        fgts:
          checkProviderPendencyStatus({
            isent: form.fgtsCndFree,
            end: form.fgtsCndEnd,
            start: form.fgtsCndStart,
            register: form.fgtsCnd,
          }) ?? "free",
      },
    })

    return content
  }

  const renderExtra = () => {
    let content: TBlock[] = []

    content = formPartials.provider.extra(form, formSubmitFields, errors)

    return content
  }

  return (
    <C.Content className="falseSubContentWrapper">
      <PageHeader type={"breadcrumb"} from={"documents"} forForm={true} />

      <Form
        handleField={handleField}
        handleCancel={handleCancel}
        handleSave={handleSave}
        columns={[
          {
            blocks: renderBasic(),
          },
          {
            blocks: renderExtra(),
          },
        ]}
      />
    </C.Content>
  )
}

export default FPdocuments
