import * as S from "./styled"

import { Link } from "react-router-dom"
import {
  iconsRelations,
  PDashboardShortcut,
} from "../../../../utils/system/dashboardShortcuts"

type Props = PDashboardShortcut & {
  k: number
}

const DashboardShortcutCard = ({
  k,
  title,
  icon,
  registers,
  text,
  link,
}: Props) => {
  return (
    <S.Element $k={k}>
      <Link to={link}>
        {iconsRelations[icon]}
        <S.CardMain>
          <S.CardTitle>{title}</S.CardTitle>
          <S.CardDescription>
            {text ?? `${registers} registro${registers ? "s" : ""}`}
          </S.CardDescription>
        </S.CardMain>
      </Link>
    </S.Element>
  )
}

export default DashboardShortcutCard
