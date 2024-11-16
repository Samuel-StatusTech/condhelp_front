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
  handleAction?: () => void
}

const BreadcrumbPageHeader = ({ from, forForm }: Props) => {
  const navigate = useNavigate()

  const handleAction = () => {
    navigate(-1)
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
