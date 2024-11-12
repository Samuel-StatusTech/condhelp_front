import { useCallback, useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import { fdata } from "../../utils/_dev/falseData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/system/table"
import SearchBlock from "../../components/SearchBlock"

const RegionsPage = () => {
  const navigate = useNavigate()

  const [regions] = useState(fdata.regions)

  /*
   *  Search control
   */

  const [search, setSearch] = useState("")

  const handleSearch = async () => {}

  // Engine

  const handleNew = useCallback(() => {
    navigate("single")
  }, [navigate])

  const handleEdit = () => {
    navigate("single")
  }

  return (
    <S.Content>
      <PageHeader type={"table"} from={"regions"} action={handleNew} />

      <Divider />

      <SearchBlock
        search={search}
        searchPlaceholder={"Pesquise por Nome, País ou Estado"}
        onSearchChange={setSearch}
        onSearch={handleSearch}
      />

      <Divider />

      {/* Table content */}
      <Table
        config={tableConfig.regions}
        data={regions}
        actions={{
          edit: handleEdit,
        }}
      />
    </S.Content>
  )
}

export default RegionsPage
