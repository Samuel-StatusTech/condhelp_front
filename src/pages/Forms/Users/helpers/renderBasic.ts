import { TBlock } from "../../../../utils/@types/components/Form"
import { TAccess } from "../../../../utils/@types/data/access"
import { TOption } from "../../../../utils/@types/data/option"
import { TCity, TState } from "../../../../utils/@types/data/region"
import { TUser } from "../../../../utils/@types/data/user"
import { formPartials } from "../partials"

type Props = {
  user: TUser
  form: any
  options: { [key: string]: TOption[] }
  states: TState[]
  handleSelectCity: (city: TCity) => void
  onHandleField: (field: string, value: any) => void
  franchises: TUser[]
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
  } = props

  let content: TBlock["groups"] = []

  switch (form.profile) {
    case "ADMIN":
      content = formPartials.admin.basic({ form })
      break

    case "FILIAL":
      content = formPartials.branch.basic({
        form,
        options,
        states,
        handleSelectCity,
      })
      break

    case "FRANQUEADO":
      content = formPartials.franchise.basic({
        form,
        options,
        userProfile: user?.profile as any,
        handleSelectCity,
      })
      break

    case "SINDICO":
      content = formPartials.manager.basic({ form })
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
      })
      break

    default:
      break
  }

  return content
}
