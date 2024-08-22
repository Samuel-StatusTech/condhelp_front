import { useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import { fdata } from "../../utils/_dev/falseData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"

const PeoplePage = () => {
  const navigate = useNavigate()

  const [people] = useState(fdata.people)

  const handleNew = () => {
    navigate("single")
  }

  return (
    <S.Content>
      <PageHeader type={"table"} from={"people"} action={handleNew} />
      <Divider />

      {/* Table content */}
      <Table type="people" data={people} />
    </S.Content>
  )
}

export default PeoplePage
