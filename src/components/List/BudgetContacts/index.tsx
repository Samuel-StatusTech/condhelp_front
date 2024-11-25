import * as S from "./styled"
import { TBudget } from "../../../utils/@types/data/budget"
import { getDateStr } from "../../../utils/tb/format/date"

import { Icons } from "../../../assets/icons/icons"

type Props = {
  list: TBudget["contacts"]
}

const BudgetContactsList = ({ list }: Props) => {
  const handleClick = (id: number) => {
    // TODO: show modal
  }

  return (
    <S.Wrapper>
      {list.map((item, sk) => (
        <S.Item $k={sk} key={sk} onClick={() => handleClick(item.id)}>
          <S.ItemData>{getDateStr(item.date, "dmy")}</S.ItemData>
          <S.ItemData>{getDateStr(item.date, "time")}</S.ItemData>
          <S.ItemData>{item.category.name}</S.ItemData>
          <S.ItemData>{item.provider.name}</S.ItemData>
          <Icons.Expand />
        </S.Item>
      ))}
    </S.Wrapper>
  )
}

export default BudgetContactsList
