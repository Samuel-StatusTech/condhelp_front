import { useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import { fdata } from "../../utils/_dev/falseData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"

const NewsboardPage = () => {
  const navigate = useNavigate()

  const [news] = useState(fdata.newsboard)

  const handleNew = () => {
    navigate("single")
  }

  return (
    <S.Content>
      <PageHeader type={"table"} from={"newsboard"} action={handleNew} />
      <Divider />

      {/* Table content */}
      <Table type="newsboard" data={news} />
    </S.Content>
  )
}

export default NewsboardPage
