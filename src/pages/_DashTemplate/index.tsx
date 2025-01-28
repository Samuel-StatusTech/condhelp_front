import * as S from "./styled"
import SideMenu from "../../components/SideMenu"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import Header from "../../components/Header"
import Modal from "../../components/Modal"
import { getStore } from "../../store"

type Props = {
  withoutSidebar?: boolean
  noHideOverflow?: boolean
}

const DashTemplate = ({ withoutSidebar, noHideOverflow }: Props) => {
  const navigate = useNavigate()

  const { user } = getStore()

  const location = useLocation()

  const [page, setPage] = useState("dash")

  const loadManagerPermissions = useCallback(async () => {
    const allowedRoutes = ["dashboard/condos", "dashboard/condos/single"]

    if (allowedRoutes.every((i) => !location.pathname.endsWith(i))) {
      navigate("/dashboard/condos")
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token && user) {
      if (location.pathname.includes("myaccount")) {
        setPage("")
      } else if (location.pathname.includes("dashboard/budget/")) {
        setPage("dash")
      } else if (location.pathname.includes("dashboard")) {
        const splitted = location.pathname.split("/dashboard")
        const isSubPage = splitted[1].slice(1).split("/").length > 1

        const val = isSubPage
          ? splitted[1].slice(1).split("/")[0]
          : splitted.length > 1
          ? splitted[1].slice(1)
          : location.pathname

        setPage(!!val ? val : "dash")
      }

      if (user.profile === "SINDICO" && user.condominiums.length === 0) {
        loadManagerPermissions()
      }
    } else {
      navigate("/login")
    }
  }, [loadManagerPermissions, location, navigate, user])

  return (
    <S.Page>
      <Modal />

      <Header />

      <S.Main>
        {!withoutSidebar && <SideMenu page={page} />}
        <S.PageContent $noHideOverflow={noHideOverflow}>
          <Outlet />
        </S.PageContent>
      </S.Main>
    </S.Page>
  )
}

export default DashTemplate
