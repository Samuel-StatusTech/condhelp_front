import * as C from "../../styled"
import * as S from "./styled"

import BreadCrumb, { PPath } from "../../../BreadCrumb"
import { TBreadCrumFrom } from "../.."
import { Icons } from "../../../../assets/icons/icons"
import Button from "../../../Button"
import { useNavigate } from "react-router-dom"
import { breadcrumbs } from "../../../../utils/system/breadcrumbs"
import { TAccess } from "../../../../utils/@types/data/access"
import { relations } from "../../../../utils/system/relations"

type Props = {
  from: TBreadCrumFrom
  forForm?: boolean
  noBack?: boolean
  handleAction?: () => void
  extra?: {
    profile?: TAccess
  }
}

const BreadcrumbPageHeader = ({
  from,
  forForm,
  noBack,
  handleAction,
  extra,
}: Props) => {
  const navigate = useNavigate()

  const handleButton = () => {
    if (handleAction) handleAction()
    else navigate(-1)
  }

  const getPaths = () => {
    let pts: PPath[] = breadcrumbs[from]

    if (extra && extra.profile) {
      pts = [
        {
          title: relations.roles[extra.profile],
        },
        {
          title: "Detalhes",
        },
      ]
    }

    return pts
  }

  return (
    <C.Element className={forForm ? "falseSubContentWrapper" : ""}>
      <S.PageIndicator $k={1}>
        <BreadCrumb paths={getPaths()} />
      </S.PageIndicator>
      {(forForm || !noBack) && (
        <Button
          type="quaternary"
          action={handleButton}
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
