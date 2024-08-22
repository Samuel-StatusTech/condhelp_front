import * as S from "./styled"

import CardVariationsTemplate from "../_template"
import { PEmployee } from "../../../../utils/@types/components/Employee"

import { ReactComponent as UserIcon } from "../../../../assets/icons/users.svg"
import { ReactComponent as OkrIcon } from "../../../../assets/icons/okr.svg"

type Props = {
  k: number
  title: string
  data: PEmployee[]
}

const Employee = (member: PEmployee) => {
  const handleClick = () => {
    // ...
  }

  return (
    <S.Employee onClick={handleClick}>
      <S.UserArea>
        {member.profile ? <img src={member.profile} alt={""} /> : <UserIcon />}
        <S.UserNameArea>
          <S.UserName>{member.name}</S.UserName>
          <S.UserRole>{member.role}</S.UserRole>
        </S.UserNameArea>
      </S.UserArea>
      <S.ResumeArea>
        <S.Position>{`#${member.ranking}`}</S.Position>
        <S.Points>{member.points}</S.Points>
      </S.ResumeArea>
    </S.Employee>
  )
}

const Employees = ({ k, title, data }: Props) => {
  return (
    <CardVariationsTemplate k={k} title={title} icon={<OkrIcon />}>
      <S.SubTitle>Top 3 da sua equipe:</S.SubTitle>
      <S.List>
        {data.map((goal, k) => (
          <Employee key={k} {...goal} />
        ))}
      </S.List>
    </CardVariationsTemplate>
  )
}

export default Employees
