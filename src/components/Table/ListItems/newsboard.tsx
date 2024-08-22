import { TNewsData } from "../../../utils/@types/data/newsData"
import * as C from "../styled"

import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg"
import { getDateStr } from "../../../utils/tb/format/date"

type Props = {
  data: TNewsData
  k: number
}

export const NewsboardItem = ({ data, k }: Props) => {
  const handleEdit = () => {
    //
  }

  const renderDate = () => {
    return data.expiration ? getDateStr(data.expiration, "dmy") : "N/A"
  }

  const renderTarget = () => {
    return "Todos*"
  }

  const renderReads = () => {
    return `${data.reads.reads} de ${data.reads.total}`
  }

  return (
    <C.Item $k={k}>
      <C.Data $w={8}>
        <C.Value>{`#${k}`}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{data.title}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{data.author}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{renderDate()}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{renderTarget()}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{renderReads()}</C.Value>
      </C.Data>
      <C.Data>
        <C.EditBtn onClick={handleEdit}>
          <EditIcon />
        </C.EditBtn>
      </C.Data>
    </C.Item>
  )
}
