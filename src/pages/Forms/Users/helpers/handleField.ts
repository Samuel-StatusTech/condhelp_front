import { TAccess } from "../../../../utils/@types/data/access"
import { TUser } from "../../../../utils/@types/data/user"
import initials from "../../../../utils/initials"

export const handleField = async (
  field: string,
  value: any,
  form: any,
  setForm: (newData: any) => void,
  setPersonType: (personType: TAccess) => void,
  franchises: TUser[]
) => {
  if (field === "status") {
    setForm((frm: any) => ({ ...frm, status: value ? "ATIVO" : "INATIVO" }))
  } else if (field === "profile") {
    setForm(initials.forms.person[value as TAccess])
    setPersonType(value)
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
                }
              : {
                  ...form.responsible,
                  [fieldName]: value,
                }

          setForm((p: any) => ({
            ...p,
            responsible: newRespData,
          }))
        } else if (field === "region") {
          if (form.region) {
            setForm((p: any) => ({ ...p, [field]: value, cities: [] }))
          }
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
