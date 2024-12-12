import * as S from "./styled"

import { system } from "../../utils/system"
import SideMenuItem from "../SideMenuItem"

import { Icons } from "../../assets/icons/icons"
import { useCallback, useState } from "react"
import { getStore } from "../../store"
import { relations } from "../../utils/system/relations"
import Button from "../Button"

type Props = {
  page: string
}

const SideMenu = (props: Props) => {
  // use ref ...

  const { page } = props

  const { user, controllers } = getStore()

  const [sideOpened, setSideOpened] = useState(false)

  const toggleSideMenu = () => {
    window.document.body.style.overflow = !sideOpened ? "hidden" : "unset"

    setSideOpened(!sideOpened)
  }

  const toggleNewBudgetModal = useCallback(() => {
    controllers.modal.open({
      role: "newBudget",
      visible: true,
      handleOp: () => {
        window.location.reload()
      },
    })
  }, [controllers.modal])

  return (
    <S.Wrapper $opened={sideOpened}>
      <S.MenuArea>
        <S.BurguerWrapper $opened={sideOpened} onClick={toggleSideMenu}>
          <Icons.Burguer />
        </S.BurguerWrapper>

        <S.LoggedUserArea>
          <S.UserProfile>
            {user?.photo ? (
              <img src={user?.photo} alt="" width={"100%"} />
            ) : (
              <Icons.User />
            )}
          </S.UserProfile>
          <S.NameArea>
            <S.UserName>{user?.name}</S.UserName>
            <S.UserRole>
              {user?.profile ? relations.roles[user?.profile] : ""}
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
        </S.MenuContainer>
      </S.MenuArea>

      {user?.profile === "SINDICO" && (
        <S.ButtonWrapper>
          <Button
            type="main"
            text="Novo orçamento"
            action={toggleNewBudgetModal}
            icon={<Icons.PlusCircle />}
            iconLeft={true}
            fromSidebar={true}
            disabled={user?.condominiums.length === 0}
          />
        </S.ButtonWrapper>
      )}
    </S.Wrapper>
  )
}

export default SideMenu
