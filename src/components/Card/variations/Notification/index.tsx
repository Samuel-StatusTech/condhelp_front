import * as S from "./styled"

import CardVariationsTemplate from "../_template"
import { PNotificationCard } from "../../../../utils/@types/components/Notification"

import { ReactComponent as AlertIcon } from "../../../../assets/icons/alert.svg"
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg"
import { getDateStr } from "../../../../utils/tb/format/date"
import { useState } from "react"

type Props = {
  k: number
  title: string
  data: PNotificationCard[]
}

type PNItem = {
  alert: PNotificationCard
  handleRead: (id: string) => void
}

const NotificationItem = ({ alert, handleRead }: PNItem) => {
  return (
    <S.NotificationItem>
      <S.ItemRow>
        <S.Points>{`-${alert.losedPoints} Ponto${
          alert.losedPoints > 1 ? "s" : ""
        }`}</S.Points>
        <button onClick={() => handleRead(alert.id)}>
          <CloseIcon />
        </button>
      </S.ItemRow>
      <S.Description>{alert.description}</S.Description>
      <S.ItemRow>
        <S.FooterData>{alert.noter}</S.FooterData>
        <S.FooterData>{getDateStr(alert.date, "dmy")}</S.FooterData>
      </S.ItemRow>
    </S.NotificationItem>
  )
}

const Notifications = ({ k, title, data }: Props) => {
  const [showingData, setShowingData] = useState<PNotificationCard[]>(data)

  const handleRead = (id: string) => {
    setShowingData(showingData.filter((i) => i.id !== id))
  }

  return (
    <CardVariationsTemplate k={k}
      title={`${title} ${
        showingData.length > 0 ? `(${showingData.length})` : ""
      }`}
      icon={<AlertIcon />}
    >
      <S.List>
        {showingData.map((item, k) => (
          <NotificationItem key={k} alert={item} handleRead={handleRead} />
        ))}
      </S.List>
    </CardVariationsTemplate>
  )
}

export default Notifications
