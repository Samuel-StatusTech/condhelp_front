import { useCallback, useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import { fdata } from "../../utils/_dev/falseData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/system/table"
import SearchBlock from "../../components/SearchBlock"
import { TFilter } from "../../utils/@types/components/SearchBlock"

const CategoriesPage = () => {
  const navigate = useNavigate()

  const [categories] = useState(fdata.categories)

  /*
   *  Search control
   */

  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    creator: "",
  })
  const [options] = useState({
    creator: [
      { key: "1", value: "Fulano Silva" },
      { key: "2", value: "Ambrosio Vasconcelos" },
      { key: "3", value: "Marta Pereira" },
    ],
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
      <PageHeader type={"table"} from={"categories"} action={handleNew} />

      <Divider />

      <SearchBlock
        search={search}
        searchPlaceholder={"Pesquisar categoria"}
        onSearchChange={setSearch}
        onFilterChange={handleFilters}
        onSearch={handleSearch}
        filters={[
          {
            label: "Criada por",
            name: "creator",
            options: options.creator,
            value: filters.creator,
          },
        ]}
      />

      <Divider />

      {/* Table content */}
      <Table
        config={tableConfig.categories}
        data={categories}
        actions={{
          edit: handleEdit,
        }}
      />
    </S.Content>
  )
}

export default CategoriesPage
