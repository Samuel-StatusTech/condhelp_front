import { TGoal } from "../../../utils/@types/data/goal"
import * as C from "../styled"

import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg"
import { levelRelation } from "../../../utils/@types/data/user"

type Props = {
  data: TGoal
  k: number
}

export const GoalsItem = ({ data, k }: Props) => {
  const getTarget = () => {
    let str = ""

    if (data.target === "all") str = "Todos"
    else str = levelRelation[data.target]

    return str
  }

  const handleEdit = () => {
    //
  }

  return (
    <C.Item $k={k}>
      <C.Data $w={8}>
        <C.Value>{`#${k}`}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{data.name}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{data.author}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{data.points}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{data.approvement ? "Sim" : "Não"}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{getTarget()}</C.Value>
      </C.Data>
      <C.Data>
        <C.EditBtn onClick={handleEdit}>
          <EditIcon />
        </C.EditBtn>
      </C.Data>
    </C.Item>
  )
}
