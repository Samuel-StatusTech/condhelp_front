/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import Banner from "../../../components/Banner"
import Card from "../../../components/Card"
import NewsboardSection from "../../../components/NewsboardSection"
import Divider from "../../../components/_minimals/Divider"
import PageRow from "../../../components/_minimals/PageRow"
import * as S from ".././styled"
import { getStore } from "../../../store"
import { fdata } from "../../../utils/_dev/falseData"

import Modal from "../../../components/Modal"
import { TGoal } from "../../../utils/@types/data/goal"

type Props = {
  handleSubPageChange: (page: "main" | "leaderDetails", data?: any) => void
}

const Principal = ({ handleSubPageChange }: Props) => {
  const { user } = getStore()

  const [modal, setModal] = useState<{
    visible: boolean
    data: any
    role?: string
  }>({
    visible: false,
    data: null,
    role: "",
  })

  const [banner] = useState(null)

  const handleSelectGoal = (goal: TGoal) => {}

  // Cards

  const renderCardsContent = () => {
    let content: any = <></>

    switch (user?.role) {
      case "admin":
        content = <></>
        break
      case "branch":
        content = <></>
        break
      default:
        content = null
        break
    }

    return content
  }

  return (
    <S.SubContent>
      {banner ? <Banner /> : null}

      <Modal
        visible={modal.visible && modal.data}
        onClose={() => setModal({ visible: false, data: null })}
        role={modal.role as any}
        data={modal.data}
      />

      <PageRow>
        <Card
          k={1}
          type="approvalResume"
          title="Todas as metas"
          data={fdata.cards.approval as any}
          actions={{ handleSelectGoal }}
        />
      </PageRow>

      <PageRow>{renderCardsContent()}</PageRow>

      <Divider />

      <NewsboardSection />
    </S.SubContent>
  )
}

export default Principal
