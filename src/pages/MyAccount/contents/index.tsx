import { getStore } from "../../../store"
import { TBlock } from "../../../utils/@types/components/Form"
import { TAccess } from "../../../utils/@types/data/access"
import { TOption } from "../../../utils/@types/data/option"
import { TCity } from "../../../utils/@types/data/region"
import { TErrorsCheck } from "../../../utils/@types/helpers/checkErrors"

import MyAccountBranch from "./branch"
import MyAccountFranchise from "./franchise"
import MyAccountManager from "./manager"
import MyAccountProvider from "./provider"

type Props = {
  info: {
    handleField: (field: string, value: any) => void
    handleCancel: (params?: any) => void
    handleSave: (form: any) => Promise<void>
    handleChangePassword: () => Promise<void>

    form: any
    formSubmitFields: TBlock["groups"][number]

    errors: TErrorsCheck
  } & {
    // Provider
    handleSelectCity?: (city: TCity) => void
    options?: {
      [key: string]: TOption[]
    }
  }
}

const contentRelation: {
  [key in string]: (props: any) => JSX.Element
} = {
  FILIAL: MyAccountBranch,
  FRANQUEADO: MyAccountFranchise,
  SINDICO: MyAccountManager,
  PRESTADOR: MyAccountProvider,
}

const MyAccountContent = (props: Props) => {
  const { user } = getStore()

  const renderContent = () => {
    const Content = contentRelation[user?.profile as TAccess]

    return <Content {...props.info} />
  }

  return renderContent()
}

export default MyAccountContent
