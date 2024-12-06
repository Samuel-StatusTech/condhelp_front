import * as S from "./styled"

import { Icons } from "../../../assets/icons/icons"
import { TCall } from "../../../utils/@types/data/call"

type Props = {
  list: TCall[]
}

const CallsHistoryList = ({ list }: Props) => {
  const handleClick = (id: number) => {
    // TODO: show modal
  }

  return (
    <S.Wrapper>
      {list.map((item, sk) => (
        <S.Item $k={sk} key={sk} onClick={() => handleClick(item.id)}>
          {/* <S.ItemData>{getDateStr(item.date, "dmy")}</S.ItemData>
          <S.ItemData>{getDateStr(item.date, "time")}</S.ItemData>
          <S.ItemData>{item.category.name}</S.ItemData>
          <S.ItemData>{item.PRESTADOR.name}</S.ItemData> */}
          <Icons.Expand />
        </S.Item>
      ))}
    </S.Wrapper>
  )
}

export default CallsHistoryList
