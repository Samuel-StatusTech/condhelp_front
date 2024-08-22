import * as S from "./styled"

import CardVariationsTemplate from "../_template"
import { PLighterItem } from "../../../../utils/@types/components/LighterItem"

import { ReactComponent as ApprovedIcon } from "../../../../assets/icons/valid.svg"
import { ReactComponent as AwaitingIcon } from "../../../../assets/icons/paused.svg"
import { ReactComponent as ErrorIcon } from "../../../../assets/icons/error.svg"
import { ReactComponent as OkrIcon } from "../../../../assets/icons/okr.svg"
import { getStore } from "../../../../store"

type Props = {
  k: number
  title: string
  data: PLighterItem[]
  handleSelectOkr?: (p?: any) => void
}

type IProps = {
  item: PLighterItem
  handleSelectOkr?: Props["handleSelectOkr"]
}

const LighterItem = ({ item, handleSelectOkr }: IProps) => {
  const { user } = getStore()

  const handleClick = () => {
    handleSelectOkr && handleSelectOkr(item)
  }

  const renderIcon = () => {
    let el

    switch (item.type) {
      case "approved":
        el = <ApprovedIcon />
        break
      case "awaiting":
        el = <AwaitingIcon />
        break
      case "denied":
        el = <ErrorIcon />
        break
      default:
        el = null
        break
    }

    return el
  }

  return (
    <S.LighterItem onClick={handleClick} $pointer={user?.level !== "employee"}>
      <span>{item.title}</span>
      {renderIcon()}
    </S.LighterItem>
  )
}

const Lighter = ({ k, title, data, handleSelectOkr }: Props) => {
  return (
    <CardVariationsTemplate k={k} title={title} icon={<OkrIcon />}>
      <S.ResumeArea>
        <S.RData>
          <S.Color $color={"approved"} />
          <S.Legend>Aprovada</S.Legend>
        </S.RData>
        <S.RData>
          <S.Color $color={"awaiting"} />
          <S.Legend>Aguardando</S.Legend>
        </S.RData>
        <S.RData>
          <S.Color $color={"denied"} />
          <S.Legend>Reprovada</S.Legend>
        </S.RData>
      </S.ResumeArea>
      <S.List>
        {data.map((goal, k) => (
          <LighterItem key={k} item={goal} handleSelectOkr={handleSelectOkr} />
        ))}
      </S.List>
    </CardVariationsTemplate>
  )
}

export default Lighter
