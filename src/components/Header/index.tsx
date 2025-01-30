import * as S from "./styled"
import { Link } from "react-router-dom"
import { system } from "../../utils/system"
import { Icons } from "../../assets/icons/icons"
import { getStore } from "../../store"
import { TAccess } from "../../utils/@types/data/access"

const Header = () => {
  const { user } = getStore()

  return (
    <S.Element>
      <Icons.LogoFull className="bigLogo" width={190} />
      <Icons.Logo className="smallLogo" width={36} height={36} />

      <S.Nav>
        {system.menu.nav.map((mi, k) =>
          mi.access.includes(user?.profile as TAccess) ? (
            <S.MenuItem key={k} $k={k}>
              <Link to={mi.link}>{mi.text}</Link>
            </S.MenuItem>
          ) : null
        )}

        {user?.profile !== "ADMIN" ? (
          <S.MenuItem $k={system.menu.nav.length}>
            <Link to={"/myaccount"}>Minha conta</Link>
          </S.MenuItem>
        ) : null}

        <S.MenuItem $k={system.menu.nav.length}>
          <Link to={"/login"}>Sair</Link>
        </S.MenuItem>
      </S.Nav>
    </S.Element>
  )
}

export default Header
