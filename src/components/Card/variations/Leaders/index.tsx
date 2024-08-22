import * as S from "./styled"

import CardVariationsTemplate from "../_template"
import { PLeaderItem } from "../../../../utils/@types/components/LeaderItem"

import { ReactComponent as UserIcon } from "../../../../assets/icons/users.svg"
import { ReactComponent as TrophieIcon } from "../../../../assets/icons/trophie.svg"

type Props = {
  k: number
  title: string
  data: PLeaderItem[]
  handleSubPageChange: (page: string, data?: any) => void
}

type PLeaderProps = {
  k: number
  data: PLeaderItem
  pickLeader: (id: string) => void
}

const LeaderItem = ({ k, data, pickLeader }: PLeaderProps) => {
  const handleClick = () => {
    pickLeader(data.id)
  }

  return (
    <S.LeaderItem $k={k} onClick={handleClick}>
      <S.UserArea>
        {data.profile ? <img src={data.profile} alt={""} /> : <UserIcon />}
        <S.UserNameArea>
          <S.UserName>{data.name}</S.UserName>
          <S.UserCompany>{data.company}</S.UserCompany>
        </S.UserNameArea>
      </S.UserArea>
      <span>{`#${data.ranking}`}</span>
    </S.LeaderItem>
  )
}

const Leaders = ({ k, title, data, handleSubPageChange }: Props) => {
  const pickLeader = (id: string) => {
    handleSubPageChange("leaderDetails", { id })
  }

  return (
    <CardVariationsTemplate k={k} title={title} icon={<TrophieIcon />}>
      <S.List>
        {data.map((goal, key) => (
          <LeaderItem
            k={k + (key + 1) / 2}
            key={key}
            data={goal}
            pickLeader={pickLeader}
          />
        ))}
      </S.List>
    </CardVariationsTemplate>
  )
}

export default Leaders
