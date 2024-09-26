import * as S from "./styled"

import { system } from "../../utils/system"
import SideMenuItem from "../SideMenuItem"

import { Icons } from "../../assets/icons/icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getStore } from "../../store"
import { relations } from "../../utils/system/relations"

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

      <S.LoggedUserArea>
        <S.UserProfile>
          {user?.image ? (
            <img src={user?.image} alt="" width={"100%"} />
          ) : (
            <Icons.User />
          )}
        </S.UserProfile>
        <S.NameArea>
          <S.UserName>{user?.name}</S.UserName>
          <S.UserRole>
            {user?.role ? relations.roles[user?.role] : ""}
          </S.UserRole>
        </S.NameArea>
      </S.LoggedUserArea>

      <S.MenuContainer>
        {system.menu.side.map((item, k) => (
          <SideMenuItem
            k={k}
            key={k}
            action={toggleSideMenu}
            data={item}
            active={page === item.tag}
          />
        ))}
        <S.UserControl onClick={toggleUserDrop}>
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
