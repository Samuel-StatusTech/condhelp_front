import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as PeopleIcon } from "../../../../assets/icons/users.svg"
import { ReactComponent as GoalsIcon } from "../../../../assets/icons/goals.svg"
import { ReactComponent as CompaniesIcon } from "../../../../assets/icons/companies.svg"
import { ReactComponent as CardIcon } from "../../../../assets/icons/card.svg"
import { ReactComponent as NewsboardIcon } from "../../../../assets/icons/newspaper.svg"
import { ReactComponent as BannerIcon } from "../../../../assets/icons/banner.svg"
import BreadCrumb, { PPath } from "../../../BreadCrumb"
import { TBreadCrumFrom } from "../.."

type Props = {
  from: TBreadCrumFrom
}

const iconsRelations: {
  [key in Props["from"]]: JSX.Element
} = {
  users: <PeopleIcon />,
  goals: <GoalsIcon />,
  companies: <CompaniesIcon />,
  departments: <CardIcon />,
  newsboard: <NewsboardIcon />,
  banner: <BannerIcon />,
}

const BreadcrumbPageHeader = ({ from }: Props) => {
  const getPaths = () => {
    let pts: PPath[] = []

    switch (from) {
      case "banner":
        pts = [
          { title: "Mural", to: "/dashboard/banner" },
          { title: "Detalhes", to: "/dashboard/banner" },
        ]
        break
      case "companies":
        pts = [
          { title: "Empresas", to: "/dashboard/companies" },
          { title: "Detalhes", to: "/dashboard/companies/single" },
        ]
        break
      case "departments":
        pts = [
          { title: "Departamentos", to: "/dashboard/departments" },
          { title: "Detalhes", to: "/dashboard/departments/single" },
        ]
        break
      case "goals":
        pts = [
          { title: "Metas", to: "/dashboard/goals" },
          { title: "Detalhes", to: "/dashboard/goals/single" },
        ]
        break
      case "newsboard":
        pts = [
          { title: "Mural", to: "/dashboard/newsboard" },
          { title: "Detalhes", to: "/dashboard/newsboard/single" },
        ]
        break
      case "users":
        pts = [
          { title: "Pessoas", to: "/dashboard/users" },
          { title: "Detalhes", to: "/dashboard/users/single" },
        ]
        break

      default:
        break
    }

    return pts
  }

  return (
    <C.Element>
      <S.PageIndicator $k={1}>
        {iconsRelations[from]}
        <BreadCrumb paths={getPaths()} />
      </S.PageIndicator>
    </C.Element>
  )
}

export default BreadcrumbPageHeader
