import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as PeopleIcon } from "../../../../assets/icons/users.svg"
import { ReactComponent as GoalsIcon } from "../../../../assets/icons/goals.svg"
import { ReactComponent as CompaniesIcon } from "../../../../assets/icons/companies.svg"
import { ReactComponent as CardIcon } from "../../../../assets/icons/card.svg"
import { ReactComponent as NewsboardIcon } from "../../../../assets/icons/newspaper.svg"
import { ReactComponent as PlusIcon } from "../../../../assets/icons/plus_circle.svg"

type Props = {
  from: "people" | "goals" | "companies" | "departments" | "newsboard"
  action: (p?: any) => void
}

const iconsRelations = {
  people: <PeopleIcon />,
  goals: <GoalsIcon />,
  companies: <CompaniesIcon />,
  departments: <CardIcon />,
  newsboard: <NewsboardIcon />,
}

const titleRelations = {
  people: "Pessoas",
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
        {iconsRelations[from]}
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
