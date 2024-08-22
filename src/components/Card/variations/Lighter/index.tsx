import * as S from "./styled"

import CardVariationsTemplate from "../_template"
import { PLighterItem } from "../../../../utils/@types/components/LighterItem"

import { ReactComponent as ApprovedIcon } from "../../../../assets/icons/valid.svg"
import { ReactComponent as AwaitingIcon } from "../../../../assets/icons/paused.svg"
import { ReactComponent as ErrorIcon } from "../../../../assets/icons/error.svg"
import { ReactComponent as LightsIcon } from "../../../../assets/icons/lights.svg"

type Props = {
  k: number
  title: string
  data: PLighterItem[]
  handleSelectGoal?: (goal?: any) => void
}

type PItem = {
  k: number
  data: PLighterItem
  onPick?: (goal: any) => void
}

const LighterItem = ({ k, data, onPick }: PItem) => {
  const handleClick = () => {
    onPick && onPick(data)
  }

  const renderIcon = () => {
    let el

    switch (data.type) {
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
    <S.LighterItem $k={k} onClick={handleClick}>
      <span>{data.title}</span>
      {renderIcon()}
    </S.LighterItem>
  )
}

const Lighter = ({ k, title, data, handleSelectGoal }: Props) => {
  return (
    <CardVariationsTemplate k={k} title={title} icon={<LightsIcon />}>
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
        {data.map((goal, key) => (
          <LighterItem
            k={k + (key + 1) / 2}
            key={key}
            data={goal}
            onPick={handleSelectGoal}
          />
        ))}
      </S.List>
    </CardVariationsTemplate>
  )
}

export default Lighter
