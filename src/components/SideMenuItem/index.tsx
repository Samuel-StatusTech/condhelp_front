import * as S from "./styled"
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg"
import { ReactComponent as UsersIcon } from "../../assets/icons/users.svg"
import { ReactComponent as GoalsIcon } from "../../assets/icons/goals.svg"
import { ReactComponent as OkrIcon } from "../../assets/icons/okr_fill.svg"
import { ReactComponent as CompaniesIcon } from "../../assets/icons/companies.svg"
import { ReactComponent as CardIcon } from "../../assets/icons/card.svg"
import { ReactComponent as BannerIcon } from "../../assets/icons/banner.svg"
import { ReactComponent as NewsboardIcon } from "../../assets/icons/newspaper.svg"
import { PSideMenuItem } from "../../utils/@types/components/SideMenuItem"
import { Link } from "react-router-dom"
import { getStore } from "../../store"
import { system } from "../../utils/system"
import { TUserLevel } from "../../utils/@types/data/user"

type Props = {
  data: PSideMenuItem
  active: boolean
  k: number
  action: () => void
}

const iconRef: { [key: string]: JSX.Element } = {
  dashboard: <DashboardIcon />,
  users: <UsersIcon />,
  goals: <GoalsIcon />,
  okr: <OkrIcon />,
  companies: <CompaniesIcon />,
  card: <CardIcon />,
  banner: <BannerIcon />,
  newsboard: <NewsboardIcon />,
}

const SideMenuItem = ({ data, active, k, action }: Props) => {
  const { user } = getStore()

  const render = !data.access
    ? true
    : data.tag === "okr"
    ? user?.level === "employee"
    : system.levelsRelations[data.access] <=
      system.levelsRelations[user?.level as TUserLevel]

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
