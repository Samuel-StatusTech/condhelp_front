import * as S from "./styled"
import SideMenu from "../../components/SideMenu"
import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from "../../components/Header"
import Modal from "../../components/Modal"

const DashTemplate = () => {
  const location = useLocation()

  const [page, setPage] = useState("dash")
  const [modal, setModal] = useState({
    role: "newBudget",
    showing: false,
  })

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
      <Modal
        role="newBudget"
        visible={modal.showing}
        onClose={() => setModal((md) => ({ ...md, showing: false }))}
      />

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
