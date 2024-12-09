import * as C from "../../styled"
import * as S from "./styled"

import BreadCrumb, { PPath } from "../../../BreadCrumb"
import { TBreadCrumFrom } from "../.."
import { Icons } from "../../../../assets/icons/icons"
import Button from "../../../Button"
import { useNavigate } from "react-router-dom"
import { breadcrumbs } from "../../../../utils/system/breadcrumbs"

type Props = {
  from: TBreadCrumFrom
  forForm?: boolean
  noBack?: boolean
  handleAction?: () => void
}

const BreadcrumbPageHeader = ({
  from,
  forForm,
  noBack,
  handleAction,
}: Props) => {
  const navigate = useNavigate()

  const handleButton = () => {
    if (handleAction) handleAction()
    else navigate(-1)
  }

  const getPaths = () => {
    let pts: PPath[] = breadcrumbs[from]

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
