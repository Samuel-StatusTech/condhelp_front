import * as S from "./styled"
import SideMenu from "../../components/SideMenu"
import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from "../../components/Header"
import { getStore } from "../../store"

const DashTemplate = () => {
  const location = useLocation()

  const { user, controllers } = getStore()

  const [page, setPage] = useState("dash")

  useEffect(() => {
    const splitted = location.pathname.split("/dashboard")
    const isSubPage = splitted[1].slice(1).split("/").length > 1

    const val = isSubPage
      ? splitted[1].slice(1).split("/")[0]
      : splitted.length > 1
      ? splitted[1].slice(1)
      : location.pathname

    setPage(!!val ? val : "dash")

    if (user) {
      controllers.user.setData({
        ...user,
        profile: "manager",
      })
    }
  }, [location])

  return (
    <S.Page>
      <Header />

      <S.Main>
        <SideMenu page={page} />
        <S.PageContent>
          <Outlet />
        </S.PageContent>
      </S.Main>
    </S.Page>
  )
}

export default DashTemplate
