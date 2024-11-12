import * as C from "../../styled"
import * as S from "./styled"

import { ReactComponent as PeopleIcon } from "../../../../assets/icons/users.svg"

import BreadCrumb, { PPath } from "../../../BreadCrumb"
import { TBreadCrumFrom } from "../.."

type Props = {
  from: TBreadCrumFrom
}

const iconsRelations: {
  [key in Props["from"]]: JSX.Element
} = {
  users: <PeopleIcon />,
  condos: <div></div>,
  categories: <div></div>,
  subcategories: <div></div>,
  regions: <div></div>,
  errands: <div></div>,
  faqs: <div></div>,
}

const BreadcrumbPageHeader = ({ from }: Props) => {
  const getPaths = () => {
    let pts: PPath[] = []

    switch (from) {
      case "users":
        pts = [
          { title: "Pessoas", to: "/dashboard/users" },
          { title: "Detalhes", to: "/dashboard/users/single" },
        ]
        break
      case "condos":
        pts = [
          { title: "Condomínios", to: "/dashboard/condos" },
          { title: "Detalhes", to: "/dashboard/condos/single" },
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
