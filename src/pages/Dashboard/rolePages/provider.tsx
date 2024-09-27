/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import Banner from "../../../components/Banner"
import Card from "../../../components/Card"
import NewsboardSection from "../../../components/NewsboardSection"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import * as S from "../styled"
import { getStore } from "../../../store"
import { fdata } from "../../../utils/_dev/falseData"

import Modal from "../../../components/Modal"
import { TGoal } from "../../../utils/@types/data/goal"

const DashboardProvider = () => {
  const { user } = getStore()

  const [page, setPage] = useState<"main" | "leaderDetails" | "teamMember">(
    "main"
  )
  const [secondPageData, setSecondPageData] = useState<any>(null)

  const handleSubPageChange = (
    page: "main" | "leaderDetails" | "teamMember",
    data?: any
  ) => {
    setSecondPageData(data)
    setPage(page)
  }

  const PageContent = () => {
    switch (user?.role) {
      case "admin":
        return null
      default:
        return null
    }
  }

  const [modal, setModal] = useState<{
    visible: boolean
    data: any
    role?: string
  }>({
    visible: false,
    data: null,
    role: "",
  })

  return (
    <S.SubContent>
      <Modal
        visible={modal.visible && modal.data}
        onClose={() => setModal({ visible: false, data: null })}
        role={modal.role as any}
        data={modal.data}
      />

      <PageRow>
        <PageContent />
      </PageRow>
    </S.SubContent>
  )
}

export default DashboardProvider
