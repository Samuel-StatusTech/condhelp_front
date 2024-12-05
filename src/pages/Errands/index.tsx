import { useCallback, useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/system/table"
import SearchBlock from "../../components/SearchBlock"
import { TFilter } from "../../utils/@types/components/SearchBlock"
import { systemOptions } from "../../utils/system/options"

const ErrandsPage = () => {
  const navigate = useNavigate()

  const [errands] = useState([])

  /*
   *  Search control
   */

  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    status: "",
  })
  const [options] = useState({
    status: systemOptions.errandStatus,
  })

  const handleFilters = (filter: Partial<TFilter>) => {
    setFilters((filtersList) => ({
      ...filtersList,
      [filter.name as string]: filter.value,
    }))
  }

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
      <PageHeader type={"table"} from={"errands"} action={handleNew} />

      <Divider />

      <SearchBlock
        search={search}
        searchPlaceholder={"Pesquise por título, data ou perfil de destino"}
        onSearchChange={setSearch}
        onFilterChange={handleFilters}
        onSearch={handleSearch}
        filters={[
          {
            label: "Status",
            name: "status",
            options: options.status,
            value: filters.status,
            byKey: true,
          },
        ]}
      />

      <Divider />

      {/* Table content */}
      <Table
        config={tableConfig.errands}
        data={errands}
        actions={{
          edit: handleEdit,
        }}
      />
    </S.Content>
  )
}

export default ErrandsPage
