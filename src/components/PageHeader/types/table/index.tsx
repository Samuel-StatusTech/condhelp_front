import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as PlusIcon } from "../../../../assets/icons/plus_circle.svg"
import { THeaderFrom } from "../.."

type Props = {
  from: THeaderFrom
  action: (p?: any) => void
}

const titleRelations: { [key in THeaderFrom]: string } = {
  users: "Usuários",
  goals: "Metas",
  companies: "Empresas",
  departments: "Departamentos",
  newsboard: "Mural",
}

const TablePageHeader = ({ from, action }: Props) => {
  const handleAction = () => {
    action()
  }

  return (
    <C.Element>
      <S.PageIndicator $k={1}>
        <span>{titleRelations[from]}</span>
      </S.PageIndicator>
      <S.Button $k={2} onClick={handleAction}>
        <PlusIcon />
        <span>Novo</span>
      </S.Button>
    </C.Element>
  )
}

export default TablePageHeader
