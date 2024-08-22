import { useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import { fdata } from "../../utils/_dev/falseData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"

const GoalsPage = () => {
  const navigate = useNavigate()

  const [goals] = useState(fdata.goals)

  const handleNew = () => {
    navigate("single")
  }

  return (
    <S.Content>
      <PageHeader type={"table"} from={"goals"} action={handleNew} />
      <Divider />

      {/* Table content */}
      <Table type="goals" data={goals} />
    </S.Content>
  )
}

export default GoalsPage
