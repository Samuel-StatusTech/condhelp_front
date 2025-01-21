import * as S from "./styled"
import { getDateStr } from "../../../utils/tb/format/date"

import { Icons } from "../../../assets/icons/icons"
import { TMonitorContactResume } from "../../../utils/@types/data/monitoring"
import { getStore } from "../../../store"

type Props = {
  list: TMonitorContactResume[]
  subCategoryName: string
}

const BudgetContactsList = ({ list, subCategoryName }: Props) => {
  const { controllers } = getStore()

  const handleClick = (item: TMonitorContactResume) => {
    controllers.modal.open({
      role: "contactInfo",
      visible: true,
      data: {
        ...item,
        subCategoryName,
      },
      width: "md",
      onClose: () => {},
    })
  }

  return (
    <S.Wrapper>
      {list?.map((item, sk) => (
        <S.Item $k={sk} key={sk} onClick={() => handleClick(item)}>
          <S.ItemData>{getDateStr(item.openingDate, "localDate")}</S.ItemData>
          <S.ItemData>
            {getDateStr(item.openingDate, "localTimeStr_HM")}
          </S.ItemData>
          <S.ItemData>{item.categoryName}</S.ItemData>
          <S.ItemData>{item.providerName}</S.ItemData>
          <Icons.Expand />
        </S.Item>
      ))}
    </S.Wrapper>
  )
}

export default BudgetContactsList
