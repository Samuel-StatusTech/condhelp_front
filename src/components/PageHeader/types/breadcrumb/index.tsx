import * as C from "../../styled"
import * as S from "./styled"

import BreadCrumb, { PPath } from "../../../BreadCrumb"
import { TBreadCrumFrom } from "../.."
import { Icons } from "../../../../assets/icons/icons"
import Button from "../../../Button"
import { useNavigate } from "react-router-dom"

type Props = {
  from: TBreadCrumFrom
  forForm?: boolean
  handleAction?: () => void
}

const BreadcrumbPageHeader = ({ from, forForm }: Props) => {
  const navigate = useNavigate()

  const handleAction = () => {
    navigate(-1)
  }

  const getPaths = () => {
    let pts: PPath[] = []

    switch (from) {
      case "users":
        pts = [
          { title: "Pessoas", to: "/dashboard/users" },
          { title: "Detalhes", to: "/dashboard/users/single" },
        ]
        break
      case "categories":
        pts = [
          { title: "Categorias", to: "/dashboard/categories" },
          {
            title: "Detalhes da categoria",
            to: "/dashboard/categories/single",
          },
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
    <C.Element className={forForm ? "falseSubContentWrapper" : ""}>
      <S.PageIndicator $k={1}>
        <BreadCrumb paths={getPaths()} />
      </S.PageIndicator>
      {forForm && (
        <Button
          type="quaternary"
          action={handleAction}
          text="Voltar"
          icon={<Icons.Back />}
          iconLeft={true}
          fit={true}
          k={2}
        />
      )}
    </C.Element>
  )
}

export default BreadcrumbPageHeader
