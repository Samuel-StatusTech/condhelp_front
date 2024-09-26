import { Link } from "react-router-dom"
import { TUser, levelRelation } from "../../../utils/@types/data/_user"
import { getInitials } from "../../../utils/tb/format/name"
import * as C from "../styled"

import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg"

type Props = {
  k: number
  data: TUser
}

export const PeopleItem = ({ k, data }: Props) => {
  const renderLevel = () => {
    return (
      <C.LevelIndicator>
        <C.LevelFlag $level={data.level} />
        <C.LevelName>{levelRelation[data.level]}</C.LevelName>
      </C.LevelIndicator>
    )
  }

  const handleEdit = () => {
    //
  }

  return (
    <C.Item $k={k}>
      <C.Data>
        <C.UserArea>
          {data.img ? (
            <C.Profile src={""} alt={""} />
          ) : (
            <C.UserNameBox>
              <span>{getInitials([data.name, data.surname])}</span>
            </C.UserNameBox>
          )}
          <C.UserName>
            <Link to={""}>
              {data.name}
              {data.surname}
            </Link>
          </C.UserName>
        </C.UserArea>
      </C.Data>
      <C.Data>
        <C.Value>{data.email}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{data.company.name}</C.Value>
      </C.Data>
      <C.Data>
        <C.Value>{renderLevel()}</C.Value>
      </C.Data>
      <C.Data>
        <C.EditBtn onClick={handleEdit}>
          <EditIcon />
        </C.EditBtn>
      </C.Data>
    </C.Item>
  )
}
