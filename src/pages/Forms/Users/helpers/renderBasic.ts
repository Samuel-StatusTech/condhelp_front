import { TBlock } from "../../../../utils/@types/components/Form"
import { TAccess } from "../../../../utils/@types/data/access"
import { TOption } from "../../../../utils/@types/data/option"
import { TCity, TState } from "../../../../utils/@types/data/region"
import { TUser } from "../../../../utils/@types/data/user"
import { TErrorsCheck } from "../../../../utils/@types/helpers/checkErrors"
import { formPartials } from "../partials"

type Props = {
  user: TUser
  form: any
  options: { [key: string]: TOption[] }
  states: TState[]
  handleSelectCity: (city: TCity) => void
  onHandleField: (field: string, value: any) => void
  franchises: TUser[]
  isEditing: boolean
  errors: TErrorsCheck
}

export const renderBasic = (props: Props) => {
  const {
    user,
    form,
    options,
    states,
    handleSelectCity,
    onHandleField,
    franchises,
    isEditing,
    errors,
  } = props

  let content: TBlock["groups"] = []

  switch (form.profile) {
    case "ADMIN":
      content = formPartials.admin.basic({ form, isEditing, errors })
      break

    case "REDE":
      content = formPartials.branch.basic({
        form,
        options,
        states,
        handleSelectCity,
        isEditing,
        errors,
      })
      break

    case "FRANQUEADO":
      content = formPartials.franchise.basic({
        form,
        options,
        userProfile: user?.profile as any,
        handleSelectCity,
        isEditing,
        errors,
      })
      break

    case "SINDICO":
      content = formPartials.manager.basic({ form, isEditing, errors })

      break

    case "PRESTADOR":
      content = formPartials.provider.basic({
        form,
        options,
        handleField: onHandleField,
        franchises: franchises,
        personType: user?.profile as TAccess,
        franchiseName: user?.name,
        handleSelectCity,
        isEditing,
        errors,
      })
      break

    default:
      break
  }

  return content
}
