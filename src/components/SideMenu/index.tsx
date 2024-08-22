import * as S from "./styled"

import { system } from "../../utils/system"
import SideMenuItem from "../SideMenuItem"

import { ReactComponent as MenuLogo } from "../../assets/icons/small_named_logo.svg"
import { ReactComponent as DropdownIcon } from "../../assets/icons/dropdown.svg"
import { getStore } from "../../store"
import { getInitials } from "../../utils/tb/format/name"
import { Icons } from "../../assets/icons/icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
  page: string
}

const SideMenu = (props: Props) => {
  // use ref ...

  const { user } = getStore()

  const navigate = useNavigate()

  const [sideOpened, setSideOpened] = useState(false)
  const [userDrop, setUserDrop] = useState(false)

  const { page } = props

  const toggleSideMenu = () => {
    setSideOpened(!sideOpened)
  }

  const toggleUserDrop = () => {
    setUserDrop(!userDrop)
  }

  const handleLogout = () => {
    navigate("/login", {
      replace: true,
    })
  }

  return (
    <S.Element $opened={sideOpened}>
      <S.BurguerWrapper $opened={sideOpened} onClick={toggleSideMenu}>
        <Icons.Burguer />
      </S.BurguerWrapper>
      <MenuLogo />
      <S.MenuContainer>
        {system.menu.map((item, k) => (
          <SideMenuItem
            k={k}
            key={k}
            action={toggleSideMenu}
            data={item}
            active={page === item.tag}
          />
        ))}
        <S.UserControl onClick={toggleUserDrop}>
          <S.LoggedUserArea>
            <S.UserNameBox>
              {getInitials([user?.name as string, user?.surname as string])}
            </S.UserNameBox>
            <S.NameArea $turned={userDrop}>
              <S.UserName>{user?.name}</S.UserName>
              <S.DropBtn>
                <DropdownIcon width={24} />
              </S.DropBtn>
            </S.NameArea>
          </S.LoggedUserArea>

          <S.DropUserWrapper className={userDrop ? "visible" : ""}>
            <S.DropUserContent>
              <S.DUItem onClick={handleLogout}>
                <span>Sair</span>
                <Icons.Logout />
              </S.DUItem>
            </S.DropUserContent>
          </S.DropUserWrapper>
        </S.UserControl>
      </S.MenuContainer>
    </S.Element>
  )
}

export default SideMenu
