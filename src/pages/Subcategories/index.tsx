import { useCallback, useState } from "react"
import Divider from "../../components/_minimals/Divider"
import * as S from "./styled"
import Table from "../../components/Table"
import { fdata } from "../../utils/_dev/falseData"
import PageHeader from "../../components/PageHeader"
import { useNavigate } from "react-router-dom"
import { tableConfig } from "../../utils/system/table"
import { TFilter } from "../../utils/@types/components/SearchBlock"
import SearchBlock from "../../components/SearchBlock"

const SubcategoriesPage = () => {
  const navigate = useNavigate()

  const [subcategories] = useState(fdata.subcategories)

  /*
   *  Search control
   */

  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    creator: "",
  })
  const [options] = useState({
    category: [
      { key: "1", value: "Categoria 1" },
      { key: "2", value: "Categoria 2" },
    ],
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
      <PageHeader type={"table"} from={"subcategories"} action={handleNew} />

      <Divider />

      <SearchBlock
        search={search}
        searchPlaceholder={"Pesquisar subcategoria"}
        onSearchChange={setSearch}
        onFilterChange={handleFilters}
        onSearch={handleSearch}
        filters={[
          {
            label: "Categoria",
            name: "category",
            options: options.category,
            value: filters.category,
          },
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
        config={tableConfig.subcategories}
        data={subcategories}
        actions={{
          edit: handleEdit,
        }}
      />
    </S.Content>
  )
}

export default SubcategoriesPage
