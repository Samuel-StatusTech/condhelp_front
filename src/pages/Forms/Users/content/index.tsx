import { TForm } from "../../../../utils/@types/components/Form"
import { TAccess } from "../../../../utils/@types/data/access"
import { TOption } from "../../../../utils/@types/data/option"
import { TRegion } from "../../../../utils/@types/data/region"
import { DefaultContent } from "./default"
import { FranchiseCitiesContent } from "./franchiseCities"

export interface BaseProps {
  info: {
    handleField: (field: string, value: any) => void
    handleCancel: (params?: any) => void
    handleSave: (form: any) => Promise<void>

    options: { [key: string]: TOption[] }
    form: any

    personType: TAccess

    renderBasic: () => TForm["columns"][number]["blocks"][number]["groups"]
    renderExtra: () => TForm["columns"][number]["blocks"]

    isManagingFranchiseCities: boolean

    regions: TRegion[]
    setIsManagingFranchiseCities: (value: boolean) => void
  }
}

export const UserFormContent = ({ info }: BaseProps) => {
  const { form, isManagingFranchiseCities } = info

  return form.profile === "FRANQUEADO" && isManagingFranchiseCities ? (
    <FranchiseCitiesContent {...info} />
  ) : (
    <DefaultContent {...info} />
  )
}
