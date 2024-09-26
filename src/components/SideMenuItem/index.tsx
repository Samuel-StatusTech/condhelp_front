import * as S from "./styled"
import { getStore } from "../../store"

import { TAccess } from "../../utils/@types/data/access"
import { PSideMenuItem } from "../../utils/@types/components/SideMenuItem"

import { Icons } from "../../assets/icons/icons"

import { Link } from "react-router-dom"

type Props = {
  data: PSideMenuItem
  active: boolean
  k: number
  action: () => void
}

const iconRef: { [key: string]: JSX.Element } = {
  dashboard: <Icons.Dashboard />,
  user: <Icons.User />,
  condos: <Icons.Conds />,
  folder: <Icons.Folder />,
  subcategories: <Icons.Subcategory />,
  location: <Icons.Location />,
  chat: <Icons.Chat />,
  faq: <Icons.Faq />,
  reports: <Icons.Report />,
}

const SideMenuItem = ({ data, active, k, action }: Props) => {
  const { user } = getStore()

  const render = !data.access
    ? true
    : data.access.includes(user?.role as TAccess)

  const renderIcon = () => {
    const icon = iconRef[data.icon]

    return icon ?? null
  }

  return render ? (
    <S.Wrapper $active={active} $k={k}>
      <Link to={`/dashboard${data.link}`} onClick={action}>
        {renderIcon()}
        <S.Title>{data.text}</S.Title>
      </Link>
    </S.Wrapper>
  ) : null
}

export default SideMenuItem
