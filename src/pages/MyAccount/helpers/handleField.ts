import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"

export const handleField = async (
  field: string,
  value: any,
  form: any,
  setForm: (newData: any) => void,
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

  if (
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
    const newForm = {
      ...form,
      address: {
        ...form.address,
        [field]: field === "number" ? value.replace(/\D/g, "") : value,
      },
    }

    setForm(newForm)
  } else {
    switch (form.profile) {
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
        setForm((p: any) => ({ ...p, [field]: value }))
        break

      case "PRESTADOR":
        switch (field) {
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
