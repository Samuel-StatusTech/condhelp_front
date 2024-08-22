import { useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import { fdata } from "../../utils/_dev/falseData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"

const DepartmentsPage = () => {
  const navigate = useNavigate()

  const [departments] = useState(fdata.departments)

  const handleNew = () => {
    navigate("single")
  }

  return (
    <S.Content>
      <PageHeader type={"table"} from={"departments"} action={handleNew} />
      <Divider />

      {/* Table content */}
      <Table type="departments" data={departments} />
    </S.Content>
  )
}

export default DepartmentsPage
