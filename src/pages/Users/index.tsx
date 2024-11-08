import { useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import { fdata } from "../../utils/_dev/falseData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/system/table"

const UsersPage = () => {
  const navigate = useNavigate()

  const [people] = useState(fdata.people)

  const handleNew = () => {
    navigate("single")
  }

  const handleEditUser = () => {
    navigate("single")
  }

  return (
    <S.Content>
      <PageHeader type={"table"} from={"users"} action={handleNew} />
      <Divider />

      {/* Table content */}
      <Table
        config={tableConfig.users}
        data={people}
        actions={{
          edit: handleEditUser,
        }}
      />
    </S.Content>
  )
}

export default UsersPage
