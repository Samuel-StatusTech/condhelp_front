import * as S from "./styled"

import CardVariationsTemplate from "../_template"
import { PGoalViewItem } from "../../../../utils/@types/components/GoalViewItem"

import { ReactComponent as PaperCheck } from "../../../../assets/icons/papercheck.svg"
import { ReactComponent as ViewsIcon } from "../../../../assets/icons/eye.svg"

type Props = {
  k: number
  title: string
  data: PGoalViewItem["data"][]
  handleSelectGoal: (p: any) => void
}

type TItem = PGoalViewItem & {
  handleSelectGoal: Props["handleSelectGoal"]
}

const GoalViewItem = ({ k, data, handleSelectGoal }: TItem) => {
  const handleClick = () => {
    handleSelectGoal(data)
  }

  return (
    <S.GoalViewItem $k={k} onClick={handleClick}>
      <span>{data.goalTitle}</span>
      <S.ViewsArea>
        <span>{data.views}</span>
        <ViewsIcon />
      </S.ViewsArea>
    </S.GoalViewItem>
  )
}

const GoalsViews = ({ k, title, data, handleSelectGoal }: Props) => {
  return (
    <CardVariationsTemplate k={k} title={title} icon={<PaperCheck />}>
      <S.List>
        {data.map((goal, key) => (
          <GoalViewItem
            key={key}
            data={goal as any}
            k={k + (key + 1) / 2}
            handleSelectGoal={handleSelectGoal}
          />
        ))}
      </S.List>
    </CardVariationsTemplate>
  )
}

export default GoalsViews
