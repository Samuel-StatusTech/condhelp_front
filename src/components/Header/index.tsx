import * as S from "./styled"
import { Link } from "react-router-dom"
import { system } from "../../utils/system"
import { Icons } from "../../assets/icons/icons"

const Header = () => {
  return (
    <S.Element>
      <Icons.LogoFull width={190} />

      <S.Nav>
        {system.menu.nav.map((mi, k) => (
          <S.MenuItem key={k} $k={k}>
            <Link to={mi.link}>{mi.text}</Link>
          </S.MenuItem>
        ))}
      </S.Nav>
    </S.Element>
  )
}

export default Header
