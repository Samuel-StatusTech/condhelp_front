import * as S from "./styled"

import CardVariationsTemplate from "../_template"
import { PTeamMember } from "../../../../utils/@types/components/Team"

import { ReactComponent as UserIcon } from "../../../../assets/icons/users.svg"
import { ReactComponent as TeamIcon } from "../../../../assets/icons/team.svg"

type Props = {
  k: number
  title: string
  data: PTeamMember["data"][]
  handleSubPageChange?: (p: any, data: any) => void
}

type TLItem = PTeamMember & {
  handleSubPageChange?: Props["handleSubPageChange"]
}

const LighterItem = ({ k, data: member, handleSubPageChange }: TLItem) => {
  const handleClick = () => {
    handleSubPageChange && handleSubPageChange("teamMember", member)
  }

  return (
    <S.LighterItem $k={k} onClick={handleClick}>
      <S.UserArea>
        {member.profile ? <img src={member.profile} alt={""} /> : <UserIcon />}
        <S.UserNameArea>
          <S.UserName>{member.name}</S.UserName>
          <S.UserPoints>{member.points}</S.UserPoints>
        </S.UserNameArea>
      </S.UserArea>
      <S.ResumeArea>
        <S.RData>
          <S.Color $color={"approved"} />
          <S.Legend>{member.resume.approved}</S.Legend>
        </S.RData>
        <S.RData>
          <S.Color $color={"awaiting"} />
          <S.Legend>{member.resume.awaiting}</S.Legend>
        </S.RData>
        <S.RData>
          <S.Color $color={"denied"} />
          <S.Legend>{member.resume.denied}</S.Legend>
        </S.RData>
      </S.ResumeArea>
    </S.LighterItem>
  )
}

const Lighter = ({ k, title, data, handleSubPageChange }: Props) => {
  return (
    <CardVariationsTemplate k={k} title={title} icon={<TeamIcon />}>
      <S.List>
        {data.map((goal, key) => (
          <LighterItem
            k={k + (key + 1) / 2}
            key={key}
            data={goal}
            handleSubPageChange={handleSubPageChange}
          />
        ))}
      </S.List>
    </CardVariationsTemplate>
  )
}

export default Lighter
