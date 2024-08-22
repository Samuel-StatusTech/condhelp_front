import { useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import { fdata } from "../../utils/_dev/falseData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"

const CompaniesPage = () => {
  const navigate = useNavigate()

  const [companies] = useState(fdata.companies)

  const handleNew = () => {
    navigate("single")
  }

  return (
    <S.Content>
      <PageHeader type={"table"} from={"companies"} action={handleNew} />
      <Divider />

      {/* Table content */}
      <Table type="companies" data={companies} />
    </S.Content>
  )
}

export default CompaniesPage
