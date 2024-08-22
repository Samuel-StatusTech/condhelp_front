import * as S from "./styled"
import SideMenu from "../../components/SideMenu"
import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

const DashTemplate = () => {
  const location = useLocation()

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
  }, [location])

  return (
    <S.Page>
      <SideMenu page={page} />
      <S.PageContent>
        <Outlet />
      </S.PageContent>
    </S.Page>
  )
}

export default DashTemplate
