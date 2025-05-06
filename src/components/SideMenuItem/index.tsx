import * as S from "./styled"
import { getStore } from "../../store"

import { TAccess } from "../../utils/@types/data/access"
import { PSideMenuItem } from "../../utils/@types/components/SideMenuItem"

import { Icons } from "../../assets/icons/icons"

import { Link, useLocation } from "react-router-dom"
import { useRef } from "react"

type Props = {
  data: PSideMenuItem
  active: boolean
  k: number
  action: () => void
}

const iconRef: { [key: string]: JSX.Element } = {
  dashboard: <Icons.Dashboard />,
  document: <Icons.Document />,
  user: <Icons.User />,
  condos: <Icons.Conds />,
  folder: <Icons.Folder />,
  subcategories: <Icons.Subcategory />,
  location: <Icons.Location />,
  budget: <Icons.Budget />,
  chat: <Icons.Chat />,
  faq: <Icons.Faq />,
  tag: <Icons.Tag />,
  reports: <Icons.Report />,
}

const SideMenuItem = ({ data, active, k, action }: Props) => {
  const { user } = getStore()

  const subMenuWrapperRef = useRef<HTMLDivElement>(null)

  const location = useLocation()

  const userAllowed =
    user?.profile !== "SINDICO" ||
    user?.condominiums.length > 0 ||
    user?.condominiums.every((c) => c.status !== "ACTIVE")

  const render = !data.access
    ? true
    : data.access.includes(user?.profile as TAccess)

  const renderIcon = () => {
    const icon = iconRef[data.icon]

    return icon ?? null
  }

  return render ? (
    <S.Wrapper $active={!data.subMenus ? active : false} $k={k}>
      {userAllowed ? (
        Array.isArray(data.subMenus) ? (
          <div className="submenuMenu">
            {renderIcon()}
            <S.Title>{data.text}</S.Title>
          </div>
        ) : (
          <Link to={`/dashboard${data.link ?? ""}`} onClick={action}>
            {renderIcon()}
            <S.Title>{data.text}</S.Title>
          </Link>
        )
      ) : (
        <div>
          {renderIcon()}
          <S.Title>{data.text}</S.Title>
        </div>
      )}

      {data.subMenus && (
        <S.SubmenuWrapper
          ref={subMenuWrapperRef}
          $opened={active}
          className={"subMenuWrapper"}
        >
          <S.SubmenuContainer>
            <S.SubmenuContent>
              {data.subMenus.map((sm, smk) => (
                <S.Sublink
                  key={smk}
                  $active={location.pathname.includes(sm.link)}
                >
                  <Link
                    to={`/dashboard${data.link ?? ""}${sm.link}`}
                    onClick={action}
                    className="submenu"
                  >
                    <span>{sm.title}</span>
                  </Link>
                </S.Sublink>
              ))}
            </S.SubmenuContent>
          </S.SubmenuContainer>
        </S.SubmenuWrapper>
      )}
    </S.Wrapper>
  ) : null
}

export default SideMenuItem
