export const handleField = async (
  field: string,
  value: any,
  form: any,
  setForm: (newData: any) => void
) => {
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

        setForm((p: any) => ({
          ...p,
          responsible: { ...p.responsible, [fieldName]: value },
        }))
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
