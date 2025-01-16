import { getStore } from "../../../store"
import { TBlock } from "../../../utils/@types/components/Form"
import { TAccess } from "../../../utils/@types/data/access"

import MyAccountBranch from "./branch"
import MyAccountFranchise from "./franchise"
import MyAccountManager from "./manager"
import MyAccountProvider from "./provider"

type Props = {
  info: {
    handleField: (field: string, value: any) => void
    handleCancel: (params?: any) => void
    handleSave: (form: any) => Promise<void>

    form: any
    formSubmitFields: TBlock["groups"][number]
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
