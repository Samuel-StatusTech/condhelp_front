import * as S from "./styled"

import CardVariationsTemplate from "../_template"
import { PGoogleItem } from "../../../../utils/@types/components/GoogleItem"

import { ReactComponent as TrophieIcon } from "../../../../assets/icons/trophie.svg"
import { getDateStr, getTime } from "../../../../utils/tb/format/date"
import Button from "../../../Button"
import { getStore } from "../../../../store"

type Props = {
  k: number
  title: string
  data: PGoogleItem["data"][]
  authGoogle: () => void
}

const GoogleItem = ({ k, data: event }: PGoogleItem) => {
  const isFullDay = event.start.date !== undefined

  const renderDate = () => {
    let str = ""

    if (isFullDay) {
      const spliited = event.start.date?.split("-") as string[]
      str = spliited[2] + "/" + spliited[1] + "/" + spliited[0]
    } else str = getDateStr(event.start.dateTime as string, "dmy")

    return str
  }

  const renderHour = () => {
    let str = getTime(event.start.dateTime as string)

    return str
  }

  const handleClick = () => {
    const a = document.createElement("a")
    a.href = event.htmlLink
    a.target = "_blank"

    a.click()
    a.remove()
  }

  return (
    <S.GoogleItem $k={k} onClick={handleClick}>
      <S.EventInfo>
        <S.EventName>{event.summary}</S.EventName>
        <S.Agenda>{""}</S.Agenda>
      </S.EventInfo>
      <S.DateArea>
        <S.Date>{renderDate()}</S.Date>
        <S.Hour>{isFullDay ? "Todo o dia" : renderHour()}</S.Hour>
      </S.DateArea>
    </S.GoogleItem>
  )
}

const GoogleCard = ({ k, title, data, authGoogle }: Props) => {
  const { user } = getStore()

  return (
    <CardVariationsTemplate k={k} title={title} icon={<TrophieIcon />}>
      {user?.googleAToken ? (
        <S.List>
          {data.map((item, key) => (
            <GoogleItem data={item} k={k + (key + 1) / 2} key={key} />
          ))}
        </S.List>
      ) : (
        <Button type="google" action={authGoogle} />
      )}
    </CardVariationsTemplate>
  )
}

export default GoogleCard
