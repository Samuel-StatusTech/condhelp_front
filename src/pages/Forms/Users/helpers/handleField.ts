import { TAccess } from "../../../../utils/@types/data/access"
import { TUser } from "../../../../utils/@types/data/user"
import { TErrorsCheck } from "../../../../utils/@types/helpers/checkErrors"
import initials from "../../../../utils/initials"

export const handleField = async (
  field: string,
  value: any,
  form: any,
  setForm: (newData: any) => void,
  setPersonType: (personType: TAccess) => void,
  franchises: TUser[],
  errors: TErrorsCheck,
  setErrors: React.Dispatch<React.SetStateAction<TErrorsCheck>>
) => {
  if (errors.fields.includes(field)) {
    const newFieldsList = errors.fields.filter(
      (errorItem) => errorItem !== field
    )
    setErrors({
      fields: newFieldsList,
      has: newFieldsList.length > 0,
    })
  }

  if (field === "status") {
    setForm((frm: any) => ({ ...frm, status: value ? "ATIVO" : "INATIVO" }))
  } else if (field === "profile") {
    setForm({
      ...initials.forms.person[value as TAccess],
      franqId: form.franqId,
    })
    setPersonType(value)
    setErrors({
      fields: [],
      has: false,
    })
  } else if (
    [
      "country",
      "state",
      "city",
      "street",
      "number",
      "complement",
      "zipCode",
    ].includes(field)
  ) {
    setForm((p: any) => ({
      ...p,
      // @ts-ignore
      address: { ...p.address, [field]: value },
    }))
  } else {
    switch (form.profile) {
      case "ADMIN":
        switch (field) {
          case "documentRegister":
            setForm((p: any) => ({
              ...p,
              // @ts-ignore
              document: { ...p.document, register: value },
            }))
            break
          case "documentDate":
            setForm((p: any) => ({
              ...p,
              // @ts-ignore
              document: { ...p.document, date: value },
            }))
            break

          default:
            setForm((p: any) => ({ ...p, [field]: value }))
            break
        }

        if (Object.keys(form.document).includes(field)) {
        }
        break

      case "FILIAL":
      case "FRANQUEADO":
        const responsableKeys = [
          "responsablePersonName",
          "responsableResponsibleType",
          "responsableFantasyName",
          "responsableCompanyName",
          "responsableCnpj",
          "responsableStateRegistration",
          "responsableMunicipalRegistration",
          "responsableCpf",
        ]

        if (responsableKeys.includes(field)) {
          const fieldKey = field.split("responsable")[1]

          const fieldName = fieldKey.charAt(0).toLowerCase() + fieldKey.slice(1)

          const newRespData =
            field === "responsableResponsibleType"
              ? {
                  personName: "",
                  responsibleType: value,
                  fantasyName: "",
                  companyName: "",
                  cnpj: "",
                  stateRegistration: "",
                  municipalRegistration: "",
                  cpf: "",
                  responsibleStatus: "ATIVO",
                }
              : {
                  ...form.responsible,
                  [fieldName]: value,
                }

          setForm((p: any) => ({
            ...p,
            responsible: newRespData,
          }))

          if (field === "responsableResponsibleType") {
            const fieldsToClear =
              value === "CNPJ"
                ? ["personName", "cpf"]
                : [
                    "fantasyName",
                    "companyName",
                    "cnpj",
                    "stateRegistration",
                    "municipalRegistration",
                  ]

            const newFieldsList = errors.fields.filter(
              (errorItem) => !fieldsToClear.includes(errorItem)
            )

            setErrors({
              fields: newFieldsList,
              has: newFieldsList.length > 0,
            })
          }
        } else if (field === "region") {
          if (form.region) {
            setForm((p: any) => ({ ...p, [field]: value, cities: [] }))
          } else setForm((p: any) => ({ ...p, [field]: value }))
        } else setForm((p: any) => ({ ...p, [field]: value }))
        break

      case "SINDICO":
        if (field === "franqId") {
          const f = franchises.find((franchise) => franchise.userId === value)

          setForm((p: any) => ({
            ...p,
            franqId: value,
            branchId: f?.branchId,
          }))
        } else setForm((p: any) => ({ ...p, [field]: value }))
        break

      case "PRESTADOR":
        switch (field) {
          case "franqId":
            const f = franchises.find((franchise) => franchise.userId === value)

            setForm((p: any) => ({
              ...p,
              franqId: value,
              branchId: f?.branchId,
            }))
            break

          case "documentRegister":
            setForm((p: any) => ({
              ...p,
              // @ts-ignore
              document: { ...p.document, register: value },
            }))
            break

          case "documentDate":
            setForm((p: any) => ({
              ...p,
              openingDate: value,
              document: { ...p.document, date: value },
            }))
            break

          case "categories":
            const shouldInclude =
              Array.isArray(form.categories) &&
              !form.categories.includes(value as number)

            const newList = shouldInclude
              ? [...form.categories, value]
              : form.categories.filter((i: number) => i !== value)

            setForm((p: any) => ({
              ...p,
              categories: newList,
            }))
            break

          case "federalCndFree":
            if (value === true) {
              const newFieldsList = errors.fields.filter(
                (errorItem) =>
                  !["federalCnd", "federalCndStart", "federalCndEnd"].includes(
                    errorItem
                  )
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
                  !["stateCnd", "stateCndStart", "stateCndEnd"].includes(
                    errorItem
                  )
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
                  !["cityCnd", "cityCndStart", "cityCndEnd"].includes(errorItem)
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
                  !["fgtsCnd", "fgtsCndStart", "fgtsCndEnd"].includes(errorItem)
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

        break

      default:
        setForm((p: any) => ({ ...p, [field]: value }))
        break
    }
  }
}
